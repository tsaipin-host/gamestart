let popularity = 4;
let acting = 6;
let moral = 8;
let timeoutTriggered = false;
let state = "start";

//轉場設定
let transitionState = "none";
let nextScene = "";
let transitionBackground = null;

// UI 元素與按鈕
let allButtons = [];
let startButton; // 開始按鈕
let volumeControlButton; // 音量控制按鈕
let introButton, introButton2, introButton3;
let level1Button, level2Button, level3Button, level4Button, level5Button;
let choice1_1Button, choice1_2Button, choice1_3Button;
let choice2_1Button, choice2_2Button, choice2_3Button;
let choice3_1Button, choice3_2Button, choice3_3Button;
let choice4_1Button, choice4_2Button, choice4_3Button;
let choice5_1Button, choice5_2Button, choice5_3Button;
let resultButton, restartButton;

// 定義分數動畫的狀態變數
let animatingScores = false;
let currentPopularity = 0;
let currentActing = 0;
let currentMoral = 0;
let targetPopularity = 0;
let targetActing = 0;
let targetMoral = 0;
const animationSpeed = 0.5; // 動畫速度調整
let animationComplete = false;

// 玩家名稱變數
let playerName = ""; // 保存玩家名稱
let nameInput; // 輸入框
let inputButton; // 確認按鈕
let nameEntered = false; // 是否已輸入名稱的標記
let showNamePrompt = true; // 控制提示文字顯示與否

// 圖片與音效資源
let startPage, intro, intro2, intro3;
let levelone, leveltwo, levelthree, levelfour, levelfive;
let choiceone, choicetwo, choicethree, choicefour, choicefive;
let result1_1, result1_2, result1_3;
let result2_1, result2_2, result2_3;
let result3_1, result3_2, result3_3;
let result4_1, result4_2, result4_3;
let result5_1, result5_2, result5_3;
let scorePage, end1Page, end2Page, end3Page, end4Page, end5Page;
let volumeOnImg, volumeOffImg; // 音量控制圖示
let backgroundMusic; // 背景音樂
let musicTracks = {};
let isMusicPlaying = true; // 音樂播放狀態
let clickSound; // 點擊音效

// 動畫資源
let curtainClose, curtainOpen;
let star;

// 控制結局動畫播放
let closeHasPlayed = false; // 確保布幕關閉動畫只播放一次
let openHasPlayed = false; // 確保布幕開啟動畫只播放一次

// 預載資源
function preload() {
  // 圖片與音效
  startPage = loadImage("images-game/Startpage.jpeg");
  musicTracks["start"] = loadSound("music/hard.mp3");
  musicTracks["ending1"] = loadSound("music/strong.mp3");
  musicTracks["ending2"] = loadSound("music/anxious.mp3");
  musicTracks["ending3"] = loadSound("music/sad.mp3");
  musicTracks["ending4"] = loadSound("music/beautiful.mp3");
  musicTracks["ending5"] = loadSound("music/beauty.mp3");
  clickSound = loadSound("music/click.mp3");

  volumeOnImg = loadImage("images-game/volume-on.png");
  volumeOffImg = loadImage("images-game/volume-off.png");

  intro = loadImage("images-game/introduction.jpeg");
  intro2 = loadImage("images-game/introduction2.jpeg");
  intro3 = loadImage("images-game/introduction3.png");

  levelone = loadImage("images-game/level1.png");
  leveltwo = loadImage("images-game/level2.png");
  levelthree = loadImage("images-game/level3.png");
  levelfour = loadImage("images-game/level4.png");
  levelfive = loadImage("images-game/level5.png");

  choiceone = loadImage("images-game/choice1.png");
  choicetwo = loadImage("images-game/choice2.png");
  choicethree = loadImage("images-game/choice3.png");
  choicefour = loadImage("images-game/choice4.png");
  choicefive = loadImage("images-game/choice5.png");

  result1_1 = loadImage("images-game/result1-1.png");
  result1_2 = loadImage("images-game/result1-2.png");
  result1_3 = loadImage("images-game/result1-3.png");

  result2_1 = loadImage("images-game/result2-1.png");
  result2_2 = loadImage("images-game/result2-2.png");
  result2_3 = loadImage("images-game/result2-3.png");

  result3_1 = loadImage("images-game/result3-1.png");
  result3_2 = loadImage("images-game/result3-2.png");
  result3_3 = loadImage("images-game/result3-3.png");

  result4_1 = loadImage("images-game/result4-1.png");
  result4_2 = loadImage("images-game/result4-2.png");
  result4_3 = loadImage("images-game/result4-3.png");

  result5_1 = loadImage("images-game/result5-1.png");
  result5_2 = loadImage("images-game/result5-2.png");
  result5_3 = loadImage("images-game/result5-3.png");

  scorePage = loadImage("images-game/Finalscore.png");
  end1Page = loadImage("images-game/ending1.png");
  end2Page = loadImage("images-game/ending2.png");
  end3Page = loadImage("images-game/ending3.png");
  end4Page = loadImage("images-game/ending4.png");
  end5Page = loadImage("images-game/ending5.png");

  // 動畫
  curtainClose = loadAnimation(
    "images-game/curtain1.png",
    "images-game/curtain2.png",
    "images-game/curtain3.png",
    "images-game/curtain4.png",
    "images-game/curtain5.png",
    "images-game/curtain6.png",
    "images-game/curtain7.png",
    "images-game/curtain8.png",
    "images-game/curtain9.png",
    "images-game/curtain10.png"
  );

  curtainOpen = loadAnimation(
    "images-game/curtain10.png",
    "images-game/curtain9.png",
    "images-game/curtain8.png",
    "images-game/curtain7.png",
    "images-game/curtain6.png",
    "images-game/curtain5.png",
    "images-game/curtain4.png",
    "images-game/curtain3.png",
    "images-game/curtain2.png",
    "images-game/curtain1.png"
  );
  star = loadImage("images-game/star.png");
}

