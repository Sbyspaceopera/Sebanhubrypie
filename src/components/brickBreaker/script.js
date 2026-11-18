const canvas = document.getElementById("canvasGame");
const context = canvas.getContext("2d");
let lastChrono = null;
let score = 0;

const collisionWallBase = {
    left: -Infinity,
    right: Infinity,
    top: -Infinity,
    bottom: Infinity
};

const elementsCollision =[
    {collisionBox: {...collisionWallBase, right:0}},
    {collisionBox: {...collisionWallBase, left: canvas.width}},
    {collisionBox: {...collisionWallBase, bottom: 18}},
    //{collisionBox: {...collisionWallBase, top: canvas.height}}
];

class GameObject {
    static assets = new Map();
    url;

    //asset;
    context;
    size = {w: undefined, h: undefined};
    position = {x: 0, y: 0};
    origine = {x: 0.5, y: 0.5};

    constructor(url, context){
        this.url = url;
        this.context = context;
    }

    async preload(){
        
        if(!GameObject.assets.has(this.url)){
            let asset = new Image();
            asset.src = this.url;
            GameObject.assets.set(
                this.url,
                asset.decode().then(() => asset)
            );
        }

        this.asset = await GameObject.assets.get(this.url);
        if(this.size.w === undefined){
            this.size.w = this.asset.width;
            this.size.h = this.asset.height;
        }
    }

    get collisionBox(){

        const left = this.position.x - this.size.w * this.origine.x;
        const top = this.position.y - this.size.h * this.origine.y;

        return {
            left,
            right: left + this.size.w,
            top,
            bottom: top + this.size.h
        };
    }

    draw(){
        const {left, top} = this.collisionBox;
        this.context.drawImage(this.asset,left,top);
    }

    inCollision(){}
}

class Ball extends GameObject {

    position = { x: undefined, y: undefined };
    velocity = { x: 150, y: -150 };

    constructor(url, context){
        super(url, context);
    }

    move(difTime){
        this.position.x += this.velocity.x * difTime;
        this.position.y += this.velocity.y * difTime;
    }

    inCollision({isX,isY}){
        if(isX){
            this.velocity.x = -this.velocity.x;
        }
        if(isY){
            this.velocity.y = -this.velocity.y;
        }
    }
}

class Paddle extends GameObject{
    origine = {x : 0.5, y : 1};

    constructor(url, context){
        super(url, context);
        this.position = {x : context.canvas.width / 2, y : context.canvas.height - 5};
    }
}

class Brick extends GameObject{
    constructor(url, context, x, y, w, h){
        super(url, context);
        this.position = {x, y};
        this.size = {w, h};
    }

    draw() {
        const {left, top} = this.collisionBox;
        this.context.drawImage(this.asset, left, top, this.size.w, this.size.h);
    }

    inCollision(){
        bricks.splice(bricks.indexOf(this), 1);
        elementsCollision.splice(elementsCollision.indexOf(this), 1);
        score += 10;
    }
}

const ball = new Ball("img/ball.png", context);
const paddle = new Paddle("img/paddle.png", context);

elementsCollision.push(paddle);

let bricks = initBricks();

for(let brick of bricks){
    elementsCollision.push(brick);
}

canvas.addEventListener("pointermove", (event) => {
    if(paddle.size.w === undefined) {
        return;
    }
    const limits = canvas.getBoundingClientRect();
    const x = ((event.clientX - limits.left) * canvas.width) / limits.width;
    paddle.position.x = Math.max(
        paddle.size.w / 2,
        Math.min(canvas.width - paddle.size.w / 2, x)
    );
});

Promise.all([ball, paddle, ...bricks].map((obj) => obj.preload())).then(() => 
    {
    ball.position.x = paddle.position.x ;
    ball.position.y = paddle.collisionBox.top - ball.size.h / 2;
    requestAnimationFrame(refresh)
});

function refresh(chrono){
    let difTime = lastChrono === null? 0: (chrono - lastChrono)/1000;
    lastChrono = chrono;
    moveBall(difTime);
    //ball.move(difTime);
    //manageWallCollision(ball, canvas.width, canvas.height);

    context.fillStyle = '#2b2b2b';
    context.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.draw();

    for(let brick of bricks){
        brick.draw();
    }

    drawScore();

    if(bricks.length === 0){
        alert("Vous avez gagné, félicitations !");
        location.reload();
        return;
    }

    requestAnimationFrame(refresh);
}

