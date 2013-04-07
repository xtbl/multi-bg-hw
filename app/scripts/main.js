/**
 * Investment Cycle
 * 
 * by Cristobal Avila
 * 
 */

var APP = APP || {};

APP.investment = (function($) {
	//private
	var date,

	config = {
		cycleSelector: $('#investment-cycle-selector'),
		chkBox1: $('#chkbox-a'),
		chkBox2: $('#chkbox-b'),
		chkBox3: $('#chkbox-c')
	},

	init = function() {
		console.log('init!');
		//getMonthQuarter( monthNum )
		var quarter;
		for (var i = 1; i <= 12; i++) {
			quarter = Math.ceil(i / 3);
			console.log('month: ' + i + ' quarter: ' + quarter);
		};

	};

	return {
		init: init
	};

}(jQuery));

APP.investment.init();