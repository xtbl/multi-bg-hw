/**
 * Investment Cycle Test
 * 
 * by Cristobal Avila
 * 
 */

var APP = APP || {};

APP.investment = (function($) {
	//private
	var date,
	checkboxesChecked = 0,
	monthSelect,	//replace with real selection
	yearSelect,
	selectedQuarter,

	config = {
		cycleSelector: $('#investment-cycle-selector'),
		chkBoxes: $('.checkbox-wrapper input[type=checkbox]'),
		msgBox: $('#invest-msg-box')
	},
	//checkbox selector list. can be modified here for convenience
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
			var selectedQuarter = Math.ceil(monthSelect / 3);
			
			return selectedQuarter;
		},
		nextInvestments: function() {
		var month =	config.cycleSelector.find(":selected").data('month'),
			year =	config.cycleSelector.find(":selected").data('year'),
			nextQuarterPattern,
			nextYearPattern;

		var selectedQuarter = Math.ceil(month / 3);
		console.log('this quarter is: ' + selectedQuarter);

		switch(selectedQuarter) {
			case 1:
				nextQuarterPattern = [1,2,3];
				nextYearPattern = [0,0,0];
			break;
			case 2:
				nextQuarterPattern = [1,2,-1];
				nextYearPattern = [0,0,1];
			break;
			case 3:
				nextQuarterPattern = [1,-2,-1];
				nextYearPattern = [0,1,1];
			break;
			case 4:
				nextQuarterPattern = [-3,-2,-1];
				nextYearPattern = [1,1,1];
			break;
			default:
				console.log('No quarter selected.');
		}
		console.log('nQP: ' + nextQuarterPattern);

		var nextQuarters = {
				nextQ1: {
					q: 		'atestQ1',
					year: 	year,
					qText: 	'Q' + (selectedQuarter + nextQuarterPattern[0]) +' '+ (year + nextYearPattern[0])
				},
				nextQ2: {
					q: 		'btestQ1',
					year: 	'b2099',
					qText: 	'Q' + (selectedQuarter + nextQuarterPattern[1]) +' '+ (year + nextYearPattern[1])
				},
				nextQ3: {
					q: 		'ctestQ1',
					year: 	'c2099',
					qText: 	'Q' + (selectedQuarter + nextQuarterPattern[2]) +' '+ (year + nextYearPattern[2])
				}

			};
			// TODO
			// this should return an array of quarters and year text format or 
			// the same array in value format, you can use an options object
			return nextQuarters;	
		}
	},
	updateCheckboxes = function() {
		//	TODO 
		//	change this chkbox1 objects into an array to loop
		//	generate the full Q1 2012 option
		var nextInvest = quarter.nextInvestments();

		console.log('checkboxList scope test: '+checkboxList.cb1.check);

		// assign subsequent investment values to checkboxes
		checkboxList.cb1.check.attr('value', nextInvest.nextQ1.q);
		checkboxList.cb1.cLabel.text( nextInvest.nextQ1.qText );
		
		checkboxList.cb2.check.attr('value', nextInvest.nextQ2.q);
		checkboxList.cb2.cLabel.text( nextInvest.nextQ2.qText );
		
		checkboxList.cb3.check.attr('value', nextInvest.nextQ3.q);
		checkboxList.cb3.cLabel.text( nextInvest.nextQ3.qText );


		// alternative version
		//var nextInv = quarter.nextInvestments();
		// assign subsequent investments values to checkboxes
		/*
		for(var i in checkboxList ){		
			for(var j in nextInv ){
				checkboxList[i].check.attr('value', nextInv[j].q);
				checkboxList[i].cLabel.text( nextInv[j].qText );
			console.log('nextInv is : ' + nextInv[j].q );
			checkboxList.cb1.check.attr('test','this works inside for!');
			}

		}
		*/

		// uncheck all checkboxes
		config.chkBoxes.attr('checked',false);
		checkboxValidation()
	},
	checkboxValidation = function() {
		config.chkBoxes.each(function() {
			if( $(this).is(':checked') ){
				checkboxesChecked += 1;
			}
			console.log( 'is checked: ' + $(this).is(':checked') );
		});
		// block attempt to select more than 2 checkboxes
		if(checkboxesChecked === 2) {
			config.msgBox.fadeIn(200);
			//disable extra checkbox
			config.chkBoxes.each(function() {
				if(!$(this).is(':checked') ){
					$(this).attr('disabled', true);
				}
				console.log('checkbox disabled');
			});
		} else {
			config.msgBox.css('display','none');
			config.chkBoxes.each(function() {
				$(this).removeAttr('disabled');
			});
		}

		console.log('checkbox checked: '+ checkboxesChecked);
		checkboxesChecked = 0;
	},
	attachUIEvents = function() {
		// investment cycle selection
		config.cycleSelector.change(function(){
			var usrSelection = config.cycleSelector.find(":selected").text();
			var usrSelectionMonth = config.cycleSelector.find(":selected").data('month');
			var usrSelectionYear = config.cycleSelector.find(":selected").data('year');
			console.log('selected: ' + usrSelection);
			console.log('selected month: ' + usrSelectionMonth);
			console.log('selected year: ' + usrSelectionYear);
			updateCheckboxes();
		});
		// checkbox change
		config.chkBoxes.change(function(){
			checkboxValidation();
		});

	},


	// validate avoid more than two checks http://api.jquery.com/attr/
	
	init = function() {
		console.log('init!');
		attachUIEvents();

		//getMonthQuarter( monthNum )
		//setQuarterYear(month,year)

	};
	//public
	return {
		init: init,
		thisquarter: quarter.getQuarterByMonth,
		nextInvestments: quarter.nextInvestments,
		monthSelect: monthSelect
	};

}(jQuery));

APP.investment.init();
