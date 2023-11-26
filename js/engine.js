const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countLife: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        contDownTimerId: setInterval(contDown, 1000),
    },
};

function contDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 || state.values.countLife <=0) {
        clearInterval(state.actions.contDownTimerId);
        clearInterval(state.actions.timerId);
        
        alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    }
}

function playSound(audioName){
    let audio = new Audio(`audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.countLife--;
                state.view.life.textContent = `x${state.values.countLife}`;
                state.values.life = null;
            }
        })
    })
};

function initialize() {

    addListenerHitBox();
};

initialize();