function setup() {
  let canvas = createCanvas(1020, 680);
  canvas.style("z-index", "-1"); // 確保畫布在最底層

  backgroundMusic = musicTracks[state];

  startButton = createButton("開始遊戲"); // 創建按鈕
  startButton.position(width / 2 + 135, 550);
  startButton.class("startButton-style");
  allButtons.push(startButton);
  startButton.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    startIntro1(); // 執行原有邏輯
  });

  volumeControlButton = createImg("images-game/volume-on.png", "Volume On");
  volumeControlButton.position(width / 2 + 550, 50);
  volumeControlButton.size(40, 40);
  volumeControlButton.mouseClicked(toggleBackgroundMusic);
  volumeControlButton.attribute("src", "images-game/volume-on.png"); // 切換圖片

  nameInput = createInput(""); // 創建遊戲名稱輸入框
  nameInput.position(width / 2 - 215, 485);
  nameInput.size(150, 40);
  nameInput.hide();
  nameInput.input(() => {
    showNamePrompt = false; // 當用戶點擊輸入框後，提示文字消失
  });

  inputButton = createButton("確認"); // 創建確認按鈕
  inputButton.position(width / 2 - 35, 490);
  inputButton.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    handleNameSubmit();
  });
  inputButton.hide();

  introButton = createButton("—— 點擊進入下一頁");
  introButton.position(940, 640);
  introButton.class("introButton-style");
  introButton.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    startIntro2();
  });
  introButton.hide();
  allButtons.push(introButton);

  introButton2 = createButton("—— 點擊進入下一頁");
  introButton2.position(940, 640);
  introButton2.class("introButton-style");
  introButton2.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    startIntro3();
  });
  introButton2.hide();
  allButtons.push(introButton2);

  introButton3 = createButton("———點擊開啟你的演藝人生———");
  introButton3.position(500, 590);
  introButton3.class("introButton3-style");
  introButton3.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamelevel1();
  });
  introButton3.hide();
  allButtons.push(introButton3);

  // 第1關選項按鈕
  level1Button = createButton(" ");
  level1Button.position(320, 449);
  level1Button.class("levelButton-style");
  level1Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice1();
  });
  level1Button.hide();
  allButtons.push(level1Button);

  choice1_1Button = createButton("熬夜練習演技，死磕實力");
  choice1_1Button.position(width / 2 + 85, 250);
  choice1_1Button.class("choiceButton-style");
  choice1_1Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice1_1();
  });
  choice1_1Button.hide();
  allButtons.push(choice1_1Button);

  choice1_2Button = createButton("全力打造第一印象，\n光鮮亮相");
  choice1_2Button.position(width / 2 + 85, 370);
  choice1_2Button.class("choiceButton2-style");
  choice1_2Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice1_2();
  });
  choice1_2Button.hide();
  allButtons.push(choice1_2Button);

  choice1_3Button = createButton("偷偷找內部消息，走捷徑");
  choice1_3Button.position(width / 2 + 85, 490);
  choice1_3Button.class("choiceButton-style");
  choice1_3Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice1_3();
  });
  choice1_3Button.hide();
  allButtons.push(choice1_3Button);

  // 第二關選項按鈕
  level2Button = createButton(" ");
  level2Button.position(375, 380);
  level2Button.class("levelButton2-style");
  level2Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice2();
  });
  level2Button.hide();
  allButtons.push(level2Button);

  choice2_1Button = createButton("直播澄清，直面公眾");
  choice2_1Button.position(width / 2 + 99, 215);
  choice2_1Button.class("choiceButton3-style");
  choice2_1Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice2_1();
  });
  choice2_1Button.hide();
  allButtons.push(choice2_1Button);

  choice2_2Button = createButton("冷處理，讓時間沖淡一切");
  choice2_2Button.position(width / 2 + 99, 335);
  choice2_2Button.class("choiceButton4-style");
  choice2_2Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice2_2();
  });
  choice2_2Button.hide();
  allButtons.push(choice2_2Button);

  choice2_3Button = createButton("公關團隊逆轉話題，\n製造假新聞");
  choice2_3Button.position(width / 2 + 99, 455);
  choice2_3Button.class("choiceButton5-style");
  choice2_3Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice2_3();
  });
  choice2_3Button.hide();
  allButtons.push(choice2_3Button);

  // 第3關選項按鈕
  level3Button = createButton(" ");
  level3Button.position(350, 497);
  level3Button.class("levelButton3-style");
  level3Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice3();
  });
  level3Button.hide();
  allButtons.push(level3Button);

  choice3_1Button = createButton("拒絕誘惑，忠於夥伴");
  choice3_1Button.position(width / 2 + 99, 200);
  choice3_1Button.class("choiceButton-style");
  choice3_1Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice3_1();
  });
  choice3_1Button.hide();
  allButtons.push(choice3_1Button);

  choice3_2Button = createButton("接受條件，立刻簽約");
  choice3_2Button.position(width / 2 + 99, 320);
  choice3_2Button.class("choiceButton-style");
  choice3_2Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice3_2();
  });
  choice3_2Button.hide();
  allButtons.push(choice3_2Button);

  choice3_3Button = createButton("嘗試三方協商，尋求共贏");
  choice3_3Button.position(width / 2 + 99, 440);
  choice3_3Button.class("choiceButton6-style");
  choice3_3Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice3_3();
  });
  choice3_3Button.hide();
  allButtons.push(choice3_3Button);

  // 第4關選項按鈕
  level4Button = createButton(" ");
  level4Button.position(270, 520);
  level4Button.class("levelButton4-style");
  level4Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice4();
  });
  level4Button.hide();
  allButtons.push(level4Button);

  choice4_1Button = createButton("答應導演，準時赴約");
  choice4_1Button.position(width / 2 + 300, 200);
  choice4_1Button.class("choiceButton7-style");
  choice4_1Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice4_1();
  });
  choice4_1Button.hide();
  allButtons.push(choice4_1Button);

  choice4_2Button = createButton("拒絕導演，\n苦練演技證明自己");
  choice4_2Button.position(width / 2 + 300, 320);
  choice4_2Button.class("choiceButton8-style");
  choice4_2Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice4_2();
  });
  choice4_2Button.hide();
  allButtons.push(choice4_2Button);

  choice4_3Button = createButton("偷偷錄音，\n發到公開平台爆料");
  choice4_3Button.position(width / 2 + 300, 440);
  choice4_3Button.class("choiceButton8-style");
  choice4_3Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice4_3();
  });
  choice4_3Button.hide();
  allButtons.push(choice4_3Button);

  // 第5關選項按鈕
  level5Button = createButton(" ");
  level5Button.position(490, 497);
  level5Button.class("levelButton5-style");
  level5Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice5();
  });
  level5Button.hide();
  allButtons.push(level5Button);

  choice5_1Button = createButton("選擇都市愛情劇，穩扎穩打");
  choice5_1Button.position(575, 200);
  choice5_1Button.class("choiceButton9-style");
  choice5_1Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice5_1();
  });
  choice5_1Button.hide();
  allButtons.push(choice5_1Button);

  choice5_2Button = createButton("挑戰武打片，跳脫舒適圈");
  choice5_2Button.position(575, 300);
  choice5_2Button.class("choiceButton10-style");
  choice5_2Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice5_2();
  });
  choice5_2Button.hide();
  allButtons.push(choice5_2Button);

  choice5_3Button = createButton("嘗試向武打片前輩詢求建議");
  choice5_3Button.position(575, 400);
  choice5_3Button.class("choiceButton9-style");
  choice5_3Button.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gamechoice5_3();
  });
  choice5_3Button.hide();
  allButtons.push(choice5_3Button);

  //最後分數頁
  resultButton = createButton(""); // 創建按鈕，但不顯示文字
  resultButton.position(500, 550); // 設置按鈕的位置，定位到圖片上的物件
  resultButton.class("finalScore-style"); // 添加 CSS 類名來應用樣式
  resultButton.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    gameEnding();
  }); // 點擊按鈕時觸發事件
  resultButton.hide(); // 預設隱藏按鈕
  allButtons.push(resultButton); // 將按鈕加入按鈕陣列管理

  restartButton = createButton("重新開始");
  restartButton.position(width / 2 +150, height - 10); // 按鈕位置，置於頁面中間底部
  restartButton.class("restartButton-style"); // 添加按鈕樣式
  restartButton.mouseClicked(() => {
    playClickSound(); // 播放點擊音效
    restartGame();
  }); // 綁定點擊事件
  restartButton.hide(); // 預設隱藏按鈕

  //音樂轉換
  updateBackgroundMusic("start");
}

