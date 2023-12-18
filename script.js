const height = 280;
const width = 800;
const initialVel = 85;
const gravity = 11;

let x = 0;
let y = height;

let angle, xVel, yVel;

let isMoving = false;
let shootBall;

cannon.style.top = height + "px";

document.addEventListener('mousemove', function(e) {
    const diffX = e.clientX;
    const diffY = height - e.clientY;
    angle = Math.atan2(diffY, diffX);
    cannon.style.transform = "rotate(" + (-angle * 180 / Math.PI) + "deg)";
});

window.onclick = function(e) {
    if (!isMoving) {
        xVel = initialVel * Math.cos(angle);
        yVel = initialVel * Math.sin(angle);

        let t = 0.5;
        isMoving = true;
        clearInterval(shootBall);

        ball.style.display = "block";

        shootBall = setInterval(moveBall, 1/60);

        function moveBall() {
            x = xVel * t;
            y = height - yVel * t + 0.5 * gravity * t ** 2;

            ball.style.left = x + "px";
            ball.style.top = y + "px";

            if (y > height - ball.height) {
                // check collision w/ elf
                if (x >= elfX - elf.width / 2 && x <= elfX + elf.width / 2) {
                    elf.style.transform = 'rotate(90deg)';
                    clearInterval(elfMover);
                    win.style.display = "inline";
                }
            }

            if (y > height) {
                clearInterval(shootBall);
                isMoving = false;
            }

            t += 0.03;
        }
    }
};

let elfX = width - elf.width;
let elfVel = 0.5;

elf.style.top = height + "px";

let elfMover = setInterval(moveElf, 1/60);
function moveElf() {
    if (elfX > width - elf.width) {
        elfVel = -Math.random();
    } else if (elfX < width - 300) {
        elfVel = Math.random();
    }

    elfX += elfVel;
    elf.style.left = elfX + "px";
}
