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
	checkboxesChecked = 0,
	monthSelect = 9,	//replace with real selection
	yearSelect,
	selectedQuarter,

	config = {
		cycleSelector: $('#investment-cycle-selector'),
		chkBoxes: $('.checkbox-wrapper input[type=checkbox]'),
		msgBox: $('#invest-msg-box'), 
		chkBox1: $('#chkbox-a'),
		chkBox1Lbl: $('#lbl-chkbox-a'),
		chkBox2: $('#chkbox-b'),
		chkBox2Lbl: $('#lbl-chkbox-b'),
		chkBox3: $('#chkbox-c'),
		chkBox3Lbl: $('#lbl-chkbox-c'),

		//TODO
		// this should return an array of checkbox selects and another for labels
	},
	//checkbox selector list. can be modified in here for convenience and also performance
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
		nextInvestments: function() {
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
			nextQuarters = {
				nextQ1: {
					q: 		'atestQ1',
					year: 	getDateSelected().year,
					qText: 	getDateSelected().month
				},
				nextQ2: {
					q: 		'btestQ1',
					year: 	'b2099',
					qText: 	'bQ1-2013'	
				},
				nextQ3: {
					q: 		'ctestQ1',
					year: 	'c2099',
					qText: 	'cQ1-2013'
				}

			};
			// TODO
			// this should return an array of quarters and year text format or 
			// the same array in value format, you can use an options object
			return nextQuarters;	
		}
	},
	getDateSelected = function() {
		var selectedDate = {
			month: 	config.cycleSelector.find(":selected").data('month'),
			year: 	config.cycleSelector.find(":selected").data('year')
		};
		return selectedDate;
	},
	updateCheckboxes = function() {
		//	TODO 
		//	change this chkbox1 objects into an array to loop
		//	generate the full Q1 2012 option
		
		console.log('checkboxList scope test: '+checkboxList.cb1.check);

		// assign subsequent investment values to checkboxes
		checkboxList.cb1.check.attr('value', quarter.nextInvestments().nextQ1.q);
		checkboxList.cb1.cLabel.text( quarter.nextInvestments().nextQ1.qText );
		
		checkboxList.cb2.check.attr('value', quarter.nextInvestments().nextQ2.q);
		checkboxList.cb2.cLabel.text( quarter.nextInvestments().nextQ2.qText );
		
		checkboxList.cb3.check.attr('value', quarter.nextInvestments().nextQ3.q);
		checkboxList.cb3.cLabel.text( quarter.nextInvestments().nextQ3.qText );


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

	return {
		init: init,
		thisquarter: quarter.getQuarterByMonth,
		nextInvestments: quarter.nextInvestments,
		monthSelect: monthSelect
	};

}(jQuery));

APP.investment.init();
