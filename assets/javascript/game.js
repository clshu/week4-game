
// Global Variables
var gameOver = false;
var characterArray = [];
var enemyArray = [];
var mainCharacter = null;
var defender = null;
var youWin = 0;
var youLose = 1;

// Constants
var line1 = '<h2>Main Character</h2>';
var line2 = '<h2>Enemies Available To Fight</h2>';
var line3 = '<h2>Fight Section</h2>';
var line4 = '<h2>Defender</h2>';
var characterClasses = 'demoBox bg-white bd-visible bd-green character';
var enemyClasses = 'demoBox bg-red bd-visible bd-black enemy';
var defenderClasses = 'demoBox bg-black bd-visible bd-green text-white'; // don't handle events
var emptyBoxClasses = 'demoBox emptyBox';
var imgClass = 'img-holder';
var imgPath = 'assets/images/';
var attackId = 'Attack';
var restartId = 'Restart';
var noEnemyMsg = 'No Enemy to fight!';


// Object
function Character(name, movieName, img, bAP, cAP, hP) {
	this.name = name;
	this.movieName = movieName;
	this.img = img;
	this.baseAttackPower = bAP;
	this.attackPower = bAP; // same as baseAttackPower
	this.counterAttackPower = cAP;
	this.healthPoint = hP;
}

// Functions
function loadData() {
	var array = [];
	var ch1 = new Character('Clint Eastwood',
							'Blondie',
							'blondie.jpg',
							8,
							15,
							120);
	var ch2 = new Character('Eli Wallach',
							'Tuco',
							'tuco.jpg',
							10,
							5,
							140);
	var ch3 = new Character('Lee Van Cleef',
							'Angel',
							'angel.jpg',
							20,
							20,
							150);
	var ch4 = new Character('Mario Brega',
							'Cpl. Wallace',
							'wallace.jpg',
							15,
							10,
							180);

	array.push(ch1);
	array.push(ch2);
	array.push(ch3);
	array.push(ch4);

	return array;
}

function initialize() {

	gameOver = false;
	mainCharacter = null;
	defender = null;
	enemyArray = [];
	characterArray = loadData();
	createFirstPage();	
}
function setMessage(msg) {
	$('#message').html(msg);
}
function createStatMessage(attacker, defender) {
	var msg = attacker.movieName + ' attacks ' + defender.movieName + ' for <span class="statNumber">' + attacker.attackPower + '</span> damages';
	msg += '<br>' + defender.movieName + ' attacks ' + attacker.movieName + ' back for <span class="statNumber">' + defender.counterAttackPower + '</span> damages';
	return msg;	
}
function createDefeatMessage(obj1, obj2) {
	var msg = obj1.movieName + ' defeated ' + obj2.movieName + ' !';
	return msg;
}
function createBothLoseMessage(obj1, obj2) {
	var msg = obj1.movieName + ' and ' + obj2.movieName + ' both lost!! Game Over'
	return msg;
}
function createWinLoseMessage(flag, obj) {
	var msg;
	if (flag == youWin) {
		msg = '<br>' + obj.movieName + ' Won!! Game Over';
	} else if (flag == youLose) {
		msg = '<br>' + obj.movieName + ' Lost!! Game Over';
	}
	return msg;
}
function createRow(cls, id) {
	var row = $('<div>').addClass(cls).attr('id', id);
	return row;
}
function createBox(divClasses, index, obj) {
	var img, fullPath;
	var box = $('<div>').addClass(divClasses).attr('value', index);
	if (obj != null) {
		box.append('<h4 id="title">' + obj.movieName + '</h4>');
		img = $('<div>').addClass(imgClass).attr('name', obj.name).attr('movie-name', obj.movieName);
		fullPath = imgPath + obj.img;
		img.css('background-image', 'url("' + fullPath + '")');
		box.append(img);
		box.append('<h4 id="HP">' + obj.healthPoint + '</h4>');
	}

	return box;
}

function appendBox(rowObj, divClasses, obj) {
	var box = createBox(divClasses, 0, obj);
	rowObj.append(box);
}

function appendBoxes(rowObj, divClasses, classArray) {
	for (var i = 0; i < classArray.length; i++) {
		var boxObj = createBox(divClasses, i, classArray[i]);
		rowObj.append(boxObj);
	}

}
function createButton(buttonId) {
	return ($('<button>').attr('id', buttonId.toLowerCase()).text(buttonId));
}

function createFirstPage() {
	var rowObj, boxObj, button;

	$('#wrapper').append(line1);
	// create row1, populate it with characterArray
	rowObj = createRow('row row-with-height', 'row1');
	appendBoxes(rowObj, characterClasses, characterArray);
	$('#wrapper').append(rowObj);	
	$('#wrapper').append(line2);
	// Add row2, but it's invisble because no height for now
	rowObj = createRow('row', 'row2');
	$('#wrapper').append(rowObj);

	$('#wrapper').append(line3);
	// Add Atack button
	button = createButton(attackId);
	$('#wrapper').append(button);

	$('#wrapper').append(line4);
	// create row3 and populate it with an emptyBox so it can handle click event
	rowObj = createRow('row row-with-height', 'row3');
	boxObj = createBox(emptyBoxClasses, 0, null);
	rowObj.append(boxObj);
	$('#wrapper').append(rowObj);
	// message line
	$('#wrapper').append('<h3 id="message"></h3>');

}