//頁面改變
function draw() {
  if (transitionState !== "none") {
    handleSceneTransition(state, nextScene);
    return; // 避免動畫期間執行其他邏輯
  }

  if (state === "start") {
    drawStartScene();
  } else if (state === "Introduction1") {
    drawIntroScene1();
  } else if (state === "Introduction2") {
    drawIntroScene2();
  } else if (state === "Introduction3") {
    drawIntroScene3();
  } else if (state === "level1") {
    drawlevel1();
  } else if (state === "choice1") {
    drawchoice1();
  } else if (state === "choice1_1") {
    drawresult1_1();
  } else if (state === "choice1_2") {
    drawresult1_2();
  } else if (state === "choice1_3") {
    drawresult1_3();
  } else if (state === "level2") {
    drawlevel2();
  } else if (state === "choice2") {
    drawchoice2();
  } else if (state === "choice2_1") {
    drawresult2_1();
  } else if (state === "choice2_2") {
    drawresult2_2();
  } else if (state === "choice2_3") {
    drawresult2_3();
  } else if (state === "level3") {
    drawlevel3();
  } else if (state === "choice3") {
    drawchoice3();
  } else if (state === "choice3_1") {
    drawresult3_1();
  } else if (state === "choice3_2") {
    drawresult3_2();
  } else if (state === "choice3_3") {
    drawresult3_3();
  } else if (state === "level4") {
    drawlevel4();
  } else if (state === "choice4") {
    drawchoice4();
  } else if (state === "choice4_1") {
    drawresult4_1();
  } else if (state === "choice4_2") {
    drawresult4_2();
  } else if (state === "choice4_3") {
    drawresult4_3();
  } else if (state === "level5") {
    drawlevel5();
  } else if (state === "choice5") {
    drawchoice5();
  } else if (state === "choice5_1") {
    drawresult5_1();
  } else if (state === "choice5_2") {
    drawresult5_2();
  } else if (state === "choice5_3") {
    drawresult5_3();
  } else if (state === "finalscore") {
    drawfinalscore();
  } else if (state === "ending1") {
    drawEnding1();
  } else if (state === "ending2") {
    drawEnding2();
  } else if (state === "ending3") {
    drawEnding3();
  } else if (state === "ending4") {
    drawEnding4();
  } else if (state === "ending5") {
    drawEnding5();
  }
}

