var difficultyLevel = 4; //1,2,3,4
var imgheight = 58;
var imgwidth = 38;
var cardsPerRow = 6;
var lastOpenedBox = -1;
var randomList = [];
var resultList = [];
var images = [];
var uniqueImageCount = 0;
var totalRows = 1;
var lastOpenedImageNum = -1;
var clickedBox = -1;
var timer = 40;
var score = 0;
var isGameOver = false;
var bgmem2img;

function preload() {
  bgmem2img=loadImage("assets/Picture7.png");
}

function setup() {
  createCanvas(500, 500);

  img = createImage(50, 50);
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      img.set(x, y, [255,255,0,200]);
    }
  }
  img.updatePixels();
  randomList = getRandomList(difficultyLevel);
  uniqueImageCount = difficultyLevel * 3;
  totalRows = difficultyLevel;
  for (let i = 0; i < uniqueImageCount; i++) {
    images.push(loadImage('assets/image' + i + '.png'));
    resultList.push(0);
  }


}

function draw() {
  background(bgmem2img);
  
  textSize(35)
  text("MEMORY",150,70);
  if (isGameOver) {
    displayScore();
    return;
  }
  timerCheck();
  let xpos = 80;
  let ypos = 100;
  for (i = 0; i < totalRows; i++) {
    for (j = 0; j < cardsPerRow; j++) {

      let currentBox = i * cardsPerRow + j;
      let actualImageNum = randomList[currentBox] % ((difficultyLevel) * 3);
      let lastOpenedImageNum = randomList[lastOpenedBox] % ((difficultyLevel) * 3);
      var imageToShow;
      if (lastOpenedBox == currentBox) {
        imageToShow = images[lastOpenedImageNum];
      } else {
        imageToShow = img;
      }
      image(imageToShow, xpos, ypos, imgwidth, imgheight);

      if (mouseIsPressed &&
        mouseX > xpos &&
        mouseX < xpos + imgwidth &&
        mouseY > ypos &&
        mouseY < ypos + imgheight
      ) {
        clickedBox = currentBox;
        if (lastOpenedBox != clickedBox) {

          if (actualImageNum == lastOpenedImageNum) {
            resultList[actualImageNum] = 1;
          }
        }
      }

      resultList.forEach((result, i) => {
        if (result == 1 && actualImageNum == i)
          image(images[i], xpos, ypos, imgwidth, imgheight);
      })

      xpos = xpos + imgwidth + 25;
    }
    xpos = 80;
    ypos = ypos + imgheight + 25;
  }

}

function mouseReleased() {
  lastOpenedBox = clickedBox;
}

function getRandomList(difficultyLevel) {
  var numbers = [];

  for (i = 0; i < (difficultyLevel * 6); i++) {
    numbers.push(i);
  }

  numbers.sort(function() {
    return Math.random() - 0.5;
  });
  return numbers;
}

function displayScore() {
  text("GAME OVER", width / 3, height / 2.5);

  if (score == 100) {
    text("Awesome,You scored " + score + '%', 100, 300);
  } else {
    
    text("YOUR SCORE: " + score + '%',width / 4, 250);
    textSize(30)
    text("TRY AGAIN",190,340);
    text(" !!!YOU CAN WIN!!!",140,390);
  } 
}

function timerCheck() {
  textSize(25)
  text("Time: " + timer, 215, 440);

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  var sum = resultList.reduce(function(a, b) {
    return a + b;
  }, 0);

  score = Math.round(sum * 100 / uniqueImageCount);

  if (timer == 0) {
    isGameOver = true;
    displayScore();
  } else if (score == 100) {
    isGameOver = true;
  }
}