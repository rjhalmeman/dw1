let scores = {1: 0, 2: 0};
        let sets = {1: 0, 2: 0};
        let historyTable = document.getElementById('history');

        function updateScore(team) {
            document.getElementById(`score${team}`).textContent = scores[team];
        }

        function updateSets(team) {
            document.getElementById(`sets${team}`).textContent = sets[team];
        }

        function addPoint(team) {
            scores[team]++;
            updateScore(team);
            updateHistory(team, '+1 ponto');
        }

        function removePoint(team) {
            if (scores[team] > 0) {
                scores[team]--;
                updateScore(team);
                updateHistory(team, '-1 ponto');
            }
        }

        function resetScore(team) {
            scores[team] = 0;
            updateScore(team);
            updateHistory(team, 'Placar zerado');
        }

        function addSet(team) {
            sets[team]++;
            updateSets(team);
            updateHistory(team, '+1 set');
        }

        function removeSet(team) {
            if (sets[team] > 0) {
                sets[team]--;
                updateSets(team);
                updateHistory(team, '-1 set');
            }
        }

        function updateHistory(team, action) {
            let row = historyTable.insertRow();
            row.insertCell(0).textContent = `Time ${team}`;
            row.insertCell(1).textContent = action.includes('ponto') ? action : '-';
            row.insertCell(2).textContent = action.includes('set') ? action : '-';
        }