function drawScoreBar(label, value, x, y, barColor) {
  const barWidth = 300; // 增大分數條寬度
  const barHeight = 25; // 增大分數條高度
  const maxValue = 20; // 最大分數值

  // 繪製標籤
  fill(255); // 白色文字
  noStroke();
  textSize(24); // 增大字體大小
  textAlign(RIGHT);
  text(label, x - 20, y + barHeight / 2);

  // 繪製背景條
  stroke(200);
  fill(240, 240, 240, 150); // 淡灰色，帶透明度
  rect(x, y, barWidth, barHeight);

  // 繪製分數條
  noStroke();
  fill(barColor);
  const currentWidth = (value / maxValue) * barWidth;
  rect(x, y, currentWidth, barHeight);

  // 顯示當前數值
  fill(255); // 白色文字
  textAlign(LEFT);
  text(Math.floor(value), x + barWidth + 20, y + barHeight / 2);
}

function drawPlayerName() {
  if (playerName) {
    fill(255);
    textSize(32);
    textAlign(LEFT); // 左對齊
    text(playerName, width / 2 - 400, 160); // 繪製玩家名稱，位置為左上角
  }
}

//取得當前背景
function getCurrentBackground(state) {
  switch (state) {
    case "level1":
      return levelone;
    case "level2":
      return leveltwo;
    case "level3":
      return levelthree;
    case "level4":
      return levelfour;
    case "level5":
      return levelfive;

    case "choice1":
      return choiceone;
    case "choice2":
      return choicetwo;
    case "choice3":
      return choicethree;
    case "choice4":
      return choicefour;
    case "choice5":
      return choicefive;

    case "choice1_1":
      return result1_1;
    case "choice1_2":
      return result1_2;
    case "choice1_3":
      return result1_3;

    case "choice2_1":
      return result2_1;
    case "choice2_2":
      return result2_2;
    case "choice2_3":
      return result2_3;

    case "choice3_1":
      return result3_1;
    case "choice3_2":
      return result3_2;
    case "choice3_3":
      return result3_3;

    case "choice4_1":
      return result4_1;
    case "choice4_2":
      return result4_2;
    case "choice4_3":
      return result4_3;

    case "choice5_1":
      return result5_1;
    case "choice5_2":
      return result5_2;
    case "choice5_3":
      return result5_3;

    case "finalscore":
      return scorePage;

    case "ending1":
      return end1Page;
    case "ending2":
      return end2Page;
    case "ending3":
      return end3Page;
    case "ending4":
      return end4Page;
    case "ending5":
      return end5Page;

    case "start":
      return startPage;
    case "Introduction1":
      return intro;
    case "Introduction2":
      return intro2;
    case "Introduction3":
      return intro3;

    default:
      return null; // 預設無背景
  }
}

