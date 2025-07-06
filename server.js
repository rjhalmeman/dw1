const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const csv = require("csv-parser");
const { parse } = require("json2csv");
const multer = require("multer");

const app = express();
const PORT = 3000;

const USERS_FILE = path.join(__dirname, "usuarios.csv");
const PRODUTOS_FILE = path.join(__dirname, "produtos.csv");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "Trabalho-1B-main")));
app.use(express.static(path.join(__dirname, "assets")));

// === MULTER CONFIGURAÇÃO ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "assets", "imagens");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// === CRIA CSVs SE NÃO EXISTIREM ===
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, "name,cpf,birthdate,email,password,role,cidade,estado,rua,numero,cep\n");
}
if (!fs.existsSync(PRODUTOS_FILE)) {
  fs.writeFileSync(PRODUTOS_FILE, "nome,preco,categoria,imagem,promocao\n");
}

// === ROTAS DE USUÁRIOS ===

app.post("/register", (req, res) => {
  const { name, cpf, birthdate, email, password, cidade, estado, rua, numero, cep } = req.body;
  const role = email.endsWith("@hamburgueria.com") ? "gerente" : "cliente";
  const newUser = { name, cpf, birthdate, email, password, role, cidade, estado, rua, numero, cep };

  let users = [];

  fs.createReadStream(USERS_FILE)
    .pipe(csv())
    .on("data", (row) => users.push(row))
    .on("end", () => {
      const emailExiste = users.some(user => user.email.trim().toLowerCase() === email.trim().toLowerCase());
      if (emailExiste) return res.status(400).json({ error: "Email já cadastrado" });

      const fields = ["name", "cpf", "birthdate", "email", "password", "role", "cidade", "estado", "rua", "numero", "cep"];
      const csvLine = parse([newUser], { fields, header: false });
      fs.appendFileSync(USERS_FILE, "\n" + csvLine);

      res.status(201).json(newUser);
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let userFound = null;

  fs.createReadStream(USERS_FILE)
    .pipe(csv())
    .on("data", (row) => {
      if (row.email.trim().toLowerCase() === email.trim().toLowerCase()) userFound = row;
    })
    .on("end", () => {
      if (!userFound) return res.status(401).json({ error: "Email não cadastrado" });
      if (userFound.password.trim() === password.trim()) res.json(userFound);
      else res.status(401).json({ error: "Senha incorreta" });
    });
});

app.get("/users", (req, res) => {
  const users = [];
  fs.createReadStream(USERS_FILE)
    .pipe(csv())
    .on("data", (row) => users.push(row))
    .on("end", () => res.json(users));
});

app.post("/update-user-role", (req, res) => {
  const { email, role } = req.body;
  let users = [];
  fs.createReadStream(USERS_FILE)
    .pipe(csv())
    .on("data", (row) => users.push(row))
    .on("end", () => {
      const userIndex = users.findIndex(user => user.email === email);
      if (userIndex > -1) {
        users[userIndex].role = role;
        const fields = ["name", "cpf", "birthdate", "email", "password", "role", "cidade", "estado", "rua", "numero", "cep"];
        const csvData = parse(users, { fields });
        fs.writeFileSync(USERS_FILE, csvData);
        res.json({ message: `Papel do usuário ${email} atualizado para ${role}.` });
      } else {
        res.status(404).json({ error: "Usuário não encontrado." });
      }
    });
});

app.post("/update-users", (req, res) => {
  const novosUsuarios = req.body;
  const fields = ["name", "cpf", "birthdate", "email", "password", "role", "cidade", "estado", "rua", "numero", "cep"];
  const csvData = parse(novosUsuarios, { fields });

  fs.writeFile(USERS_FILE, csvData, (err) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar usuários" });
    res.status(200).json({ message: "Usuários atualizados com sucesso" });
  });
});

// === ROTAS DE PRODUTOS ===

app.get("/produtos", (req, res) => {
  const produtos = [];
  fs.createReadStream(PRODUTOS_FILE)
    .pipe(csv())
    .on("data", (row) => {
      row.nome = row.nome?.trim();
      row.categoria = row.categoria?.trim().toLowerCase();
      row.preco = parseFloat((row.preco || "").toString().replace(",", "."));
      row.imagem = row.imagem?.trim();
      row.promocao = (row.promocao || "").toString().toLowerCase() === "true";
      produtos.push(row);
    })
    .on("end", () => res.json(produtos));
});

app.post("/produtos", upload.single("imagem"), (req, res) => {
  const { nome, preco, categoria, promocao } = req.body;
  const imagemPath = `assets/imagens/${req.file.filename}`;
  const produto = {
    nome: nome.trim(),
    preco: parseFloat(preco),
    categoria: categoria.trim().toLowerCase(),
    imagem: imagemPath,
    promocao: promocao === "true" || promocao === true
  };

  fs.createReadStream(PRODUTOS_FILE)
    .pipe(csv())
    .on("data", () => {}) // apenas para garantir que o arquivo existe
    .on("end", () => {
      fs.appendFile(PRODUTOS_FILE, `\n"${produto.nome}","${produto.preco}","${produto.categoria}","${produto.imagem}","${produto.promocao}"`, err => {
        if (err) return res.status(500).json({ error: "Erro ao salvar produto" });
        res.status(201).json({ message: "Produto cadastrado com sucesso!" });
      });
    });
});

app.put("/atualizar-produto", (req, res) => {
  const { nome, preco, categoria, imagem, promocao, nomeOriginal, categoriaOriginal } = req.body;
  const produtos = [];

  fs.createReadStream(PRODUTOS_FILE)
    .pipe(csv())
    .on("data", (row) => {
      row.nome = row.nome.trim();
      row.categoria = row.categoria.trim().toLowerCase();
      produtos.push(row);
    })
    .on("end", () => {
      const index = produtos.findIndex(p => {
        const nomeOk = p.nome?.trim().toLowerCase();
        const categoriaOk = p.categoria?.trim().toLowerCase();
        return nomeOk === nomeOriginal?.trim().toLowerCase() && categoriaOk === categoriaOriginal?.trim().toLowerCase();
      });

      if (index > -1) {
        produtos[index] = {
          nome: nome.trim(),
          preco,
          categoria: categoria.toLowerCase(),
          imagem: imagem.trim(),
          promocao: promocao.toString().toLowerCase()
        };

        const csvData = parse(produtos, { fields: ["nome", "preco", "categoria", "imagem", "promocao"] });
        fs.writeFileSync(PRODUTOS_FILE, csvData);
        res.status(200).json({ message: "Produto atualizado com sucesso!" });
      } else {
        res.status(404).json({ error: "Produto não encontrado" });
      }
    });
});

app.use("/assets/imagens", express.static(path.join(__dirname, "assets", "imagens")));

app.delete("/excluir-produto", (req, res) => {
  const { nome, categoria } = req.body;
  const produtos = [];

  fs.createReadStream(PRODUTOS_FILE)
    .pipe(csv())
    .on("data", (row) => produtos.push(row))
    .on("end", () => {
      const novos = produtos.filter(p => !(p.nome === nome && p.categoria === categoria));
      const csvData = parse(novos, { fields: ["nome", "preco", "categoria", "imagem", "promocao"] });
      fs.writeFileSync(PRODUTOS_FILE, csvData);
      res.status(200).json({ message: "Produto removido com sucesso!" });
    });
});

// === INICIAR SERVIDOR ===
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

