let curtainClose;
let curtainOpan;


function preload(){
    curtainClose = loadAnimation('images-game/curtain1.png',
        'images-game/curtain2.png', 
        'images-game/curtain3.png',
        'images-game/curtain4.png',
        'images-game/curtain5.png',
        'images-game/curtain6.png',
        'images-game/curtain7.png',
        'images-game/curtain8.png',
        'images-game/curtain9.png',
        'images-game/curtain10.png');
    curtainOpan = loadAnimation('images-game/curtain10.png',
        'images-game/curtain9.png', 
        'images-game/curtain8.png',
        'images-game/curtain7.png',
        'images-game/curtain6.png',
        'images-game/curtain5.png',
        'images-game/curtain4.png',
        'images-game/curtain3.png',
        'images-game/curtain2.png',
        'images-game/curtain1.png');
}

function setup() {
    createCanvas( 1200, 800);
}



async function draw() {
    curtainClose();
    await sleep(1);
    curtainOpen();
}

function curtainClose(){
    animation(curtainClose, width/2, height/2);
}

function curtainOpen(){
    animation(curtainOpan, width/2, height/2);
}
