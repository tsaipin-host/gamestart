let popularity = 10; // 知名度
let acting = 15; // 演技指數
let moral = 12; // 道德指數

let animatingScores = false;
let currentPopularity = 0;
let currentActing = 0;
let currentMoral = 0;
let targetPopularity = 0;
let targetActing = 0;
let targetMoral = 0;
const animationSpeed = 0.5; // 動畫速度
let animationComplete = false;

let scorePage; // 背景圖片
let resultButton; // 查看結果按鈕

function preload() {
  scorePage = loadImage("../images-game/Finalscore.png"); // 加載背景
}

function setup() {
  createCanvas(800, 600); // 設定畫布尺寸
  resultButton = createButton("查看結果");
  resultButton.position(350, 500);
  resultButton.mouseClicked(() => alert("查看結果觸發！"));
  resultButton.hide(); // 初始化時隱藏按鈕
}

function draw() {
  drawfinalscore();
}

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
