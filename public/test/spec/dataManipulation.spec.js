describe("activeData", function() {
	var activeData;

	beforeEach(function() {
    activeData = new RowsData();
  });	

	it("should be accessible", function() {
  	expect(activeData.rows).toBeDefined();
	});	

	xit("should have individual tasks representing matching rows", function() {
  	expect(activeData.rows[0].priority).toBeDefined();
	});	

	xit("should load data from file", function() {
		var rows;

		expect(activeData).toBeUnDefined();

  	expect(activeData).toBeDefined();
	});

	xit("should save data to file", function() {
		var rows;

		expect(activeData).toBeUnDefined();

  	expect(activeData).toBeDefined();
	});

	xit("should see new tasks added", function() {
  	expect(activeData).toBeDefined();
	});	

	xit("should modify owner", function() {
  	expect(activeData).toBeDefined();
	});	

	xit("should modify done", function() {
  	expect(activeData).toBeDefined();
	});	

	xit("should modify priority", function() {
  	expect(activeData).toBeDefined();
	});	

	xdescribe("Done:", function() {
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

		});

	});

});