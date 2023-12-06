var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
canvas.setAttribute('style', 'display:block;margin:auto;background-color: #aaa');
document.body.appendChild(canvas);
var GRID = 25;
var STAGE = canvas.width / GRID;
var snake = {
    x: null,
    y: null,
    dx: 1,
    dy: 0,
    tail: null,
    body: [],
    update: function () {
        var _this = this;
        this.body.push({ x: this.x, y: this.y });
        this.x += this.dx;
        this.y += this.dy;
        this.body.forEach(function (obj) {
            if (_this.x === obj.x && _this.y === obj.y) {
                init();
            }
        });
        if (this.body.length > this.tail)
            this.body.shift();
    },
    draw: function () {
        ctx.fillStyle = 'green';
        this.body.forEach(function (obj) {
            ctx.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);
        });
    }
};
var item = {
    x: Math.floor(Math.random() * (STAGE - 2)) + 1,
    y: Math.floor(Math.random() * (STAGE - 2)) + 1,
    draw: function () {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
    }
};
var isGameOver = false;
var score = 0;
var init = function () {
    isGameOver = false;
    snake.x = Math.floor(STAGE / 2);
    snake.y = Math.floor(STAGE / 2);
    snake.tail = 4;
    snake.body = [];
    item.x = Math.floor(Math.random() * (STAGE / 4)) + STAGE / 8;
    item.y = Math.floor(Math.random() * (STAGE / 4)) + STAGE / 8;
    score = 0;
};
var drawGrid = function () {
    if (!ctx)
        return;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    for (var i = 0; i < STAGE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID, 0);
        ctx.lineTo(i * GRID, canvas.height);
        ctx.stroke();
    }
    for (var j = 0; j < STAGE; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * GRID);
        ctx.lineTo(canvas.width, j * GRID);
        ctx.stroke();
    }
};
var loop = function () {
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // マス目を描画
    if (!isGameOver) {
        snake.update();
        item.draw();
        snake.draw();
        if (snake.x < 0 || snake.y < 0 || snake.x >= STAGE || snake.y >= STAGE) {
            isGameOver = true;
        }
        if (snake.x === item.x && snake.y === item.y) {
            snake.tail++;
            score++; // スコアを増やす
            item.x = Math.floor(Math.random() * (STAGE / 2)) + STAGE / 4;
            item.y = Math.floor(Math.random() * (STAGE / 2)) + STAGE / 4;
        }
    }
    if (isGameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
    }
    // スコアを表示
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20); // 任意の位置にスコアを表示
};
init();
setInterval(loop, 1000 / 10);
document.addEventListener('keydown', function (e) {
    if (isGameOver && e.key === 'Enter') {
        init();
    }
    else {
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
update: function update() {
    var _this = this;
    // スネークの座標を更新する前に境界チェック
    if (this.x < 0 || this.y < 0 || this.x >= STAGE || this.y >= STAGE) {
        isGameOver = true;
        return;
    }
    this.body.push({ x: this.x, y: this.y });
    this.x += this.dx;
    this.y += this.dy;
    this.body.forEach(function (obj) {
        if (_this.x === obj.x && _this.y === obj.y) {
            init();
        }
    });
    if (this.body.length > this.tail)
        this.body.shift();
}
;
