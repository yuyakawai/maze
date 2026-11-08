const gameParameters = {
  maxQuestionNumber: 5,
  initialRemainingTime: 60,
};

const gameStatus = {
  currentScene: "init",
  isGameStart: false,
  isGameClear: false,
  isGameOver: false,
  startTime: 0,
  remainingTime: 0,
  questionNumber: 0,
};

const mainContainer = {
  element: null,
};

const canvas = {
  element: null,
  context: null,
  width: 300,
  height: 400,
};

window.onload = () => {
  tick();
};

const tick = () => {
  scenes[gameStatus.currentScene]();
  requestAnimationFrame(tick);
};

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.width = "100vw";
  mainContainer.element.style.height = "100vh";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  canvas.element = document.getElementById("game-canvas");
  canvas.context = canvas.element.getContext("2d");
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;

  canvas.context.fillStyle = "red";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);

  resizeCanvas();
};

const resizeCanvas = () => {
  const scale = Math.min(
    window.innerWidth / canvas.width,
    window.innerHeight / canvas.height,
  );
  canvas.element.style.width = canvas.width * scale + "px";
  canvas.element.style.height = canvas.height * scale + "px";

  canvas.context.fillStyle = "white";
  canvas.context.font = "20px sans-serif";

  canvas.context.fillStyle = "white";
  canvas.context.font = "20px sans-serif";

  canvas.context.fillText(`canvas:${canvas.width}x${canvas.height}`, 10, 30);

  canvas.context.fillText(
    `style:${canvas.element.style.width} x ${canvas.element.style.height}`,
    10,
    60,
  );

  canvas.context.fillText(`scale:${scale.toFixed(2)}`, 10, 90);

  console.log(window.innerWidth, window.innerHeight);
  console.log(canvas.element.style.width, canvas.element.style.height);
};

window.addEventListener("resize", resizeCanvas);

const scenes = {
  init: () => {
    init();
    gameStatus.currentScene = "title";
  },
  title: () => {
    gameStatus.currentScene = "ready";
  },
  ready: () => {
    if (gameStatus.isGameStart) {
      gameStatus.startTime = performance.now();
      gameStatus.currentScene = "gamePlay";
    }
  },
  gamePlay: () => {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height);
  },
  gameOver: () => {
    showGameOverMessage();
    gameStatus.isGameStart = false;
    gameStatus.currentScene = "ready";
  },
  gameClear: () => {
    showGameClearMessage();
    gameStatus.isGameStart = false;
    gameStatus.currentScene = "ready";
  },
};

const showTitleMessage = () => {
  // empty
};

const showGameClearMessage = () => {
  // empty
};

const showGameOverMessage = () => {
  // empty
};

const showRetryMessage = () => {
  // empty
};
