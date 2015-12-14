function addTask(){
	var tableBody, newRow, rows;

	tableBody   = document.getElementsByTagName('TBODY')[0];
	newRow      = createTask.apply(null, arguments);
		
	tableBody.insertBefore(newRow, templateRow);
	tableChangeEventHandler();
}

function createTask(){
	var newRow, params, 
			taskText, paramOwner, paramPriority, date;
	
	params        = Array.prototype.slice.call(arguments, 0);
	taskText      = params[0];
	paramOwner    = 'none';
	
	// There are only 2 cases priority is always given
	if(params.length === 2){
		if(typeof params[1] == 'number'){
			paramPriority = params[1];
		} 
	} else if(params.length === 3) {
		paramPriority = params[2];
		paramOwner    = params[1];
	}
	
	newRow = templateRow.cloneNode(true);

	date = (new Date()).toDateString()
						.replace(/.{4}/, '')
						.replace(/..(..)$/, '$1')
						.replace(/\s+/g, '|');
	
	newRow.removeAttribute('id');
	
	setInnerCells.apply(newRow, [taskText, paramOwner, paramPriority, date]);

	return newRow;
}

function setInnerCells(taskText, paramOwner, paramPriority, date) {
	var innerCells;

	innerCells = Array.prototype.map.call(this.children, function(td) {
		return td.firstElementChild;
	});

	innerCells[0].disabled = false;
	innerCells[4].disabled = false;

	innerCells[2].textContent   = taskText;
	innerCells[1].textContent   = paramOwner;
	innerCells[3].textContent   = date;
	innerCells[4].selectedIndex = paramPriority;

	innerCells[1].ondblclick    = setOwner;
	innerCells[0].onchange      = tableChangeEventHandler;
	innerCells[4].onchange      = tableChangeEventHandler;
	innerCells[1].onchange      = tableChangeEventHandler;
}

function defaultTemplateRowValues() {
	templateRow.onclick = rowClicker;
	templateRow.children[1].firstElementChild.textContent   = '--';
	templateRow.children[2].firstElementChild.textContent   = 'Click here to insert new row...';
	templateRow.children[4].firstElementChild.selectedIndex = 0;
	templateRow.children[4].firstElementChild.disabled      = true;
}

function setTemplateRow() {
	rowClicker = function(e) {
		// Disable onclick so user can interact w/ template row
		templateRow.onclick = null;

		// Enable priority
		templateRow.children[4].firstElementChild.disabled = false;

		textArea   = templateRow.children[2].firstElementChild;
		textInput  = addUserInputElement.call(textArea);
		ownerArea  = templateRow.children[1].firstElementChild;
		ownerInput = addUserInputElement.call(ownerArea);

		textInput.focus();

		setGoNoButtons();
	};	

	function setGoNoButtons() {
		goButton = document.createElement('BUTTON');
		goButton.id        = 'goButton';
		goButton.className = 'setButton';
		goButton.innerHTML = 'GO';		
		goButton.top       = templateRow.offsetTop;		

		noButton = goButton.cloneNode(true);
		noButton.id        = 'noButton';
		noButton.innerHTML = 'NO';

		templateRow.appendChild(goButton);
		templateRow.appendChild(noButton);

		noButton.onclick = function(e) {
			e.stopPropagation();
			returnState();
		};

		goButton.onclick = function(e) {
			var intake;
			e.stopPropagation(); 
			intake = [
				templateRow.children[2].firstElementChild.firstElementChild.value, // Task text
				templateRow.children[1].firstElementChild.firstElementChild.value, // Owner can be omitted
				templateRow.children[4].firstElementChild.selectedIndex // priority
			];

			if(intake[0].match(/^(\s+)?$/)){
				alert('You must give a task to add a row!');
			}
			else if (intake[0].length > 70){
				alert('Your task exceeds the 70 character limit!\n Please shorten.')
			}else{
				if(!intake[1]){
					intake.splice(1,1);
				}
	 						
				returnState();

				addTask.apply(null, intake);
			}				
		};
	}
	
	// Ensures priority is disabled in case of cache
	defaultTemplateRowValues();
}

function returnState() {
	textArea.removeChild(textInput); 
	ownerArea.removeChild(ownerInput); 

	noButton.parentNode.removeChild(noButton);
	goButton.parentNode.removeChild(goButton);
	defaultTemplateRowValues();
}

// Sets up global templateRow if its element exists (as in prod)
if (document.getElementById("tmplRow")) {
	setUpTemplateRowRef();
	setTemplateRow();
};
