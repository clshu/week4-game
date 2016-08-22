	var obj = null;
	var value1 = null;
	var value2 = null;
$(document).ready(function () {

	
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
	$('#attackButton').on('click', function () {
		value1 = $(this).attr('value');
		console.log('#attackButton value:' + value1);
	});
	$('#restartButton').on('click', function () {
		value1 = $(this).attr('value');
		console.log('#restartButton value:' + value1);
	});



});
