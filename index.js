(function () {
	class APITestingInterface {
		
		constructor() {
			this._DOMElements = {};
			this._index = 0;
			this._storage = new Storage();
			this.initializeDOMElements();
			this.renderStaticColumns();
			this.renderForm();
			this.renderTable();
		}
		
		initializeDOMElements() {
			this._DOMElements = {
				staticColumns: document.getElementById("staticColumns"),
				addFormContainer: document.getElementById("addFormContainer"),
				storedTestCases: document.getElementById("storedTestCases"),
			};
		}
		
		renderElement(container,element) {
			let wrap = document.createElement('div');
			wrap.className = "wrap";
			let el,l;
			l = document.createElement('label');
			l.htmlFor = element.name;
			l.innerHTML = element.label || '';
			if(element.type === "select") {
				el = document.createElement("select");
				el.id = element.name;
				el.name = element.name;
				if (element.options) {
					for (let option of element.options) {
						let op = new Option(option, option);
						el.append(op);
					}
				}
				if (element.selected)
                    el.value = element.selected;
            }
			else if(element.type === "textarea") {
				el = document.createElement("textarea");
				el.id = element.name;
				el.name = element.name;
				el.addEventListener("focus",function() {
				el.classList.remove('invalidInput') 
				});
			}
			else if(element.type === "text" || element.type === "number") {
				el = document.createElement("input");
				el.type = element.type;
				el.id = element.name;
				el.name = element.name;
				if ("size" in element && element.type === "text")
					el.size = element.size;
			}
			if (("required" in element) && element.required)
                el.required = true;
			wrap.append(l);
			wrap.append(el);
			container.append(wrap);
		}
		
		renderStaticColumns() {
			for(let element of staticColumns) {
				this.renderElement(this._DOMElements.staticColumns,element);
			}
		}
		
		renderForm() {
			let addForm = document.createElement('form');
			addForm.id = "addForm";
			addForm.className = "addForm";
			this._DOMElements.addFormContainer.append(addForm);
			this._DOMElements.addForm = addForm;
			for(let element of columns) {
				this.renderElement(this._DOMElements.addForm,element);
			}
			let add = document.createElement('input');
			add.id = "add";
			add.type = "submit";
			add.value = "ADD";
			this._DOMElements.addForm.append(add);
			this._DOMElements.add = add;
			this._DOMElements.addForm.addEventListener("submit", this.addToTable.bind(this));
		}
		
		addToTable(event) {
			let op = event.target.add.value;
			event.preventDefault();
			let toValidateJSON = columns.filter(item => "validateJSON" in item && item.validateJSON);
			for(let col of toValidateJSON) {
				let el = document.getElementById(`${col.name}`);
				if(el.value.length) {
					this.validateJSON(col,el);
				}
			}
			if(!document.getElementsByClassName("invalidInput").length) {
				let newTestCase = {};
				for(let column of columns) {
					newTestCase[column.name] = document.getElementById(`${column.name}`).value;
				}
				this.addToStorage(newTestCase,op);
				this.renderTable();
				this._DOMElements.addForm.reset();
				this._DOMElements.add.value = "ADD";
			}
		}
		
		validateJSON(col,el) {
			try {
				JSON.parse(el.value);
				el.classList.remove("invalidInput");
			} 
			catch (e) {
				el.classList.add("invalidInput");
				return false;
			}
			return true;
		}
		
		addToStorage(newTestCase,op) {
			this._storedTestCases = JSON.parse(this._storage.getItem("storedTestCases"));
			if(!this._storedTestCases) {
				this._storedTestCases = [];
			}
			if(op === "SAVE") {
				this._storedTestCases[this._index] = newTestCase;
			}
			else if(op === "ADD") {
				this._storedTestCases.push(newTestCase);
			}
			this._storage.setItem("storedTestCases", JSON.stringify(this._storedTestCases));
		}
		
		renderTable() {
			if(!this._DOMElements.testCaseTable) {
				let testCaseTable = document.createElement("div");
				testCaseTable.id = "testCaseTable";
				this._DOMElements.testCaseTable = testCaseTable;
				this._DOMElements.storedTestCases.append(testCaseTable);
			}
			this._DOMElements.testCaseTable.innerHTML = '';
			let tblHeader = document.createElement("div");
			tblHeader.id = "tblHeader";
			this._DOMElements.tblHeader = tblHeader;
			testCaseTable.append(tblHeader);
			testCaseTable.addEventListener("click",this.handleRowOperation.bind(this));
			let empty = document.createElement("div");
			empty.className = "empty";
			tblHeader.append(empty);
			let i = 0;
			for(let column of columns) {
				let colName = document.createElement("div");
				colName.className = "colName";
				colName.innerHTML = column.label;
				colName.style.width = `${columns[i].width}`;
				tblHeader.append(colName);
				i++;
			}
			this._storedTestCases = JSON.parse(this._storage.getItem("storedTestCases"));
			let rowCount = 0;
			for(let testCase of this._storedTestCases) {
				this.renderRow(testCase,rowCount);
				rowCount++;
			}
		}
		
		renderRow(testCase,rowCount) {
			let row = document.createElement('div');
			row.className = "row";
			row.id = `row_${rowCount}`;
			this._DOMElements.testCaseTable.append(row);
			let edit = document.createElement("img");
			edit.id = `edit_${rowCount}`;
			edit.className = "edit";
			edit.src = "images/edit.png";
			edit.title = "Edit";
			row.append(edit);
			let clone = document.createElement("img");
			clone.id = `clone_${rowCount}`;
			clone.className = "clone";
			clone.src = "images/clone.png";
			clone.title = "Clone";
			row.append(clone);
			let del = document.createElement("img");
			del.id = `delete_${rowCount}`;
			del.className = "delete";
			del.src = "images/delete.png";
			del.title = "Delete";
			row.append(del);
			let i = 0;
			for(let key of Object.keys(testCase)) {
				let cell = document.createElement("div");
				cell.id = `${key}_${rowCount}`
				cell.className = "cell";
				cell.innerHTML = testCase[key];
				cell.title = testCase[key];
				cell.style.width = `${columns[i].width}`;
				row.append(cell);
				i++;
			}
		}
		
		deleteFromStorage() {
			this._storedTestCases = JSON.parse(this._storage.getItem("storedTestCases"));
			this._storedTestCases.splice(this._index,1);
			this._storage.setItem("storedTestCases", JSON.stringify(this._storedTestCases));
		}
		
		handleRowOperation(event) {
			if(event.target.classList.contains("edit")){
				this._index = event.target.id.substring(5);
				this.editTestCase();
			}
			else if(event.target.classList.contains("clone")) {
				this._index = event.target.id.substring(6);
				this.cloneTestCase();
			}
			else if(event.target.classList.contains("delete")) {
				event.stopImmediatePropagation();		
				this._index = event.target.id.substring(7);
				this.deleteTestCase();
			}
		}
		
		loadForm() {
			let rowData = JSON.parse(this._storage.getItem("storedTestCases"))[this._index];
			for(let column of columns) {
				let el = document.getElementById([column.name]);
				if(el.type === "select") {
					el.selected = rowData[column.name];
				}
				else{
					el.value = rowData[column.name];
				}
			}
		}
		
		editTestCase() {
			this.loadForm();
			this._DOMElements.add.value = "SAVE";
		}
		
		cloneTestCase() {
			this.loadForm();
		}
		
		deleteTestCase() {
			this.deleteFromStorage();
			this.renderTable();
		}
		
		importTestCases() {
			
		}
		
		exportTestCases() {
			
		}

	}
	
	let page = new APITestingInterface();
	
})();