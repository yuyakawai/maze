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
  width: 400,
  height: 700,
};

const startButton = {
  x: 100,
  y: 300,
  width: 200,
  height: 60,
  text: "始める",
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
  mainContainer.element.style.flex = "1";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  canvas.element = document.getElementById("game-canvas");
  canvas.context = canvas.element.getContext("2d");
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;

  canvas.context.fillStyle = "black";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);

  drawStartButton();
  canvas.element.addEventListener("pointerdown", handlePointerDown);
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

  canvas.context.fillText(`canvas:${canvas.width}x${canvas.height}`, 100, 90);

  canvas.context.fillText(
    `style:${canvas.element.style.width} x ${canvas.element.style.height}`,
    100,
    150,
  );

  canvas.context.fillText(`scale:${scale.toFixed(2)}`, 100, 120);
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

const drawStartButton = () => {
  canvas.context.fillStyle = "#deb887";

  canvas.context.fillRect(
    startButton.x,
    startButton.y,
    startButton.width,
    startButton.height,
  );

  canvas.context.strokeStyle = "#b99679";
  canvas.context.lineWidth = 2;

  canvas.context.strokeRect(
    startButton.x,
    startButton.y,
    startButton.width,
    startButton.height,
  );

  canvas.context.fillStyle = "black";
  canvas.context.font = "24px sans-serif";
  canvas.context.textAlign = "center";
  canvas.context.textBaseline = "middle";

  canvas.context.fillText(
    startButton.text,
    startButton.x + startButton.width / 2,
    startButton.y + startButton.height / 2,
  );
};

const isInsideStartButton = (x, y) => {
  return (
    x >= startButton.x &&
    x <= startButton.x + startButton.width &&
    y >= startButton.y &&
    y <= startButton.y + startButton.height
  );
};

const handlePointerDown = (e) => {
  const rect = canvas.element.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  if (isInsideStartButton(x, y)) {
    canvas.context.fillText("handlePointerDown: OK", 40, 300);
  }
};
