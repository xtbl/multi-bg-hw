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
	monthSelect = 12,	//replace with real selection
	yearSelect,
	selectedQuarter,

	config = {
		cycleSelector: $('#investment-cycle-selector'),
		chkBox1: $('#chkbox-a'),
		chkBox1Lbl: $('#lbl-chkbox-a'),
		chkBox2: $('#chkbox-b'),
		chkBox2Lbl: $('#lbl-chkbox-b'),
		chkBox3: $('#chkbox-c'),
		chkBox3Lbl: $('#lbl-chkbox-c')
	},

	quarter = {
		
		getQuarterByMonth: function() {
			selectedQuarter = Math.ceil(monthSelect / 3);
			console.log('this quarter is: ' + selectedQuarter);
		},
		getNextInvestments: function(){


			return 1; //returns quarter and year of the next 3 investments
		},
		nextInvestments: function(quart, yr) {
		var invQ1 = 1,
			invYear1 = 1,
			invQ2 = 2,
			invYear2 = 2,
			invQ3 = 3,
			invYear3 = 3,
			subsequentQuarters= {
				q1: invQ1,
				y1: invYear1,
				q2: invQ2,
				y2: invYear2,
				q3: invQ3,
				y3: invYear3,
			};

			return subsequentQuarters;	
		}
	},
	updateCheckboxes = function(){
		config.chkBox1.attr('value',quarter.nextInvestments().q1 
				+ '-' + quarter.nextInvestments().y1);
		config.chkBox1Lbl.text(quarter.nextInvestments().q1 
				+ '-' + quarter.nextInvestments().y1);

		
		console.log('updating checkboxes'+quarter.nextInvestments().y1);
	},
	// validate avoid more than two checks http://api.jquery.com/attr/
	
	init = function() {
		console.log('init!');
		//getMonthQuarter( monthNum )
		//setQuarterYear(month,year)

	};

	return {
		init: init,
		thisquarter: quarter.getQuarterByMonth,
		nextInvestments: quarter.nextInvestments,
		updateCheckboxes: updateCheckboxes
	};

}(jQuery));

APP.investment.init();
