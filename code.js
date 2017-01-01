var canvasHeight = 400;
var canvasWidth = 400;

var ballRadio = 20;
var ballXPosition = 150;
var ballYPosition = 50;

var ballXSpeed = 7; //random(20);
var ballYSpeed = 7; //random(20);

var paddleWidth = 150;
var paddleHeight = 20;
var paddleYPossition = canvasHeight - 30;

var bricksPerRow = 5;
var rowsOfBricks = 2;
var brickHeight = 40;
var brickWidth = canvasWidth / bricksPerRow;

var bricks = [[]];

void setup() {
  size(canvasHeight, canvasWidth);
};

var bounceBall = function() {
  noStroke();
  fill(255, 51, 153);
  ellipse(ballXPosition, ballYPosition, ballRadio * 2, ballRadio * 2);

  if ((ballXPosition + ballRadio >= canvasWidth) || (ballXPosition - ballRadio <= 0)) {
    ballXSpeed = ballXSpeed * -1;
  }

  if ((ballYPosition + ballRadio >= canvasHeight) || (ballYPosition - ballRadio <= 0)) {
    ballYSpeed = ballYSpeed * -1;
  }
};

var hitPaddle = function() {
  noStroke();
  fill(0, 51, 204);
  rect(mouseX - paddleWidth / 2, paddleYPossition, paddleWidth, paddleHeight);

  if ((ballYPosition + ballRadio >= paddleYPossition) &&
    (ballXPosition + ballRadio > mouseX - paddleWidth / 2) &&
    (ballXPosition - ballRadio < mouseX + paddleWidth / 2)) {
    ballYSpeed = ballYSpeed * -1;
  }
};

var hitBricks = function() {
  stroke(0,0,0);

  for (var j = 0; j < rowsOfBricks; j++) {
    for (var i = 0; i < bricksPerRow; i++) {
      if (bricks[j][i] == true) {
        if ((ballYPosition - ballRadio < brickHeight * j) &&
            (ballXPosition - ballRadio >= brickWidth * i) &&
            (ballXPosition + ballRadio <= brickWidth * (i + 1))) {
          bricks[j][i] = false;
          ballYSpeed = ballYSpeed * -1;
        } else {
          fill(10 * (i + j), 255 / (i + j), (i * 2) + j + 50);
          rect(i * brickWidth, j * brickHeight, brickWidth, brickHeight);
        }
      }
    }
  }
};

// Initalize the brick array
for (var j = 0; j < rowsOfBricks; j++) {
  for (var i = 0; i < bricksPerRow; i++) {
    if (i === 0) {
      bricks[j] = []
    }
    bricks[j][i] = true;
  }
}

void draw() {
  background(204, 255, 204);

  bounceBall();

  hitPaddle();

  hitBricks();

  ballXPosition = ballXPosition + ballXSpeed;
  ballYPosition = ballYPosition + ballYSpeed;
};
