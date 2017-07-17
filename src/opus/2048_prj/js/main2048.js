var board=new Array();
var score=0;
var hasConflicted=new Array();

var startX=0;
var startY=0;
var endX=0;
var endY=0;

$(document).ready(function(){
	prepareForMobile();//用于手机端
	newgame();
});
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSideLength=100;
		cellSpace=20;
	}
	$("#grid-container").css("width",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("height",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("padding",cellSpace);
	$("#grid-container").css("border-radius",0.02*gridContainerWidth);
	
	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.06*cellSideLength);
	
}
function newgame(){
	//初始化
	init();
	//随机生成两个格子
	generateOneNumber();
	generateOneNumber();
	score=0;
	updateScore();
}
function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	updateBoardView();
}
function updateBoardView(){
	
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);
			if(board[i][j]==0){
				theNumberCell.css('width','0');
				theNumberCell.css('height','0');
				theNumberCell.css('top',getPosTop(i,j)+0.5*cellSideLength);
				theNumberCell.css('left',getPosLeft(i,j)+0.5*cellSideLength);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background',getNumberBackground(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
	}
	$(".number-cell").css("line-height",cellSideLength+"px");
	$(".number-cell").css("font-size",0.6*cellSideLength+"px");
	$(".number-cell").css("border-radius",0.06*cellSideLength);
}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}else{
		//随机一个位置
		var randx=Math.round(3*Math.random());
		var randy=Math.round(3*Math.random());
		var times=0;
		while(times<50){
			if(board[randx][randy]==0){
				break;
			}else{
				var randx=Math.round(3*Math.random());
				var randy=Math.round(3*Math.random());
			}
			times++;
		}
		if(times==50){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]==0){
						randx=i;
						randy=j;
					}
				}
			}
		}
		//随机一个数字
		var randNumber=Math.random()<0.5?2:4;
		//在随机位置显示随机数字
		board[randx][randy]=randNumber;
		showNumberWithAnimation(randx,randy,randNumber);
		return true;
	}
}
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
			break;
		case 38://up
			if(moveUp()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
			break;
		case 39://right
			if(moveRight()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
			break;
		case 40://down
			if(moveDown()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
			break;
		default:
			break;
	}
});
document.addEventListener("touchstart",function(event){
	startX=event.touches[0].pageX;
	startY=event.touches[0].pageY;
});
document.addEventListener("touchend",function(event){
	endX=event.changedTouches[0].pageX;
	endY=event.changedTouches[0].pageY;
	
	var deltaX=endX-startX;
	var deltaY=endY-startY;
	
	if(Math.abs(deltaX)<0.2*documentWidth&&Math.abs(deltaY)<0.2*documentWidth){
		return;
	}
	
	if(Math.abs(deltaX)>=Math.abs(deltaY)){
		if(deltaX>0){
			if(moveRight()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
		}else{
			if(moveLeft()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
		}
	}else{
		if(deltaY>0){
			if(moveDown()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
		}else{
			if(moveUp()){
				generateOneNumber();
				setTimeout("isGameOver()",220);
			}
		}
	}
});
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	//moveLeft
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockRow(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockRow(i,k,j,board)&&hasConflicted[i][k]==false){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						addScore(board[i][k]);
						board[i][j]=0;
						hasConflicted[i][k]=true;
						continue;
					}
					
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	//moveLeft
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockCol(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockCol(j,k,i,board)&&hasConflicted[k][j]==false){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						addScore(board[k][j]);
						board[i][j]=0;
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	//moveLeft
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockRow(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockRow(i,j,k,board)&&hasConflicted[i][k]==false){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						addScore(board[i][k]);
						board[i][j]=0;
						hasConflicted[i][k]=true;
						continue;
					}
					
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	//moveDown
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockCol(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockCol(j,i,k,board)&&hasConflicted[k][j]==false){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						addScore(board[k][j]);
						board[i][j]=0;
						hasConflicted[k][j]=true;
						continue;
					}
					
				}
			}
		}
	}
	setTimeout("updateBoardView()",210);
	return true;
}
function isGameOver(){
	if(nospace(board)&&noMove(board)){
		var flag=window.confirm("GameOver!是否重新开始？");
		if(flag){
			newgame();
		}
	}
}
function noMove(board){
	if(canMoveLeft(board)||canMoveUp(board)||canMoveRight(board)||canMoveDown(board)){
		return flase;
	}else{
		return true;
	}
}
function addScore(number){
	score+=number;
	updateScore();
}
function updateScore(){
	$("#score").text(score);
}
