function new_game() {
    let html = `<ul id="game-details" class="game-details">
    <li class="game-detail health">hhhhhhhhhhh</li>
    <li class="game-detail time">0:0:0</li>
    </ul><div class="board">`;

    function shuffled() {
        let a = "abcdefghi".split("");
        a = a.concat(a);
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    };
    let characters = shuffled();
    for (let i = 0; i < 18; i++) {
        html += `<label class="game-tile">
        <input type="checkbox" >
        <span class="game-card">
        <span class="game-icon">${characters[i]}</span>
        </span>
        </label>`
    };
    html += '</div>';
    page.innerHTML = html;

    time = new Date();
    function countdown() {
        let s = Math.floor((new Date() - time) / 1000);
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        document.querySelector('.time').innerText = `${h}:${m % 60}:${s % 60}`;
        timeout = setTimeout(countdown, 1000);
    };
    countdown();

    var inputs = document.querySelectorAll('input');
    function check(path) {
        if (last_tile) {
            if(last_tile[1].innerText.trim() == path[1].innerText.trim()) {
                last_tile = null;
                let counter = 0;
                inputs.forEach(input => {if (input.checked) counter++;});
                if (counter == 18) page.innerHTML = `<div class="game-content win-game-content">
                  <h1 class="win-message">You win!</h1>
                </div>
                <div class="win-game-banner">
                  <ul class="game-stats">
                    <li class="game-stat">
                      <span class="game-stat-name">Errors</span>
                      <span class="game-stat-value">${11 - document.querySelector('.health').innerText.length}</span>
                    </li>
                    <li class="game-stat">
                      <span class="game-stat-name">Time</span>
                      <span class="game-stat-value">${document.querySelector('.time').innerText}</span>
                    </li>
                  </ul>
                  <button class="primary-button" type="button" onClick="new_game()">New Game</button>
                </div>`;
            } else {
                let element = document.querySelector('.health');
                element.innerText = element.innerText.slice(0, -1);
                if (!element.innerText.length) page.innerHTML = `<div class="game-content lose-game-content">
                <h1 class="lose-message">Whoops!</h1>
                <p>(You lost.)</p>
                <button class="primary-button" type="button" onClick="new_game()">New Game</button>
                </div>`;
                inputs.forEach(input => input.disabled = true);
                setTimeout(() => inputs.forEach(input => {if (!input.checked) input.disabled = false;}), 1000);
                setTimeout(() => {
                    path[0].disabled = false;
                    path[0].checked = false;
                }, 1000);
                setTimeout(() => {
                    last_tile[0].disabled = false;
                    last_tile[0].checked = false;
                    last_tile=null;
                }, 1000);
            }
        }
        else last_tile = path;
        path[0].disabled = true;
    };
    document.querySelectorAll('input').forEach(input => input.addEventListener('click', (event) => check(event.path)));
};

var page = document.querySelector('section');
var time;
var timeout;
var last_tile = null;
