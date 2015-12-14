describe("Sort by", function() {

	beforeEach(function() {
    setUpTableForOrderingFixture();
  });	

	it("should ensure template row is always last", function() {
		var lastRow, tmplRow;

		rowOrderer('done');

		tmplRow = $('#tmplRow')[0];
  	lastRow = $("tbody tr:last-child")[0];  	  	

  	expect(lastRow.id).toBe(tmplRow.id);
	});	

	describe("Done:", function() {
		var checkBoxes;

		describe("When sorting", function() {

			beforeEach(function() {
		    orderSet.ascending = null;
				rowOrderer('done');
		  });	

			it("should order by not done to done", function() {
				checkBoxes = $('[type=checkbox]');

				expect(checkBoxes[0].checked).toBeFalsy();
				expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
			});

			describe("when sorting a second time", function() {

				beforeEach(function() {
			    // Second rowOrderer bc this is a sub block
					rowOrderer('done');
			  });	

				it("should reverse order", function() {
					checkBoxes = $('[type=checkbox]');

					expect(checkBoxes[0].checked).toBeTruthy();
					expect(checkBoxes[checkBoxes.length - 2].checked).toBeFalsy();
				});

				describe("when sorting yet a third time", function() {

					beforeEach(function() {
				    // Second rowOrderer bc this is a sub block
						rowOrderer('done');
				  });	

					it("should order done to not done", function() {
						checkBoxes = $('[type=checkbox]');

						expect(checkBoxes[0].checked).toBeFalsy();
						expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
					});

				});				

			});

			describe("and then data is changed", function() {
				var testRow, testRowCells, priCell, ownerCell, doneCell;

				beforeEach(function() {
					testRow = $('tbody tr')[0];
			    testRowCells = Array.prototype.map.call(testRow.children, function(td) {
						return td.firstElementChild;
					});

			    doneCell  = testRowCells[0];
			    ownerCell = testRowCells[1];
			    priCell   = testRowCells[4];
					
					doneCell.onchange  = tableChangeEventHandler;
					priCell.onchange   = tableChangeEventHandler;
					//ownerCell.onchange = tableChangeEventHandler;

			  });					

				describe("when adding a row then ordering again", function() {

					it("should default order (not done to done)", function() {
						
						setUpTemplateRowRef();
						addTask('Add table changed scenario');  
						rowOrderer('done');

						checkBoxes = $('[type=checkbox]');

						expect(checkBoxes[0].checked).toBeFalsy();
						expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
					});

				});

				describe("when changing owner then ordering again", function() {

					it("should default order (not done to done)", function() {
						var ownerArea, temporaryInput;

						ownerArea = $('.owner span')[3];

						temporaryInput = setOwner.call(ownerArea);	
						updateOwner.call(temporaryInput);			
						rowOrderer('done');

						checkBoxes = $('[type=checkbox]');

						expect(checkBoxes[0].checked).toBeFalsy();
						expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
					});

				});

				describe("when changing priority then ordering again", function() {

					it("should default order (not done to done)", function() {
						var prioritySpot;

						prioritySpot = $('.priority select')[0];

						prioritySpot.onchange();
						prioritySpot.selectedIndex++;
						rowOrderer('done');

						checkBoxes = $('[type=checkbox]');

						expect(checkBoxes[0].checked).toBeFalsy();
						expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
					});

				});

				describe("when changing done then ordering again", function() {

					it("should default order (not done to done)", function() {
						var doneBox;

						doneBox = $('.done input')[0];						

						doneBox.onchange();
						doneBox.checked = true;

						rowOrderer('done');

						checkBoxes = $('[type=checkbox]');

						expect(checkBoxes[0].checked).toBeFalsy();
						expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
						expect(checkBoxes[0]).not.toBe(doneBox);
					});

				});

				describe("when ordering by a different column (owner) then ordering again by done", function() {

					it("should default order (not done to done)", function() {						
						rowOrderer('owner');
						rowOrderer('done');

						checkBoxes = $('[type=checkbox]');

						expect(checkBoxes[0].checked).toBeFalsy();
						expect(checkBoxes[checkBoxes.length - 2].checked).toBeTruthy();
					});

				});

			});

		});

	});

	describe("Owner", function() {
		var ownerCells;

		describe("When sorting", function() {
			var firstGuy, secondGuy, lastGuy;

			beforeEach(function() {
		    orderSet.ascending = null;
				rowOrderer('owner');
				ownerCells = $('.owner span');
		  });	

			it("should order A-Z", function() {
				firstGuy  = ownerCells[0].innerHTML;
				secondGuy = ownerCells[1].innerHTML;

				expect(firstGuy > secondGuy).toBeFalsy();
			});

			it("should order none last", function() {
				lastGuy = ownerCells[ownerCells.length - 2].innerHTML;

				expect(lastGuy).toEqual('none');
			});

			describe("then sorting a second time", function() {

				beforeEach(function() {			    
					rowOrderer('owner');
					ownerCells = $('.owner span');
			  });	

				it("should reverse order", function() {
					firstGuy  = ownerCells[0].innerHTML;
					secondGuy = ownerCells[1].innerHTML;

					expect(firstGuy < secondGuy).toBeFalsy();
				});

				it("should still put none last", function() {
					lastGuy = ownerCells[ownerCells.length - 2].innerHTML;

					expect(lastGuy).toEqual('none');
				});

				describe("then sorting yet a third time", function() {

					beforeEach(function() {
				    // 3rd rowOrderer bc this is a sub block
						rowOrderer('owner');
						ownerCells = $('.owner span');
				  });	

					it("should order A-Z and none is last", function() {
						firstGuy  = ownerCells[0].innerHTML;
						secondGuy = ownerCells[1].innerHTML;
						lastGuy  = ownerCells[ownerCells.length - 2].innerHTML;

						expect(firstGuy > secondGuy).toBeFalsy();
						expect(lastGuy).toEqual('none');
					});

				});				

			});			

		});

	});

	describe("Date", function() {
		var dateCells;

		describe("When sorting", function() {
			var firstDate, secondDate;

			beforeEach(function() {
		    orderSet.ascending = null;
				rowOrderer('createddate');
				dateCells = $('.createdDate span');
		  });	

			it("should order from recent to long ago", function() {
				firstDate  = dateCells[0].innerHTML.split('|');
				secondDate = dateCells[1].innerHTML.split('|');
				firstDate  = new Date('20' + firstDate[2], monthConverter(firstDate[0]), firstDate[1]);
				secondDate = new Date('20' + secondDate[2], monthConverter(secondDate[0]), secondDate[1]);

				expect(firstDate < secondDate).toBeFalsy();
			});

			describe("then sorting a second time", function() {

				beforeEach(function() {			    
					rowOrderer('createddate');
					dateCells = $('.createdDate span');
			  });	

				it("should reverse order", function() {
					firstDate  = dateCells[0].innerHTML.split('|');
					secondDate = dateCells[1].innerHTML.split('|');
					firstDate  = new Date('20' + firstDate[2], monthConverter(firstDate[0]), firstDate[1]);
					secondDate = new Date('20' + secondDate[2], monthConverter(secondDate[0]), secondDate[1]);

					expect(firstDate > secondDate).toBeFalsy();
				});

				describe("then sorting yet a third time", function() {

					beforeEach(function() {
				    rowOrderer('createddate');
						dateCells = $('.createdDate span');
				  });	

					it("should order from recent to long ago", function() {
						firstDate  = dateCells[0].innerHTML.split('|');
						secondDate = dateCells[1].innerHTML.split('|');
						firstDate  = new Date('20' + firstDate[2], monthConverter(firstDate[0]), firstDate[1]);
						secondDate = new Date('20' + secondDate[2], monthConverter(secondDate[0]), secondDate[1]);

						expect(firstDate < secondDate).toBeFalsy();
					});

				});		

			});					

		});

	});

	describe("Priority", function() {
		var priCells;

			describe("When sorting", function() {
				var firstPri, secondPri;

				beforeEach(function() {
			    orderSet.ascending = null;
					rowOrderer('priority');
					priCells = $('.priority select');
			  });	

				it("should order from highest to lowest", function() {
					firstPri  = priCells[0].selectedIndex;
					secondPri = priCells[1].selectedIndex;

					expect(firstPri < secondPri).toBeFalsy();
				});

				describe("then sorting a second time", function() {

					beforeEach(function() {			    
						rowOrderer('priority');
						priCells = $('.priority select');
				  });	

					it("should reverse order", function() {
						firstPri  = priCells[0].selectedIndex;
						secondPri = priCells[1].selectedIndex;

						expect(firstPri > secondPri).toBeFalsy();
					});

					describe("then sorting yet a third time", function() {

						beforeEach(function() {
					    rowOrderer('priority');
							priCells = $('.priority select');
					  });	

						it("should order from recent to long ago", function() {
							firstPri  = priCells[0].selectedIndex;
							secondPri = priCells[1].selectedIndex;

							expect(firstPri < secondPri).toBeFalsy();
						});

					});		

				});					

			});

	});
	


	xdescribe("Tasks", function() {

		xit("create a simple task row from template row with its children", function() {
			expect(newRow).toEqual('TR');
			expect(newRow.firstElementChild).toEqual('TD');
		});

		xit("should not create a new row with id like template's id", function() {
			expect(newRow.id).toEqual("");
		});

		xit("should enable checkbox and option elements", function() {
			expect(newRow.firstElementChild.firstElementChild.disabled).toEqual(false);
			expect(newRow.lastElementChild.firstElementChild.disabled).toEqual(false);
		});

	});

});