//管理按鈕
function hideAllButtons() {
  // 隱藏所有按鈕
  allButtons.forEach((button) => button.hide());
  nameInput.hide();
  inputButton.hide();
  restartButton.hide();
}

function showButtons(buttons) {
  // 顯示指定的按鈕
  buttons.forEach((button) => button.show());
}

function playClickSound() {
  if (isMusicPlaying) {
    clickSound.play(); // 播放點擊音效
  }
}

function handleSceneTransition(currentState, nextState) {
  if (transitionBackground) {
    background(transitionBackground);
  }

  if (transitionState === "none") {
    transitionState = "close"; // 初始化為閉幕動畫狀態
    transitionBackground = getCurrentBackground(currentState); // 設置背景
    nextScene = nextState;
    closeHasPlayed = false;

    // 確保動畫從第一幀開始播放
    curtainClose.stop();
    curtainClose.changeFrame(0);
    curtainClose.play();
  } else if (transitionState === "close") {
    animation(curtainClose, width / 2, height / 2);

    if (curtainClose.getFrame() === curtainClose.getLastFrame()) {
      // 確保動畫完整播放後才更新狀態
      closeHasPlayed = true;
      transitionState = "none"; // 動畫完成後切換狀態
      state = nextScene; // 切換到下一個場景
      if (nextScene.startsWith("ending")) {
        updateBackgroundMusic(nextScene);
      }
      timeoutTriggered = false;
    }
  }
}

function drawResult(backgroundImage, nextState) {
  background(backgroundImage);
  hideAllButtons();

  if (!timeoutTriggered) {
    timeoutTriggered = true;

    setTimeout(() => {
      transitionState = "close";
      nextScene = nextState;
      closeHasPlayed = false;

      // 重置動畫，確保從第一幀播放
      curtainClose.stop();
      curtainClose.changeFrame(0);
      curtainClose.play();
    }, 4000); // 結果顯示4秒後開始轉場
  }

  if (transitionState !== "none") {
    handleSceneTransition(state, nextScene);
  }
}

// 音效切換邏輯
function toggleBackgroundMusic() {
  if (isMusicPlaying) {
    stopBackgroundMusic();
    volumeControlButton.attribute("src", "images-game/volume-off.png"); // 切換為關閉音樂圖示
    isMusicPlaying = false; // 更新狀態
  } else {
    playBackgroundMusic();
    volumeControlButton.attribute("src", "images-game/volume-on.png"); // 切換為開啟音樂圖示
    isMusicPlaying = true; // 更新狀態
  }
}

// 播放背景音樂
function playBackgroundMusic() {
  if (!backgroundMusic.isPlaying()) {
    // 檢查是否正在播放
    backgroundMusic.loop(); // 循環播放
    backgroundMusic.setVolume(0.5); // 設定音量
  }
}
// 停止背景音樂
function stopBackgroundMusic() {
  if (backgroundMusic.isPlaying()) {
    // 檢查是否正在播放
    backgroundMusic.stop(); // 停止播放
  }
}

function updateBackgroundMusic(newState) {
  // 如果當前有音樂在播放，先停止
  if (backgroundMusic && backgroundMusic.isPlaying()) {
    backgroundMusic.stop();
  }

  // 根據新狀態設定對應的音樂
  if (musicTracks[newState]) {
    backgroundMusic = musicTracks[newState];
    // 如果音樂開關是開啟的，就播放新音樂
    if (isMusicPlaying) {
      backgroundMusic.loop();
      backgroundMusic.setVolume(0.5);
    }
  }
}

// 處理輸入框的點擊事件
nameInput.mousePressed(() => {
  if (!nameEntered) {
    nameInput.value(""); // 清空輸入框
  }
});

