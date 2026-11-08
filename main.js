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

const buttons = [
  {
    id: "start",
    x: 100,
    y: 300,
    width: 200,
    height: 60,
    text: "始める",
    scene: "ready",
    onClick: () => {
      gameStatus.isGameStart = true;
    },
  },
  {
    id: "retry",
    x: 100,
    y: 460,
    width: 200,
    height: 60,
    text: "リトライ",
    scene: "ready",
    onClick: () => {
      console.log("Retry button clicked");
    },
  },
];

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

  canvas.element = document.createElement("canvas");
  mainContainer.element.appendChild(canvas.element);
  canvas.context = canvas.element.getContext("2d");
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;

  canvas.context.fillStyle = "black";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);

  canvas.element.addEventListener("pointermove", handlePointerMove);
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
    drawButtons();
    if (gameStatus.isGameStart) {
      gameStatus.startTime = performance.now();
      gameStatus.currentScene = "gamePlay";
    }
  },
  gamePlay: () => {
    canvas.context.fillStyle = "red";
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
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

const drawDebugInfo = () => {
  canvas.context.fillStyle = "white";
  canvas.context.font = "20px sans-serif";

  canvas.context.fillText(`canvas:${canvas.width}x${canvas.height}`, 120, 90);
  canvas.context.fillText(
    `style:${canvas.element.style.width} x ${canvas.element.style.height}`,
    120,
    150,
  );
  canvas.context.fillText(`scale:${scale.toFixed(2)}`, 120, 120);
};

const drawButton = (button) => {
  canvas.context.fillStyle = "#deb887";
  canvas.context.fillRect(button.x, button.y, button.width, button.height);
  canvas.context.strokeStyle = "#b99679";
  canvas.context.lineWidth = 2;
  canvas.context.strokeRect(button.x, button.y, button.width, button.height);

  canvas.context.fillStyle = "black";
  canvas.context.font = "24px sans-serif";
  canvas.context.textAlign = "center";
  canvas.context.textBaseline = "middle";

  canvas.context.fillText(
    button.text,
    button.x + button.width / 2,
    button.y + button.height / 2,
  );
};

const drawButtons = () => {
  const currentButtons = buttons.filter(
    (button) => button.scene === gameStatus.currentScene,
  );

  currentButtons.forEach((button) => drawButton(button));
};

const isInsideButton = (button, x, y) => {
  return (
    x >= button.x &&
    x <= button.x + button.width &&
    y >= button.y &&
    y <= button.y + button.height
  );
};

const handlePointerMove = (e) => {
  const rect = canvas.element.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  const currentButtons = buttons.filter(
    (button) => button.scene === gameStatus.currentScene,
  );
  const hoveredButton = currentButtons.find((button) =>
    isInsideButton(button, x, y),
  );
  canvas.element.style.cursor = hoveredButton ? "pointer" : "default";
};

const handlePointerDown = (e) => {
  const rect = canvas.element.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  const currentButtons = buttons.filter(
    (button) => button.scene === gameStatus.currentScene,
  );
  const clickedButton = currentButtons.find((button) =>
    isInsideButton(button, x, y),
  );
  if (clickedButton) {
    clickedButton.onClick();
  }
};
