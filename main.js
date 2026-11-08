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
  completedQuestions: [],
  reset: () => {
    gameStatus.isGameStart = false;
    gameStatus.isGameClear = false;
    gameStatus.isGameOver = false;
    gameStatus.startTime = 0;
    gameStatus.remainingTime = 0;
    gameStatus.questionNumber = 0;
    gameStatus.completedQuestions = [];
  },
};

const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const screenContainer = {
  element: null,
  width: mainContainer.width - 10,
  height: mainContainer.height - 10,
};

const messageWrapContainer = {
  element: null,
  width: mainContainer.width,
  height: mainContainer.height * 0.1,
};

const timeMessageContainer = {
  element: null,
  width: messageWrapContainer.width / 2,
  height: messageWrapContainer.height * 0.8,
};

const statusMessageContainer = {
  element: null,
  width: messageWrapContainer.width / 2,
  height: messageWrapContainer.height * 0.8,
};

const cellRow = 8;
const cellCol = 11;
const cellSize = screenContainer.width / cellRow;

window.onload = () => {
  tick();
};

const tick = () => {
  scenes[gameStatus.currentScene]();
  requestAnimationFrame(tick);
};

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.position = "relative";
  mainContainer.element.style.width = mainContainer.width + "px";
  mainContainer.element.style.height = mainContainer.height + "px";
  mainContainer.element.style.margin = "5px";
  mainContainer.element.style.fontFamily =
    "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
  mainContainer.element.style.backgroundColor = "#f5deb3";
  mainContainer.element.style.border = "2px solid #deb887";
  mainContainer.element.style.boxSizing = "border-box";
  mainContainer.element.style.borderRadius = "5px";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.flexDirection = "column";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "3px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(screenContainer.element);

  messageWrapContainer.element = document.createElement("div");
  messageWrapContainer.element.style.position = "relative";
  messageWrapContainer.element.style.width = messageWrapContainer.width + "px";
  messageWrapContainer.element.style.height =
    messageWrapContainer.height + "px";
  messageWrapContainer.element.style.display = "flex";
  messageWrapContainer.element.style.alignItems = "center";
  messageWrapContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(messageWrapContainer.element);

  timeMessageContainer.element = document.createElement("div");
  timeMessageContainer.element.style.position = "relative";
  timeMessageContainer.element.style.display = "flex";
  timeMessageContainer.element.style.alignItems = "center";
  timeMessageContainer.element.style.justifyContent = "center";
  timeMessageContainer.element.style.backgroundColor = "#deb887";
  timeMessageContainer.element.style.width = timeMessageContainer.width + "px";
  timeMessageContainer.element.style.height =
    timeMessageContainer.height + "px";
  timeMessageContainer.element.style.margin = "3px";
  timeMessageContainer.element.style.borderRadius = "50px";
  timeMessageContainer.element.style.fontSize = "20px";
  timeMessageContainer.element.textContent =
    "残り時間 " + gameParameters.initialRemainingTime.toFixed(2);
  messageWrapContainer.element.appendChild(timeMessageContainer.element);

  statusMessageContainer.element = document.createElement("div");
  statusMessageContainer.element.style.position = "relative";
  statusMessageContainer.element.style.display = "flex";
  statusMessageContainer.element.style.alignItems = "center";
  statusMessageContainer.element.style.justifyContent = "center";
  statusMessageContainer.element.style.backgroundColor = "#deb887";
  statusMessageContainer.element.style.width =
    statusMessageContainer.width + "px";
  statusMessageContainer.element.style.height =
    statusMessageContainer.height + "px";
  statusMessageContainer.element.style.margin = "3px";
  statusMessageContainer.element.style.borderRadius = "50px";
  statusMessageContainer.element.style.fontSize = "20px";
  statusMessageContainer.element.textContent =
    "問 " + gameStatus.questionNumber + "/" + gameParameters.maxQuestionNumber;
  messageWrapContainer.element.appendChild(statusMessageContainer.element);
};

const scenes = {
  init: () => {
    init();
    gameStatus.currentScene = "title";
  },
  title: () => {
    showTitleMessage();
    gameStatus.currentScene = "ready";
  },
  ready: () => {
    if (gameStatus.isGameStart) {
      gameStatus.startTime = performance.now();
      gameStatus.currentScene = "gamePlay";
    }
  },
  gamePlay: () => {
    if (gameStatus.isGameClear) {
      gameStatus.currentScene = "gameClear";
      return;
    }

    if (gameStatus.isGameOver) {
      gameStatus.currentScene = "gameOver";
      return;
    }

    gameStatus.remainingTime = Math.max(
      0,
      gameParameters.initialRemainingTime -
        (performance.now() - gameStatus.startTime) / 1000,
    );

    timeMessageContainer.element.textContent =
      "残り時間 " + gameStatus.remainingTime.toFixed(2);

    statusMessageContainer.element.textContent =
      "問 " +
      gameStatus.questionNumber +
      "/" +
      gameParameters.maxQuestionNumber;

    if (gameStatus.remainingTime <= 0) {
      gameStatus.isGameOver = true;
    }
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
  let wrapElement = document.createElement("div");
  wrapElement.style.position = "relative";
  wrapElement.style.zIndex = "1";
  wrapElement.style.width = screenContainer.width + "px";
  wrapElement.style.height = screenContainer.height * 0.4 + "px";
  wrapElement.style.display = "flex";
  wrapElement.style.flexDirection = "column";
  wrapElement.style.alignItems = "center";
  wrapElement.style.justifyContent = "center";

  let messageElement = document.createElement("div");
  messageElement.style.position = "relative";
  messageElement.style.zIndex = "1";
  messageElement.style.width = screenContainer.width * 0.9 + "px";
  messageElement.style.height = screenContainer.height * 0.15 + "px";
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.backgroundColor = "#f5deb3";
  messageElement.style.borderRadius = "15px";
  messageElement.style.fontSize = "25px";
  messageElement.textContent = "迷路ゲーム";
  wrapElement.appendChild(messageElement);

  let startButtonElement = document.createElement("div");
  startButtonElement.style.position = "relative";
  startButtonElement.style.zIndex = "1";
  startButtonElement.style.width = screenContainer.width * 0.7 + "px";
  startButtonElement.style.height = screenContainer.height * 0.1 + "px";
  startButtonElement.style.marginTop = "10px";
  startButtonElement.style.display = "flex";
  startButtonElement.style.alignItems = "center";
  startButtonElement.style.justifyContent = "center";
  startButtonElement.style.backgroundColor = "#deb887";
  startButtonElement.style.color = "black";
  startButtonElement.style.fontSize = "28px";
  startButtonElement.style.border = "3px solid #b99679";
  startButtonElement.style.borderRadius = "50px";
  startButtonElement.style.cursor = "pointer";
  startButtonElement.textContent = "始める";
  const handleCellTouchEvent = (e) => {
    e.preventDefault();
    gameStatus.isGameStart = true;
    wrapElement.remove();
  };

  if (window.ontouchstart === null) {
    startButtonElement.ontouchstart = handleCellTouchEvent;
  } else {
    startButtonElement.onpointerdown = handleCellTouchEvent;
  }
  wrapElement.appendChild(startButtonElement);
  screenContainer.element.appendChild(wrapElement);
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
