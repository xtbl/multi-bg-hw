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
		chkBox3Lbl: $('#lbl-chkbox-c'),

		//TODO
		// this should return an array of checkbox selects and another for labels
	},
	//checkbox selector list. can be modified in config for convenience and performance
	checkboxList = {
		cb1: {
			check: 	$('#chkbox-a'),
			cLabel: $('#lbl-chkbox-a') 
		},
		cb2: {
			check: 	$('#chkbox-b'),
			cLabel: $('#lbl-chkbox-b') 			
		},
		cb3: {
			check: 	$('#chkbox-c'),
			cLabel: $('#lbl-chkbox-c') 			
		}

	}
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
			subseqQuarts = {
				q1 : {
					q: 		'',
					year: 	'',
					qText: 	'Q1-2013' 
				}
			},
			subsequentQuarters = {
				q1: invQ1,
				y1: invYear1,
				q2: invQ2,
				y2: invYear2,
				q3: invQ3,
				y3: invYear3,
			};
			// TODO
			// this should return an array of quarters and year text format or 
			// the same array in value format, you can use an options object
			return subsequentQuarters;	
		}
	},
	updateCheckboxes = function(){
		//TODO 
		//	change this chkbox1 objects into an array to loop
		//	generate the full Q1 2012 option
		config.chkBox1.attr('value',quarter.nextInvestments().q1 
				+ '-' + quarter.nextInvestments().y1);
		config.chkBox1Lbl.text(quarter.nextInvestments().q1 
				+ '-' + quarter.nextInvestments().y1);
		
		config.chkBox2.attr('value',quarter.nextInvestments().q2 
				+ '-' + quarter.nextInvestments().y2);
		config.chkBox2Lbl.text(quarter.nextInvestments().q2 
				+ '-' + quarter.nextInvestments().y2);
		
		config.chkBox3.attr('value',quarter.nextInvestments().q3 
				+ '-' + quarter.nextInvestments().y3);
		config.chkBox3Lbl.text(quarter.nextInvestments().q3 
				+ '-' + quarter.nextInvestments().y3);
		
		console.log('checkboxList scope test: '+checkboxList.cb1.check);

		checkboxList.cb1.check.attr('test','this works outside for!');

		for(var i in checkboxList ){
			//if 
			//i.check.attr('value','');
			console.log('cbox is: ' + checkboxList[i].check.attr('forworks','works!') );
			checkboxList.cb1.check.attr('test','this works inside for!');
		}

		for(var i in quarter.nextInvestments() ){
			//if 

			console.log('quarter stuff is: '+i);
		}

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
		updateCheckboxes: updateCheckboxes,
		checkboxList: checkboxList
	};

}(jQuery));

APP.investment.init();
