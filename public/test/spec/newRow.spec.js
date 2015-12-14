describe("createTask", function() {
	var newRow;

	beforeEach(function() {
    setUpHTMLFixture();
    setUpTemplateRowRef();
    newRow = createTask("do dishes");
  });

	it("create a simple task row from template row with its children", function() {
		expect(newRow).toEqual('TR');
		expect(newRow.firstElementChild).toEqual('TD');
	});

	it("should not create a new row with id like template's id", function() {
		expect(newRow.id).toEqual("");
	});

	it("should enable checkbox and option elements", function() {
		expect(newRow.firstElementChild.firstElementChild.disabled).toEqual(false);
		expect(newRow.lastElementChild.firstElementChild.disabled).toEqual(false);
	});
	
	it("should write current date for creation date", function() {
		d = (new Date()).toDateString()
										.replace(/.{4}/, '')
										.replace(/..(..)$/, '$1')
										.replace(/\s+/g, '|');
		expect(newRow.children[3].firstElementChild.textContent).toEqual(d);
	});

	describe("parameter behavior", function() {

		it("should write task name to task text cell", function() {
			expect(newRow.children[2].firstElementChild.textContent).toEqual("do dishes");
		});

		it("should default both owner and priority cells", function() {
			expect(newRow.children[1].firstElementChild.textContent).toEqual("none");
			expect(newRow.children[4].firstElementChild.selectedIndex).toEqual(0);
		});

		describe("when given only priority parameter", function() { 

			beforeEach(function() {
		    newRow = createTask("do dishes", 2);
		  });

		  it("should set priority cell", function() {
				expect(newRow.children[4].firstElementChild.selectedIndex).toEqual(2);
			});

			it("should default owner cell", function() {
				expect(newRow.children[1].firstElementChild.textContent).toEqual("none");
			});

		});

		xdescribe("when given only owner parameter", function() { 

			beforeEach(function() {
		    newRow = createTask("do dishes", 'moyshela');
		  });

			it("should set owner cell", function() {
				expect(newRow.children[1].firstElementChild.textContent).toEqual('moyshela');
			});

			it("should default priority cell", function() {
				expect(newRow.children[4].firstElementChild.selectedIndex).toEqual(0);
			});			

		});

		describe("when given 3 parameters", function() { 

			beforeEach(function() {
		    newRow = createTask("do dishes", 'moyshela', 1);
		  });

			it("should set owner cell and priority", function() {
				expect(newRow.children[1].firstElementChild.textContent).toEqual('moyshela');
				expect(newRow.children[4].firstElementChild.selectedIndex).toEqual(1);
			});	

		});

	});
	
});



describe("addTask", function() { 
     
  beforeEach(function() {
    setUpHTMLFixture();
    setUpTemplateRowRef();
  });
     
  it("Should add a new row", function() {
  	var rowsBeforeAdd, rowsAfterAdd;

  	rowsBeforeAdd = $('tr').length;

  	addTask();

  	rowsAfterAdd = $('tr').length;

  	expect(rowsBeforeAdd + 1).toEqual(rowsAfterAdd);
  });

  it("Should add a new row and template row should still be last", function() {
  	var firstRow, lastRow;
  	
  	addTask();

  	firstRow = $("tr:first-child")[0];
  	lastRow  = $("tr:last-child")[0];
  	  	

  	expect(lastRow.id).toEqual("tmplRow");
  	expect(firstRow.id).not.toEqual("tmplRow");
  });

  describe("when passing parameters", function() { 
		var text, owner, priority, defaultOwner, defaultPriority,
				textField, ownerField, priorityField;

		text     				= "Just be Bobby";
		owner   				= "Bobby Jones";
		priority 				= 1;
		defaultOwner 		= 'none';
		defaultPriority = 0;

		it("Should add a new row with 3 parameters passed", function() {

	  	addTask(text, owner, priority);  

	  	textField = $("tr:first-child td.text")[0];
	  	ownerField = $("tr:first-child td.owner")[0];
	  	priorityField = $("tr:first-child td.priority select")[0];

	  	expect(textField.textContent).toEqual(text);
	  	expect(ownerField.textContent).toEqual(owner);
	  	expect(priorityField.selectedIndex).toEqual(priority);
	  });

	  it("Should add a new row with 2 parameters passed", function() {

	  	addTask(text, priority); 

	  	textField = $("tr:first-child td.text")[0];
	  	ownerField = $("tr:first-child td.owner")[0];
	  	priorityField = $("tr:first-child td.priority select")[0];

	  	expect(textField.textContent).toEqual(text);
	  	expect(ownerField.textContent).toEqual(defaultOwner);
	  	expect(priorityField.selectedIndex).toEqual(priority);
	  });

	  it("Should add a new row with 1 parameters passed", function() {

	  	addTask(text);

	  	textField = $("tr:first-child td.text")[0];
	  	ownerField = $("tr:first-child td.owner")[0];
	  	priorityField = $("tr:first-child select")[0];

	  	expect(textField.textContent).toEqual(text);
	  	expect(ownerField.textContent).toEqual(defaultOwner);
	  	expect(priorityField.selectedIndex).toEqual(defaultPriority);
	  });

	});  

});