// 處理玩家名稱提交
function handleNameSubmit() {
  if (nameInput.value().trim() !== "") {
    playerName = nameInput.value().trim(); // \
    nameEntered = true; // 設置名稱已輸入的標記
  }
}

//封面
function drawStartScene() {
  background(startPage);
  hideAllButtons(); // 隱藏所有按鈕
  showButtons([startButton]); // 只顯示開始按鈕
}

//玩法介紹
function startIntro1() {
  state = "Introduction1";
  hideAllButtons();
  showButtons([introButton]);
}

function drawIntroScene1() {
  background(intro);
}

//角色介紹
function startIntro2() {
  state = "Introduction2";
  hideAllButtons();
  showButtons([introButton2]);
}

function drawIntroScene2() {
  background(intro2);

  let inputX = width / 2 - 215;
  let inputY = 485;

  if (state === "Introduction2") {
    if (!nameEntered) {
      nameInput.position(inputX, inputY);
      nameInput.attribute("placeholder", "請點擊輸入你的遊戲名稱");
      nameInput.show();

      inputButton.position(inputX + 180, inputY + 10);
      inputButton.show();
    } else {
      nameInput.hide();
      inputButton.hide();

      fill(161, 202, 241);
      textSize(28);
      textAlign(LEFT);
      text(playerName, inputX - 80, inputY - 10);
    }
  } else {
    nameInput.hide();
    inputButton.hide();
  }
}

//引言
function startIntro3() {
  state = "Introduction3";
  hideAllButtons();
  showButtons([introButton3]);
}

function drawIntroScene3() {
  background(intro3);
}

//第一關敘述
function gamelevel1() {
  state = "level1";
  hideAllButtons();
  showButtons([level1Button]);
}

function drawlevel1() {
  background(levelone);
}

//第一關選擇
function gamechoice1() {
  state = "choice1";
  hideAllButtons();
  showButtons([choice1_1Button, choice1_2Button, choice1_3Button]);

  choice1_1Button.mouseOver(() => {
    choice1_1Button.class("choiceButton-style-over");
  });
  choice1_1Button.mouseOut(() => {
    choice1_1Button.class("choiceButton-style");
  });
  choice1_2Button.mouseOver(() => {
    choice1_2Button.class("choiceButton2-style-over");
  });
  choice1_2Button.mouseOut(() => {
    choice1_2Button.class("choiceButton2-style");
  });
  choice1_3Button.mouseOver(() => {
    choice1_3Button.class("choiceButton-style-over");
  });
  choice1_3Button.mouseOut(() => {
    choice1_3Button.class("choiceButton-style");
  });
}

function drawchoice1() {
  background(choiceone);
}

// 第一關結果1_1
function gamechoice1_1() {
  state = "choice1_1";
  popularity += 1;
  acting += 5;
}

function drawresult1_1() {
  drawResult(result1_1, "level2"); // 顯示結果頁面背景並控制停留時間和轉場
  hideAllButtons(); // 隱藏所有按鈕，避免其他交互干擾
}

///第一關結果1_2
function gamechoice1_2() {
  state = "choice1_2";
  popularity += 2;
  acting -= 1;
}

function drawresult1_2() {
  drawResult(result1_2, "level2");
  hideAllButtons();
}

//第一關結果1_3
function gamechoice1_3() {
  state = "choice1_3";
  popularity += 3;
  moral -= 2;
}

function drawresult1_3() {
  drawResult(result1_3, "level2");
  hideAllButtons();
}

//第二關敘述
function drawlevel2() {
  background(leveltwo);
  hideAllButtons();
  showButtons([level2Button]);
}

//第二關選項
function gamechoice2() {
  state = "choice2";
  hideAllButtons();
  showButtons([choice2_1Button, choice2_2Button, choice2_3Button]);

  choice2_1Button.mouseOver(() => {
    choice2_1Button.class("choiceButton3-style-over");
  });
  choice2_1Button.mouseOut(() => {
    choice2_1Button.class("choiceButton3-style");
  });
  choice2_2Button.mouseOver(() => {
    choice2_2Button.class("choiceButton4-style-over");
  });
  choice2_2Button.mouseOut(() => {
    choice2_2Button.class("choiceButton4-style");
  });
  choice2_3Button.mouseOver(() => {
    choice2_3Button.class("choiceButton5-style-over");
  });
  choice2_3Button.mouseOut(() => {
    choice2_3Button.class("choiceButton5-style");
  });
}

function drawchoice2() {
  background(choicetwo);
}

//第二關結果2_1
function gamechoice2_1() {
  state = "choice2_1";
  popularity += 2;
  moral += 2;
}
function drawresult2_1() {
  drawResult(result2_1, "level3");
  hideAllButtons();
}

