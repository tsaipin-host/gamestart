let curtainClose
let curtainOpen;
let closeHasPlayed = false; // 控制是否完成所有動畫
let openHasPlayed = false; // 控制是否完成所有動畫

function preload() {
    curtainClose = loadAnimation(
        '../images-game/curtain1.png',
        '../images-game/curtain2.png',
        '../images-game/curtain3.png',
        '../images-game/curtain4.png',
        '../images-game/curtain5.png',
        '../images-game/curtain6.png',
        '../images-game/curtain7.png',
        '../images-game/curtain8.png',
        '../images-game/curtain9.png',
        '../images-game/curtain10.png'
    );

    curtainOpen = loadAnimation(
        '../images-game/curtain10.png',
        '../images-game/curtain9.png',
        '../images-game/curtain8.png',
        '../images-game/curtain7.png',
        '../images-game/curtain6.png',
        '../images-game/curtain5.png',
        '../images-game/curtain4.png',
        '../images-game/curtain3.png',
        '../images-game/curtain2.png',
        '../images-game/curtain1.png'
    );
}

function setup() {
    createCanvas(1200, 800);

    // 設定動畫只播放一次
    curtainClose.looping = false;
    curtainOpen.looping = false;
}

function draw() {
    background(100);
    open();
}

function close(){
    if (!closeHasPlayed) {
        // 播放動畫
        animation(curtainClose, width / 2, height / 2);
        // 如果動畫播放到最後一幀，設置播放標誌為 true
        if (curtainClose.getFrame() === curtainClose.getLastFrame()) {
            hasPlayed = true;
        }
    } else {
        // 播放完後的靜態畫面
        image(curtainClose.getFrameImage(curtainClose.getLastFrame()), width / 2 - curtainClose.frameWidth / 2, height / 2 - curtainClose.frameHeight / 2);
    }
}

function open(){
    if (!openHasPlayed) {
        // 播放動畫
        animation(curtainOpen, width / 2, height / 2);
        // 如果動畫播放到最後一幀，設置播放標誌為 true
        if (curtainOpen.getFrame() === curtainOpen.getLastFrame()) {
            openHasPlayed = true;
        }
    }
}
