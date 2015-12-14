function setOwner(e) {
	var ownerInput;
	
	this.ondblclick = null;

	// Does not work w/ out call. this context of element lost in function call
	ownerInput = addUserInputElement.call(this);

	ownerInput.focus();

	ownerInput.onblur = updateOwner;

	// This is done for testing combinatory logic
	return ownerInput;
}

function updateOwner(e) {
	var intake, outPut, ownerArea;

	ownerArea = this.parentNode;

	ownerArea.ondblclick = setOwner;

	intake = this.value;

	if(intake.match(/^(\s+)?$/)){
		outPut = 'none';
	}	else if (intake.length > 26){
		alert('Your task exceeds the 26 character limit!\n Please shorten.');
		outPut = 'none';
	}else{	
		outPut = intake; 
	}

	ownerArea.removeChild(this);
	ownerArea.innerHTML = outPut;	
	//orderSet.ascending = false;
	tableChangeEventHandler();
}

function addUserInputElement() {
	var userInputElement;

	userInputElement = document.createElement("input");
	userInputElement.type      = "text";
	userInputElement.className = "userInputMode";

	// refactor
	this.innerHTML = '';
	this.appendChild(userInputElement);

	return userInputElement;
}

function tableChangeEventHandler(causeOfChange) {
	if(causeOfChange === orderSet.precedingCulprit){
		orderSet.ascending = !orderSet.ascending;
		orderSet.precedingCulprit = causeOfChange;
	}else{
		orderSet.ascending = true;
		orderSet.precedingCulprit = causeOfChange;
	}
}