//第二關結果2_2
function gamechoice2_2() {
  state = "choice2_2";
  popularity -= 1;
}
function drawresult2_2() {
  drawResult(result2_2, "level3");
  hideAllButtons();
}

//第二關結果2_3
function gamechoice2_3() {
  state = "choice2_3";
  popularity += 3;
  moral -= 3;
}
function drawresult2_3() {
  drawResult(result2_3, "level3");
  hideAllButtons();
}

//第三關敘述
function drawlevel3() {
  background(levelthree);
  hideAllButtons();
  showButtons([level3Button]);
}

//第三關選項
function gamechoice3() {
  state = "choice3";
  hideAllButtons();
  showButtons([choice3_1Button, choice3_2Button, choice3_3Button]);

  choice3_1Button.mouseOver(() => {
    choice3_1Button.class("choiceButton-style-over");
  });
  choice3_1Button.mouseOut(() => {
    choice3_1Button.class("choiceButton-style");
  });
  choice3_2Button.mouseOver(() => {
    choice3_2Button.class("choiceButton-style-over");
  });
  choice3_2Button.mouseOut(() => {
    choice3_2Button.class("choiceButton-style");
  });
  choice3_3Button.mouseOver(() => {
    choice3_3Button.class("choiceButton6-style-over");
  });
  choice3_3Button.mouseOut(() => {
    choice3_3Button.class("choiceButton6-style");
  });
}

function drawchoice3() {
  background(choicethree);
}

//第3關結果3_1
function gamechoice3_1() {
  state = "choice3_1";
  popularity += 1;
  moral += 3;
}
function drawresult3_1() {
  drawResult(result3_1, "level4");
  hideAllButtons();
}

//第3關結果3_2
function gamechoice3_2() {
  state = "choice3_2";
  popularity += 3;
  acting += 2;
  moral -= 2;
}
function drawresult3_2() {
  drawResult(result3_2, "level4");
  hideAllButtons();
}

//第3關結果3_3
function gamechoice3_3() {
  state = "choice3_3";
  popularity -= 3;
  acting -= 1;
  moral += 2;
}
function drawresult3_3() {
  drawResult(result3_3, "level4");
  hideAllButtons();
}

//第四關敘述
function drawlevel4() {
  background(levelfour);
  hideAllButtons();
  showButtons([level4Button]);
}
//第四關選項
function gamechoice4() {
  state = "choice4";
  hideAllButtons();
  showButtons([choice4_1Button, choice4_2Button, choice4_3Button]);

  choice4_1Button.mouseOver(() => {
    choice4_1Button.class("choiceButton7-style-over");
  });
  choice4_1Button.mouseOut(() => {
    choice4_1Button.class("choiceButton7-style");
  });
  choice4_2Button.mouseOver(() => {
    choice4_2Button.class("choiceButton8-style-over");
  });
  choice4_2Button.mouseOut(() => {
    choice4_2Button.class("choiceButton8-style");
  });
  choice4_3Button.mouseOver(() => {
    choice4_3Button.class("choiceButton8-style-over");
  });
  choice4_3Button.mouseOut(() => {
    choice4_3Button.class("choiceButton8-style");
  });
}

function drawchoice4() {
  background(choicefour);
}

//第4關結果4_1
function gamechoice4_1() {
  state = "choice4_1";
  popularity += 4;
  moral -= 3;
}
function drawresult4_1() {
  drawResult(result4_1, "level5");
  hideAllButtons();
}

//第4關結果4_2
function gamechoice4_2() {
  state = "choice4_2";
  acting += 5;
  moral += 3;
}
function drawresult4_2() {
  drawResult(result4_2, "level5");
  hideAllButtons();
}

//第4關結果4_3
function gamechoice4_3() {
  state = "choice4_3";
  popularity += 2;
  moral += 2;
}
function drawresult4_3() {
  drawResult(result4_3, "level5");
  hideAllButtons();
}

//第五關敘述
function drawlevel5() {
  background(levelfive);
  hideAllButtons();
  showButtons([level5Button]);
}
//第五關選項
function gamechoice5() {
  state = "choice5";
  hideAllButtons();
  showButtons([choice5_1Button, choice5_2Button, choice5_3Button]);

  choice5_1Button.mouseOver(() => {
    choice5_1Button.class("choiceButton9-style-over");
  });
  choice5_1Button.mouseOut(() => {
    choice5_1Button.class("choiceButton9-style");
  });
  choice5_2Button.mouseOver(() => {
    choice5_2Button.class("choiceButton10-style-over");
  });
  choice5_2Button.mouseOut(() => {
    choice5_2Button.class("choiceButton10-style");
  });
  choice5_3Button.mouseOver(() => {
    choice5_3Button.class("choiceButton9-style-over");
  });
  choice5_3Button.mouseOut(() => {
    choice5_3Button.class("choiceButton9-style");
  });
}

