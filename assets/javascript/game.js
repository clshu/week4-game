var obj = null;
var value1 = null;
var value2 = null;

// Global Variables
var isNewGame = true;
var isFirstTime = true;
var gameOver = false;
var dataArray = [];
var characterArray = [];
var enemyArray = [];
var defenderArray = [];
//var defender = null;
//var attacker = null;


// Constants
var maxNumber = 4;

// Object
function Character(name, bAP, cAP, hP) {
	this.name = name;
	this.baseAttackPower = bAP;
	this.attackPower = bAP; // same as baseAttackPower
	this.counterAttackPower = cAP;
	this.healthPoint = hP;
}
// Functions
function loadData() {
	var array = [];
	var ch1 = new Character('Obi-Wan Kenobi',
							8,
							20,
							120);
	var ch2 = new Character('Luke Skywalker',
							10,
							5,
							100);
	var ch3 = new Character('Darth Valder',
							8,
							20,
							150);
	var ch4 = new Character('Darth Maul',
							8,
							20,
							180);

	array.push(ch1);
	array.push(ch2);
	array.push(ch3);
	array.push(ch4);

	return array;
}

function initialize() {

	gameOver = false;
	enemyArray = [];
	defenderArray = [];
	//defender = null;
	//attacker = null;
	dataArray = loadData();
	// Show all characters in the beginning
	characterArray = dataArray; // shallow copy
}

function createRow() {

}
function createTextLine() {

}
function createButton() {

}
function displayAll() {

}

// Execution
$(document).ready(function () {

	//if (isNewGame) {
	//	initialize();
	//	isNewGame = false;
		
	//} else {
		// Handle events
		$('.characters').on('click', function () {
		//value1 = $(this).val();
		//value2 = $('div.enemies').val();
			value1 = $(this).attr('value');
		//value2 = $('div.enemies').attr('value');
			console.log('.characters value:' +  value1);
	
			obj = $(this);

		});
		$('.enemies').on('click', function () {
			value1 = $(this).attr('value');
			console.log('.enemies value:' + value1);
		});
		$('.emptyBox').on('click', function () {
		
			console.log('.emptyBox click!');
		});
		$('.defender').on('click', function () {
		
			console.log('.defender click!');
		});
		$('#attackButton').on('click', function () {
			value1 = $(this).attr('value');
			console.log('#attackButton value:' + value1);
		});
		$('#restartButton').on('click', function () {
			value1 = $(this).attr('value');
			console.log('#restartButton value:' + value1);
		});
	//}

	//displayAll();
	
});
