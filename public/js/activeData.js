function RowsData(env) {
	this.rows = [];
}

function RowsDataLS(env) {
	var ls;

	ls = localStorage;

	this.rows = ls.rows || [];

	this.loadRows = function loadRowsFromLS() {
		this.rows = ls.rows;
	};

	this.addRow = function(row) {
		ls.rows.push(row);
	};

	this.findRow = function(row) {
		var target;

		target = ls.rows.find(function(r) {
			return r.text === row.text && r.createdDate === row.createdDate;
		});

		return ls.rows.indexOf(target);
	};

	this.changeRow = function(row) {
		var old;

		old = this.findRow(row);
		ls.rows.splice(old, 1, row);
	};
}