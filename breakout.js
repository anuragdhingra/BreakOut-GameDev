var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var time=10;
var x= canvas.width/2;
var y= canvas.height-30;

var dx=2;
var dy=-2;

var ballRadius=10;
var ballColor="#0095DD";

var paddleHeight=10;
var paddleWidth=75;
paddleX= (canvas.width-paddleWidth)/2;

var leftPressed=false;
var rightPressed=false;

var brickRowCount=3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;

var bricks =[];
for(c=0;c<brickColumnCount;c++){
	bricks[c]=[];
	for(r=0;r<brickRowCount;r++){
		bricks[c][r]={ x:0, y:0, status:1 };
	}


}
	
var score=0;
var lives=3;

function drawBall(){

	ctx.beginPath();
	
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle=ballColor;
	ctx.fill();
	ctx.closePath();
}
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle=ballColor;
	ctx.fill();
	ctx.closePath();
}

function drawBricks(){
	for(c=0;c<brickColumnCount;c++){
		for(r=0;r<brickRowCount;r++){
			if(bricks[c][r].status==1)
			{
				var brickX= c*(brickWidth+brickPadding) + brickOffsetLeft;
				var brickY= r*(brickHeight+brickPadding) + brickOffsetTop;
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight);
				ctx.fillStyle=ballColor;
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisonDetection();
	if(x+dx > canvas.width-ballRadius || x+dx<ballRadius)
		{dx=dx*-1;}
	if(y+dy<ballRadius)
		{dy=dy*-1;}
	else
		if(y+dy>canvas.height-ballRadius)

		{
			if(x > paddleX && x < paddleX + paddleWidth)
			{
				time--;
				dy=dy*-1;	
			}
			else if(lives){
				lives--;
				x=canvas.width/2;
				y=canvas.height-30;
				dx=Math.pow(-1,lives)*-2;
				dy=-2;
				paddleX= (canvas.width-paddleWidth)/2;
			}
							
			else
			{
				alert("Game Over");
				document.location.reload();
			}
		}

	if(rightPressed && paddleX<canvas.width-paddleWidth)
		paddleX+=7;
		else
	if(leftPressed && paddleX>0)
		paddleX-=7;

	x=x+dx;
	y=y+dy;
}


function collisonDetection(){
	for(c=0;c<brickColumnCount;c++){
		for(r=0;r<brickRowCount;r++){
			var b= bricks[c][r];
			if( (x>b.x && x<b.x+brickWidth) && (y>b.y && y<b.y+brickHeight) && b.status==1)
			{
				dy=dy*-1; b.status=0;score++;
				if(score==brickRowCount*brickColumnCount)
				{
					alert("YOU WIN, CONGRATULATIONS");
					document.location.reload();
				}
			}

		}
	}
}

function drawScore(){
	ctx.font="16px Arial";
	ctx.fillStyle=ballColor;
	ctx.fillText("Score: "+score,8,20);

}
function drawLives(){
	ctx.font="16px Arial";
	ctx.fillStyle=ballColor;
	ctx.fillText("Lives: "+lives,410,20);
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);

function keyDownHandler(e)
{
	if(e.keyCode=='39')
	{
		rightPressed=true;
	}

	if(e.keyCode=='37')
	{
		leftPressed=true;
	}

}

function keyUpHandler(e)
{
	if(e.keyCode=='39')
	{
		rightPressed=false;
	}
	if(e.keyCode=='37')
	{
		leftPressed=false;
	}
}

function mouseMoveHandler(e){
	relativeX= e.clientX - canvas.offsetLeft;
	 if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }

}
setInterval(draw,time);





