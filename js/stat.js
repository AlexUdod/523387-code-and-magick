var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_PADDING = 25;
var COLUMN_WIDTH = 40;
var COLUMN_MARGIN = 50;
var BARCHART_HEIGHT = 150;

var nextColumnPosition = 0;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.bezierCurveTo(CLOUD_WIDTH / 3 + x, 20 + y, CLOUD_WIDTH / 3 + x * 2,
		20 + y, CLOUD_WIDTH + x, y);
	ctx.quadraticCurveTo(CLOUD_WIDTH + x - 20, (CLOUD_HEIGHT + y) / 2,
		CLOUD_WIDTH + x, CLOUD_HEIGHT + y);
	ctx.bezierCurveTo(CLOUD_WIDTH / 3 + x * 2, CLOUD_HEIGHT + y - 20, CLOUD_WIDTH / 3 + x,
		CLOUD_HEIGHT + y - 20, x, CLOUD_HEIGHT + y);
	ctx.quadraticCurveTo(x + 20, (CLOUD_HEIGHT + y) / 2, x, y);
	ctx.closePath();
	ctx.fill();
};

var getMaxElement = function (arr) {
	var maxElement = arr[0];
  	for (var i = 0; i < arr.length; i++) {
  		if (arr[i] > maxElement) {
  			maxElement = arr[i];
  		}
  	}
  	return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
	renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
	
	ctx.font = '16px PT Mono';
	ctx.fillStyle = '#000';
	ctx.textBaseline = 'hanging';
	ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 4, CLOUD_Y + CLOUD_PADDING);
	ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 4, CLOUD_Y + CLOUD_PADDING + 16);

	var maxTime = getMaxElement(times);  

	for (var i = 0; i < players.length; i++) {
		var columnHeight = (BARCHART_HEIGHT * times[i]) / maxTime;
		ctx.fillStyle = '#000';
		ctx.fillText(players[i], CLOUD_X + CLOUD_PADDING + nextColumnPosition,
			CLOUD_HEIGHT - CLOUD_PADDING);

		if (players[i] === 'Вы'){
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		} else {ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() +' )';}

		ctx.fillText(Math.round(times[i]), CLOUD_X + CLOUD_PADDING + nextColumnPosition, 
			CLOUD_HEIGHT - (columnHeight + CLOUD_PADDING * 2));
		ctx.fillRect(CLOUD_X + CLOUD_PADDING + nextColumnPosition, CLOUD_HEIGHT - CLOUD_PADDING - 5, 
			COLUMN_WIDTH, columnHeight * (-1));
		nextColumnPosition += COLUMN_MARGIN + COLUMN_WIDTH;
	}	
};
