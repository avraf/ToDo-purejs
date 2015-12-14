function rowOrderer(targetOrderBy) {
	var tBody, rows, tmplRow, comparitiveAction;

	tableChangeEventHandler(targetOrderBy);

	tBody = document.getElementsByTagName('tbody')[0];
	rows  = tBody.getElementsByTagName('tr');	
	
	// Convert to array for ability to pop
	rows    = Array.prototype.slice.call(rows, 0);
	tmplRow = rows.pop();

	switch(targetOrderBy) {  
		case 'done': 
			comparitiveAction = doneComparison;

			break; 

		case 'owner':  
			comparitiveAction = ownerComparison;

			break;

		case 'createddate':
			comparitiveAction = dateComparison;
			targetOrderBy     = targetOrderBy.replace(/dd/, 'dD');

			break;

		case 'priority':
			comparitiveAction  = priorityComparison;
			
			break;

		default:

			break;
	}


	rows.sort(function rowSorter(a, b){
		var first, second;

		first  = (a.getElementsByClassName(targetOrderBy)[0]).firstElementChild;
		second = (b.getElementsByClassName(targetOrderBy)[0]).firstElementChild;

		if(orderSet.ascending){
			return comparitiveAction(first, second);
		}else{
			return 0 - comparitiveAction(first, second);
		}		
	});

	rows.push(tmplRow);

	tBody = rows[0].parentNode;

	rows.forEach(function resetRows(row) {
		tBody.removeChild(row);
		tBody.appendChild(row);
	});
}

function clickColumnToOrderBy(e) {
	var columnClicked;
	
	// This is an issue by created date
	columnClicked = this.innerHTML.toLowerCase();
	
	rowOrderer(columnClicked);
}

function setOrderFeature() {
	var columnHeaders;

	columnHeaders = document.getElementsByTagName('th');

	Array.prototype.forEach.call(columnHeaders, function(th) {
		th.onclick = clickColumnToOrderBy;
	});	
}

function ownerComparison(first, second) {
	first  = first['innerHTML'].toLowerCase();
	second = second['innerHTML'].toLowerCase();

	// Case switch if can
	if(first == second) return 0;
	if(first == 'none') return orderSet.ascending ? 1 : -1;
	if(second == 'none') return orderSet.ascending ? -1 : 1;
	if(first < second) return -1;
	if(first > second) return 1;
}

function doneComparison(first, second) {
	return first['checked'] - second['checked'];
}

function dateComparison(first, second) {
	var firstDate, secondDate;

	firstDate  = first.innerHTML.split('|');
	secondDate = second.innerHTML.split('|');

	firstDate  = new Date('20' + firstDate[2], monthConverter(firstDate[0]), firstDate[1]);
	secondDate = new Date('20' + secondDate[2], monthConverter(secondDate[0]), secondDate[1]);

	return secondDate - firstDate;
}

function monthConverter(monthString){
	var months;

	months = ['Jan', 'Feb', 'Mar',
					 	'Apr', 'May', 'Jun',
						'Jul', 'Aug', 'Sep',
						'Oct', 'Nov', 'Dec'];

	return months.indexOf(monthString);
}

function priorityComparison(first, second) {
	return first.selectedIndex - second.selectedIndex;
}

setOrderFeature();
