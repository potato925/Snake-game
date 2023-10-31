var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
canvas.setAttribute('style', 'display:block;margin:auto;background-color: #aaa');
document.body.appendChild(canvas);
var GRID = 20;
var STAGE = canvas.width / GRID;
var snake = {
    x: null,
    y: null,
    dx: 1,
    dy: 0,
    tail: null,
    update: function () {
        var _this = this;
        this.body.push({ x: this.x, y: this.y });
        this.x += this.dx;
        this.y += this.dy;
        ctx.fillStyle = 'green';
        this.body.forEach(function (obj) {
            ctx.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);
            if (_this.x === obj.x && _this.y === obj.y)
                init();
        });
        if (this.body.length > this.tail)
            this.body.shift();
    }
};
var item = {
    x: null,
    y: null,
    update: function () {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
    }
};
var init = function () {
    snake.x = STAGE / 2;
    snake.y = STAGE / 2;
    snake.tail = 4;
    snake.body = [];
    item.x = Math.floor(Math.random() * STAGE);
    item.y = Math.floor(Math.random() * STAGE);
};
var loop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (snake.x < 0)
        snake.x = STAGE - 1;
    if (snake.y < 0)
        snake.y = STAGE - 1;
    if (snake.x > STAGE - 1)
        snake.x = 0;
    if (snake.y > STAGE - 1)
        snake.y = 0;
    snake.update();
    item.update();
    if (snake.x === item.x && snake.y === item.y) {
        snake.tail++;
        item.x = Math.floor(Math.random() * STAGE);
        item.y = Math.floor(Math.random() * STAGE);
    }
};
init();
setInterval(loop, 1000 / 15);
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            ;
            snake.dx = -1;
            snake.dy = 0;
            break;
        case 'ArrowRight':
            ;
            snake.dx = 1;
            snake.dy = 0;
            break;
        case 'ArrowUp':
            ;
            snake.dx = 0;
            snake.dy = -1;
            break;
        case 'ArrowDown':
            ;
            snake.dx = 0;
            snake.dy = 1;
            break;
    }
});
