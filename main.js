var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
canvas.setAttribute('style', 'display:block:margin:auto;background-color: #aaa');
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
        this.body.push({ x: this.x, y: this.y });
        this.x += this.dx;
        this.y += this.dy;
        ctx.fillStyle = 'green';
        this.body.forEach(function (obj) {
            ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(obj.x * GRID, obj.y * GRID, GRID - 2, GRID - 2);
        });
        if (this.body.length > this.tail)
            this.body.shift();
    }
};
var item = {};
var init = function () {
    snake.x = STAGE / 2;
    snake.y = STAGE / 2;
    snake.tail = 4;
    snake.body = [];
};
var loop = function () {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
};
init();
setInterval(loop, 1000 / 15);
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            ;
            snake.dx = -1;
            snake.by = 0;
            break;
        case 'ArrowRight':
            ;
            snake.dx = 1;
            snake.by = 0;
            break;
        case 'ArrowUp':
            ;
            snake.dx = 0;
            snake.by = -1;
            break;
        case 'ArrowDown':
            ;
            snake.dx = 0;
            snake.by = 1;
            break;
    }
});
