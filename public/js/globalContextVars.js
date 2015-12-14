var orderSet, templateRow, globAccs;

globAccs ={
	templateRow: document.getElementById("tmplRow")	
};

orderSet = {
	ascending: false
};

// This function is really made for spec purposes
function setUpTemplateRowRef(){
	window.templateRow = document.getElementById("tmplRow");
}
