const grid = document.querySelector(".grid")
const score = document.querySelector("#score")

let timerId;

let displayScore = 0

let xDirection = -2
let yDirection = 2

const ballDiameter = 20

const blockWidth = 100
const blockHeight = 20

let boardWith = 560
let boardHeight = 300

const userStartPosition = [250, 10]
const ballStartPosition = [265, 60]
let currentPosition = userStartPosition
let currentBallPosition = ballStartPosition

class Block {
    constructor(x, y) {
        this.bottomLeft = [x,y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x, y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw my block
function drawPaddles() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + "px"
        block.style.bottom = blocks[i].bottomLeft[1] + "px"
        grid.appendChild(block)
    }

}
drawPaddles()


//draw user
const user = document.createElement("div")
user.classList.add("user")
drawPosition()
grid.appendChild(user)
// draw position
function drawPosition() {
    user.style.left = currentPosition[0] + "px"
    user.style.bottom = currentPosition[1] + "px"
}
// move user
function moveUser(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 0 ) {
                currentPosition[0] -= 10
                drawPosition()
            }
            break
        case "ArrowRight":
            if (currentPosition[0] < (boardWith - 100)) {
                currentPosition[0] += 10
                drawPosition()
            }
            break
    }
}
document.addEventListener("keydown", moveUser)


// ball position
function BallStartPosition() {
    ball.style.left = currentBallPosition[0] + "px"
    ball.style.bottom = currentBallPosition[1] + "px"
}

// draw ball
const ball = document.createElement("div")
ball.classList.add("ball")
BallStartPosition()
grid.appendChild(ball)




function moveBall() {
    currentBallPosition[0] += xDirection
    currentBallPosition[1] += yDirection
    BallStartPosition()
    checkCollision()

}
timerId = setInterval(moveBall, 20)

function checkCollision() {
    // check block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (currentBallPosition[0] > blocks[i].bottomLeft[0] &&currentBallPosition[0] < blocks[i].bottomRight[0]) &&
            (currentBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
            currentBallPosition[1] < blocks[i].topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll(".block"))
            allBlocks[i].classList.remove("block")
            blocks.splice(i, 1)
            changeDirection()
            displayScore++
            score.innerHTML = displayScore

            if (blocks.length === 0 ) {
                 score.innerHTML = "YOU WIN"
                clearInterval(timerId)
                document.removeEventListener("keydown", moveUser)

            }
        }

    }


    if (currentBallPosition[0] >= (boardWith - ballDiameter) ||
        currentBallPosition[1] >= (boardHeight - ballDiameter) ||
        currentBallPosition[0] <= 0
    ) {
        changeDirection()
    }


    if ((ballStartPosition[0] > currentPosition[0] && currentBallPosition[0] < currentPosition[0] + blockWidth ) &&
        (currentBallPosition[1] > currentPosition[1] && currentBallPosition[1] < currentPosition[1] + blockHeight)
    ) {
      changeDirection()
    }


    if (currentBallPosition[1] <= -25) {
        clearInterval(timerId)
        score.innerHTML = "You Loose"
        document.removeEventListener("keydown", moveUser)
    }


}
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return;
    }
}