function drawchoice5() {
  background(choicefive);
}

//第5關結果5_1
function gamechoice5_1() {
  state = "choice5_1";
  popularity += 3;
  acting += 2;
}
function drawresult5_1() {
  drawResult(result5_1, "finalscore"); //轉到最終分數頁
  hideAllButtons();
}

//第5關結果5_2
function gamechoice5_2() {
  state = "choice5_2";
  popularity += 2;
  acting += 5;
}
function drawresult5_2() {
  drawResult(result5_2, "finalscore"); //轉到最終分數頁
  hideAllButtons();
}

//第5關結果5_3
function gamechoice5_3() {
  state = "choice5_3";
  popularity -= 3;
  acting -= 2;
}
function drawresult5_3() {
  drawResult(result5_3, "finalscore"); //轉到最終分數頁
  hideAllButtons();
}

//最終分數
function drawfinalscore() {
  background(scorePage); // 設定背景
  if (!animatingScores) {
    targetPopularity = popularity;
    targetActing = acting;
    targetMoral = moral;
    animatingScores = true;
  }

  // 調整每個分數條的 X 和 Y 位置
  const centerX = width / 2 - 80; // 向右偏移
  const startY = 180; // 起始 Y 位置
  const gapY = 90; // 每個分數條之間的間距

  drawScoreBar(
    "⭐ 知名度",
    currentPopularity,
    centerX,
    startY,
    color(255, 140, 0)
  );
  drawScoreBar(
    "📖 演技指數",
    currentActing,
    centerX,
    startY + gapY,
    color(30, 144, 255)
  );
  drawScoreBar(
    "❤️ 道德指數",
    currentMoral,
    centerX,
    startY + gapY * 2,
    color(50, 205, 50)
  );

  // 更新分數動畫
  if (animatingScores) {
    if (currentPopularity < targetPopularity)
      currentPopularity += animationSpeed;
    if (currentActing < targetActing) currentActing += animationSpeed;
    if (currentMoral < targetMoral) currentMoral += animationSpeed;

    // 確認動畫完成
    if (
      currentPopularity >= targetPopularity &&
      currentActing >= targetActing &&
      currentMoral >= targetMoral
    ) {
      animatingScores = false;
      animationComplete = true;
      resultButton.show(); // 顯示按鈕
    }
  }
}

// 結局處理邏輯
function determineEnding() {
  // 從最具限制性的條件開始檢查
  if (popularity >= 14 && acting >= 13 && moral >= 8 && moral <= 18) {
    return "ending1";
  } else if (popularity >= 10 && moral <= 4) {
    return "ending2";
  } else if (popularity >= 8 && acting >= 9 && moral >= 9 && moral < 12) {
    return "ending4";
  } else if (popularity >= 10 && acting >= 8 && moral >= 12) {
    return "ending5";
  } else if (popularity <= 8 && acting <= 8 && moral >= 5 && moral <= 8) {
    return "ending3";
  } else {
    return "ending3";
  }
}

function gameEnding() {
  if (!animationComplete) return; // 確保分數動畫完成

  if (transitionState === "none") {
    const endingType = determineEnding(); // 獲取結局類型
    handleSceneTransition(state, endingType); // 進行場景切換
  }
}

function restartGame() {
  state = "start"; // 重置狀態
  transitionState = "none";
  restartButton.hide();

  // 重置玩家名稱相關變數
  playerName = "";
  nameEntered = false;
  nameInput.value(""); // 清空輸入框
  nameInput.hide(); // 隱藏輸入框
  inputButton.hide(); // 隱藏確認按鈕

  // 重置分數
  popularity = 4;
  acting = 6;
  moral = 8;

  // 重置動畫狀態
  animatingScores = false;
  currentPopularity = 0;
  currentActing = 0;
  currentMoral = 0;

  updateBackgroundMusic("start");
}

function drawEnding1() {
  background(end1Page);
  hideAllButtons();
  drawPlayerName();
  restartButton.show();
}

function drawEnding2() {
  background(end2Page);
  hideAllButtons();
  drawPlayerName();
  restartButton.show();
}

function drawEnding3() {
  background(end3Page);
  hideAllButtons();
  drawPlayerName();
  restartButton.show();
}

function drawEnding4() {
  background(end4Page);
  hideAllButtons();
  drawPlayerName();
  restartButton.show();
}

function drawEnding5() {
  background(end5Page);
  hideAllButtons();
  drawPlayerName();
  restartButton.show();
}
