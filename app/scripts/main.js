/**
 * @website Razorfish PLD Test
 * @description This file contains functions related to the "Razorfish PLD Test" investment cycle section, 
 * also creates the namespace.
 * @date 04/8/2013
 * @author Cristobal Avila
 * @version 1.0
 * @dependencies requires at least jQuery 1.6
 */

var RZTEST = RZTEST || {};

RZTEST.investment = (function($) {
	//private
	var checkboxesChecked = 0,
	// selector list. selectors can be modified here for convenience
	config = {
		cycleSelector: $('#investment-cycle-selector'),
		chkBoxes: $('.checkbox-wrapper input[type=checkbox]'),
		msgBox: $('#invest-msg-box')
	},
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

		nextInvestments: function() {
		var month =	config.cycleSelector.find(":selected").data('month'),
			year =	config.cycleSelector.find(":selected").data('year'),
			nextQuarterPattern,
			nextYearPattern;

		var selectedQuarter = Math.ceil(month / 3);

		switch(selectedQuarter) {
			case 1:
				nextQuarterPattern =[1,2,3];
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

		var nextQuarters = {
				nextQ1: {
					q: 	'Q' + (selectedQuarter + nextQuarterPattern[0]) +' '+ (year + nextYearPattern[0])
				},
				nextQ2: {
					q: 	'Q' + (selectedQuarter + nextQuarterPattern[1]) +' '+ (year + nextYearPattern[1])
				},
				nextQ3: {
					q: 	'Q' + (selectedQuarter + nextQuarterPattern[2]) +' '+ (year + nextYearPattern[2])
				}

			};

			return nextQuarters;	
		}
	},
	updateCheckboxes = function() {
		var nextInvest = quarter.nextInvestments();

		// assign subsequent investment values to checkboxes
		checkboxList.cb1.check.attr('value', nextInvest.nextQ1.q);
		checkboxList.cb1.cLabel.text( nextInvest.nextQ1.q );
		
		checkboxList.cb2.check.attr('value', nextInvest.nextQ2.q);
		checkboxList.cb2.cLabel.text( nextInvest.nextQ2.q );
		
		checkboxList.cb3.check.attr('value', nextInvest.nextQ3.q);
		checkboxList.cb3.cLabel.text( nextInvest.nextQ3.q );

		// uncheck all checkboxes
		config.chkBoxes.attr('checked',false);
		checkboxValidation()
	},
	checkboxValidation = function() {
		config.chkBoxes.each(function() {
			if( $(this).is(':checked') ){
				checkboxesChecked += 1;
			}
		});
		// block attempt to select more than 2 checkboxes
		if(checkboxesChecked === 2) {
			config.msgBox.fadeIn(200);
			//disable extra checkbox
			config.chkBoxes.each(function() {
				if(!$(this).is(':checked') ){
					$(this).attr('disabled', true);
				}
			});
		} else {
			config.msgBox.css('display','none');
			config.chkBoxes.each(function() {
				$(this).removeAttr('disabled');
			});
		}
		checkboxesChecked = 0;
	},
	attachUIEvents = function() {
		// investment cycle selection
		config.cycleSelector.change(function(){
			var usrSelection = config.cycleSelector.find(":selected").text();
			var usrSelectionMonth = config.cycleSelector.find(":selected").data('month');
			var usrSelectionYear = config.cycleSelector.find(":selected").data('year');
			updateCheckboxes();
		});
		// checkbox change
		config.chkBoxes.change(function(){
			checkboxValidation();
		});

	},

	init = function() {
		console.log('init!');
		attachUIEvents();
	};
	//public
	return {
		init: init,
		thisquarter: quarter.getQuarterByMonth,
		nextInvestments: quarter.nextInvestments
	};

}(jQuery));

RZTEST.investment.init();
