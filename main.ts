const canvas: HTMLCanvasElement = document.createElement('canvas');
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

canvas.setAttribute('style', 'display:block;margin:auto;background-color: #aaa');

document.body.appendChild(canvas);

const GRID: number = 25;
const STAGE: number = canvas.width / GRID;

interface Snake {
    x: number | null;
    y: number | null;
    dx: number;
    dy: number;
    tail: number | null;
    body: Array<{ x: number; y: number }>;

    update: () => void;
    draw: () => void;
}

const snake: Snake = {
    x: null,
    y: null,
    dx: 1,
    dy: 0,
    tail: null,
    body: [],

    update: function () {
        if (this.x !== null && this.y !== null) {
            this.body.push({ x: this.x, y: this.y });
            this.x += this.dx;
            this.y += this.dy;

            this.body.forEach(obj => {
                if (this.x === obj.x && this.y === obj.y) {
                    init();
                }
            });
            if (this.body.length > (this.tail as number)) this.body.shift();
        }
    },

    draw: function () {
        if (ctx) {
            ctx.fillStyle = 'green';
            this.body.forEach(obj => {
                if (ctx) {
                    ctx.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);
                }
            });
        }
    }
};

interface Item {
    x: number | null;
    y: number | null;

    draw: () => void;
}

const item: Item = {
    x: Math.floor(Math.random() * (STAGE - 2)) + 1,
    y: Math.floor(Math.random() * (STAGE - 2)) + 1,

    draw: function () {
        if (ctx) {
            ctx.fillStyle = 'red';
            if (this.x !== null && this.y !== null) {
                ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
            }
        }
    }
};

let isGameOver: boolean = false;
let score: number = 0;

const init = () => {
    isGameOver = false;
    snake.x = Math.floor(STAGE / 2);
    snake.y = Math.floor(STAGE / 2);
    snake.tail = 4;
    snake.body = [];

    item.x = Math.floor(Math.random() * (STAGE / 4)) + STAGE / 8;
    item.y = Math.floor(Math.random() * (STAGE / 4)) + STAGE / 8;

    score = 0;
};

const drawGrid = () => {
    if (!ctx) return;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    for (let i = 0; i < STAGE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID, 0);
        ctx.lineTo(i * GRID, canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j < STAGE; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * GRID);
        ctx.lineTo(canvas.width, j * GRID);
        ctx.stroke();
    }
};

const loop = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(); // マス目を描画

    if (!isGameOver) {
        snake.update();
        item.draw();
        snake.draw();

        if (snake.x !== null && snake.y !== null) {
            if (snake.x < 0 || snake.y < 0 || snake.x >= STAGE || snake.y >= STAGE) {
                isGameOver = true;
            }

            if (snake.x === item.x && snake.y === item.y) {
                snake.tail!++;
                score++;
                if (item.x !== null && item.y !== null) {
                    item.x = Math.floor(Math.random() * (STAGE - 2)) + 1;
                    item.y = Math.floor(Math.random() * (STAGE - 2)) + 1;
                }
            }
        }
    }

    if (isGameOver) {
        if (ctx) {
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
        }
    }

    // スコアを表示
    if (ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }
};

init();
setInterval(loop, 1000 / 10);

document.addEventListener('keydown', e => {
    if (isGameOver && e.key === 'Enter') {
        init();
    } else {
        switch (e.key) {
            case 'ArrowLeft':
                snake.dx = -1;
                snake.dy = 0;
                break;
            case 'ArrowRight':
                snake.dx = 1;
                snake.dy = 0;
                break;
            case 'ArrowUp':
                snake.dx = 0;
                snake.dy = -1;
                break;
            case 'ArrowDown':
                snake.dx = 0;
                snake.dy = 1;
                break;
        }
    }
});

function update() {
    // スネークの座標を更新する前に境界チェック
    if (snake.x !== null && snake.y !== null) {
        if (snake.x < 0 || snake.y < 0 || snake.x >= STAGE || snake.y >= STAGE) {
            isGameOver = true;
            return;
        }

        snake.body.push({ x: snake.x, y: snake.y });
        snake.x += snake.dx;
        snake.y += snake.dy;

        snake.body.forEach(obj => {
            if (snake.x === obj.x && snake.y === obj.y) {
                init();
            }
        });
        if (snake.body.length > (snake.tail as number)) snake.body.shift();
    }
}
