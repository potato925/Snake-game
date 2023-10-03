var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var boxSize = 20;
var canvasSize = canvas.width;
var snake = [{ x: 10, y: 10 }];
var food = generateFoodPosition();
var dx = 0;
var dy = 0;
function generateFoodPosition() {
    var x = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    var y = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    return { x: x, y: y };
}
function drawSnake() {
    snake.forEach(function (segment) {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}
function moveSnake() {
    var head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = generateFoodPosition();
    }
    else {
        snake.pop();
    }
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}
function draw() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    requestAnimationFrame(draw);
}
document.addEventListener("keydown", function (event) {
    var keyCode = event.keyCode;
    if (keyCode === 37 && dx !== boxSize) {
        dx = -boxSize;
        dy = 0;
    }
    else if (keyCode === 39 && dx !== -boxSize) {
        dx = boxSize;
        dy = 0;
    }
    else if (keyCode === 38 && dy !== boxSize) {
        dx = 0;
        dy = -boxSize;
    }
    else if (keyCode === 40 && dy !== -boxSize) {
        dx = 0;
        dy = boxSize;
    }
});
draw();