//function manageWallCollision(Ball, width, height) {
//    const collisionBox = Ball.collisionBox;
//    const toucheLimiteGauche = collisionBox.left <= 0 && Ball.velocity.x < 0;
//    const toucheLimiteDroite = collisionBox.right >= width && Ball.velocity.x > 0;
//    const toucheLimiteHaut = collisionBox.top <= 0  && Ball.velocity.y < 0;
//    const toucheLimiteBas = collisionBox.bottom >= height && Ball.velocity.y > 0;
//    const isX = toucheLimiteGauche || toucheLimiteDroite;
//    const isY = toucheLimiteHaut || toucheLimiteBas;
//    if(isX || isY){
//       Ball.inCollision({isX, isY});
//    }
//}

function moveBall(difTime){
    while(difTime > 0 && bricks.length > 0){
        const ballCollisionBox = ball.collisionBox;
        let timeTouch = difTime;
        let touchX = null;
        let touchY = null;
        let contacts = [];

        for (const elementCollision of elementsCollision){
            const touch = getCollision(
                ballCollisionBox,
                ball.velocity,
                elementCollision.collisionBox,
                timeTouch
            );

            if(touch === null){
                continue;
            }

            if(touch.time < timeTouch){
                touchX = null;
                touchY = null;
                contacts = [];
            }
            timeTouch = touch.time;
            touchX = touch.x ?? touchX;
            touchY = touch.y ?? touchY;
            contacts.push({elementCollision, touch});
        }

        ball.move(timeTouch);
        difTime -= timeTouch;

        //const ballOutOfBounds = ball.collisionBox.bottom > canvas.height;
        if(ball.collisionBox.bottom > canvas.height){
            alert("Vous avez perdu !");
            location.reload();
            return;
        }

        if(contacts.length === 0){
            break;
        }

        if(touchX !== null){
            ball.position.x = touchX + ball.size.w / 2;
        }

        if(touchY !== null){
            ball.position.y = touchY + ball.size.h / 2;
        }

        ball.inCollision({isX: touchX !== null, isY: touchY !== null});
        for(let { elementCollision, touch} of contacts){
            elementCollision.inCollision?.({
                x: touch.x !== null,
                y: touch.y !== null
            });
        }
    }    
}

function getCollision(displacement,velocity,obstacle, difTime){
    const width = displacement.right - displacement.left;
    const height = displacement.bottom - displacement.top;
    const displacementPos = {x: displacement.left, y: displacement.top};
    const left = obstacle.left - width;
    const right = obstacle.right;
    const top = obstacle.top - height;
    const bottom = obstacle.bottom;
    let touch = {time: difTime, x:null, y:null};

    function verifyFace(axe, direction, coordonne, min, max){
        if(velocity[axe] * direction <= 0){
            return;
        }

        const time = (coordonne - displacementPos[axe]) / velocity[axe];
        if(time < 0 || time > touch.time){
            return;
        }

        let otherAxe = axe === "x" ? "y" : "x";
        let otherPosition = displacementPos[otherAxe] + velocity[otherAxe] * time;

        if(otherPosition < min || otherPosition > max){
            return;
        }
        if(time < touch.time){
            touch.x = null;
            touch.y = null;
        }

        touch.time = time;
        touch[axe] = coordonne;
    }

    verifyFace("x" , 1, left, top, bottom);
    verifyFace("x", -1, right, top, bottom);
    verifyFace("y", 1, top, left, right);
    verifyFace("y", -1, bottom, left, right);

    return touch.x ===null && touch.y === null ? null : touch;
}

function initBricks(){
    const bricksLayout = {
        with: 50,
        height: 20,
        count: {
            row: 3,
            col: 7
        },
        offset:{
            top: 50,
            left: 60
        },
        padding: 10
    };
    let bricks = [];

    for( let i = 0; i < bricksLayout.count.col; i++){
        for(let j = 0; j < bricksLayout.count.row; j++){

            let brickX = i * (bricksLayout.with + bricksLayout.padding) + bricksLayout.offset.left;

            let brickY = j * (bricksLayout.height + bricksLayout.padding) + bricksLayout.offset.top;

            let newBrick = new Brick(
                "img/brick.png",
                context,
                brickX,
                brickY,
                bricksLayout.with,
                bricksLayout.height
            );
            bricks.push(newBrick);
        }
    }





    return bricks;
}

function drawScore(){
    context.font = "18px Arial";
    context.fillStyle = "#E0453F";
    context.textBaseLine = "top";
    context.textAlign = "left";
    context.fillText(`Points : ${score}`, 5, 18);
}
