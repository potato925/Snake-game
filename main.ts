const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = canvas.width;
let snake: { x: number; y: number }[] = [{ x: 10, y: 10 }];
let food: { x: number; y: number } = generateFoodPosition();
let dx = 0;
let dy = 0;

function generateFoodPosition(): { x: number; y: number } {
    const x = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    return { x, y };
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = generateFoodPosition();
    } else {
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

document.addEventListener("keydown", (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 37 && dx !== boxSize) {
        dx = -boxSize;
        dy = 0;
    } else if (keyCode === 39 && dx !== -boxSize) {
        dx = boxSize;
        dy = 0;
    } else if (keyCode === 38 && dy !== boxSize) {
        dx = 0;
        dy = -boxSize;
    } else if (keyCode === 40 && dy !== -boxSize) {
        dx = 0;
        dy = boxSize;
    }
});

draw();