describe("When clicking on template row to initialize adding a task", function() { 
     
  beforeEach(function() {
    setUpHTMLFixture();
    setUpTemplateRowRef();    
		setTemplateRow();
		rowClicker();
  });
     
  it("Should automatically focus on task text field", function() {
  	var taskInputField;

  	taskInputField = $("#tmplRow td.text input")[0];

  	expect(taskInputField).toBe(document.activeElement);
  });
});

describe("When attempting to add a row by clicking 'GO'", function() { 
	var global, goBtn, textTaskField;

  global = window;

  beforeEach(function() {
    setUpHTMLFixture();
    setUpTemplateRowRef();    
		setTemplateRow();
		rowClicker();
		goBtn = $('#goButton')[0];

		textTaskField = $("#tmplRow td.text span input")[0];
  });
  
  describe("When there is no text in task text field", function() {  

	  it("Should not allow user to add a task", function() {
			spyOn(global, "addTask");
			spyOn(global, "alert"); 

			goBtn.onclick({stopPropagation: function() {} });         
			expect(global.addTask).not.toHaveBeenCalled();
	  });

	  it("Should return a message to user", function() {
			spyOn(global, "addTask");
			spyOn(global, "alert"); 

			goBtn.onclick({stopPropagation: function() {} });         
			expect(global.alert).toHaveBeenCalled();
	  });

	});

	describe("When there is text in task text field", function() {  

		beforeEach(function() {
			textTaskField.value = 'Some task';
	  });

	  it("Should allow user to add a task", function() {
			spyOn(global, "addTask");
			spyOn(global, "alert"); 

			goBtn.onclick({stopPropagation: function() {} });         
			expect(global.addTask).toHaveBeenCalled();
	  });

	  it("Should not return a message to user", function() {
			spyOn(global, "addTask");
			spyOn(global, "alert"); 

			goBtn.onclick({stopPropagation: function() {} });         
			expect(global.alert).not.toHaveBeenCalled();
	  });

	});

	describe("When there is text in task text field but it exceeds character limit", function() {  
		

		beforeEach(function() {
			var longText;
			longText = 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhkkkkkkkmmmmm';
			
			textTaskField.value = longText;
	  });

	  it("Should not allow user to add a task", function() {	  	
			spyOn(global, "addTask");
			spyOn(global, "alert"); 

			goBtn.onclick({stopPropagation: function() {} });         
			expect(global.addTask).not.toHaveBeenCalled();
	  });

	});

	describe("When the task text field has only white space characters", function() {  

		describe("Should not allow user to add a task", function() { 

		  it("whether its a space generated by space bar", function() {
		  	textTaskField.value = ' ';
		  	
				spyOn(global, "addTask");
				spyOn(global, "alert"); 

				goBtn.onclick({stopPropagation: function() {} });         
				expect(global.addTask).not.toHaveBeenCalled();
		  });

		  it("whether its several white spaces", function() {
		  	textTaskField.value = '              ';

				spyOn(global, "addTask");
				spyOn(global, "alert"); 

				goBtn.onclick({stopPropagation: function() {} });         
				expect(global.addTask).not.toHaveBeenCalled();
		  });

		  it("whether its a tab", function() {
		  	textTaskField.value = '\t';

				spyOn(global, "addTask");
				spyOn(global, "alert"); 

				goBtn.onclick({stopPropagation: function() {} });         
				expect(global.addTask).not.toHaveBeenCalled();
		  });

		});

	});

});