// Execution
$(document).ready(function () {

		initialize();	
		// Handle events
		// Events bubbling up to div#wrapper
		$('#wrapper').on('click', '.character', function () {
			// click on row1, which cotains character(s)
			var index = $(this).attr('value');
	
			if (gameOver) return;
			$('#message').empty();
			// if mainCharacter exists, do nothing
			if (mainCharacter != null) return;
			// find which character is cliked, and save it in mainCharacter
			mainCharacter = Object.assign({}, characterArray[index]);
			// remove this character from characterArray
			characterArray.splice(index, 1);
			// pass characterArray to enemyArray, which has all unselected characters now
			enemyArray = characterArray;
			// clean up row1 and populate it with mainCharacter
			$('#row1').empty();
			appendBox($('#row1'), characterClasses, mainCharacter);
			// give row2 height 
		    $('#row2').addClass('row-with-height');
		    // populate row2 with enemyArray
		    appendBoxes($('#row2'), enemyClasses, enemyArray);
			
		});
	
		$('#wrapper').on('click', '.enemy', function () {
			// click on row2, which has enemies
			var index;

			if (gameOver) return;

			$('#message').empty();
			// if defender exists, don't select any enemy to become defender
			if (defender != null) return;
			// save selected enemy to become defender
			index = $(this).attr('value');
			defender = Object.assign({}, enemyArray[index]);
			// remove selected enemy from enemyArray
			enemyArray.splice(index, 1);

			$('#row2').empty();
			$('#row3').empty();
			if (enemyArray.length > 0) {
				// populate row2
				appendBoxes($('#row2'), enemyClasses, enemyArray);
			}
			// populate row3 with defender
			appendBox($('#row3'), defenderClasses, defender);


		});

		$('#wrapper').on('click', '.emptyBox', function () {
			// click on empty row3 , display message
			setMessage(noEnemyMsg);
			
		});
	
		$('#wrapper').on('click', '#attack', function () {
			// attack button
			var msg = '';
			
			if (gameOver) return;
			if (defender == null) {
				// no defender exists
				$('#message').empty();
				setMessage(noEnemyMsg);
				return;
			} 
			// game logic here
			mainCharacter.healthPoint -= defender.counterAttackPower;
			
			defender.healthPoint -= mainCharacter.attackPower;
			msg = createStatMessage(mainCharacter, defender);
			setMessage(msg);
			// update mainCharacter and defender's HP in demoBox
			// to display different HP after each click
			$('#row1 h4#HP').html(mainCharacter.healthPoint);
			$('#row3 h4#HP').html(defender.healthPoint);
			// test win/lose
			if (mainCharacter.healthPoint <= 0 && defender.healthPoint <= 0) {
				// both lose
				gameOver = true;
				msg = createBothLoseMessage(mainCharacter, defender);
				setMessage(msg);
				// remove defender
				defender = null;
				// leave row3 intact

			} else if (mainCharacter.healthPoint <= 0) {
				// mainCharacter lose
				gameOver = true;
				setMessage(createWinLoseMessage(youLose, mainCharacter));
			} else if (defender.healthPoint <= 0) { 
				// defender lose
				// append an emptyBox to row3
				$('#row3').empty();
				var boxObj = createBox(emptyBoxClasses, 0, null);
				$('#row3').append(boxObj);
				msg = createDefeatMessage(mainCharacter, defender);
				// remove defender
				defender = null;

				if (enemyArray.length == 0) {
					gameOver = true;
					msg += createWinLoseMessage(youWin, mainCharacter);
				}

				setMessage(msg);
			}

			// increase attackPower
			mainCharacter.attackPower += mainCharacter.baseAttackPower;

			if (gameOver) {
				// add restart buttonId if the game is over
				var button = createButton(restartId);
				button.insertAfter($('#message'));
			}
		});

		$('#wrapper').on('click', '#restart', function () {
			// restart button
			$('#wrapper').empty();
			initialize();
		});

		$('#wrapper').on('mouseenter', '.demoBox', function () {
			// disply actor's name if mouse pointer is inside picture box(demoBox)
			var titleObj = $(this).children('#title');
			var imgObj = $(this).children('.img-holder');
			titleObj.html(imgObj.attr('name'));
		});

		$('#wrapper').on('mouseleave', '.demoBox', function () {
			// disply actor's screen name if mouse pointer is outside picture box(demoBox)
			var titleObj = $(this).children('#title');
			var imgObj = $(this).children('.img-holder');
			titleObj.html(imgObj.attr('movie-name'));		
		});	

});

