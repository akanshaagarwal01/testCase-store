(function () {
	class APITestingInterface {
		
		constructor() {
			this._DOMElements = {};
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
			container.append(l);
			container.append(el);
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
				this.addToStorage(newTestCase);
				this.renderRow(newTestCase);
				this._DOMElements.addForm.reset();
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
		
		addToStorage(newTestCase) {
			this._storedTestCases = JSON.parse(this._storage.getItem("storedTestCases"));
			if(!this._storedTestCases) {
				this._storedTestCases = [];
			}
			console.log(this._storedTestCases);
			this._storedTestCases.push(newTestCase);
			this._storage.setItem("storedTestCases", JSON.stringify(this._storedTestCases));
		}
		
		renderTable() {
			let testCaseTable = document.createElement("div");
			testCaseTable.id = "testCaseTable";
			this._DOMElements.testCaseTable = testCaseTable;
			this._DOMElements.storedTestCases.append(testCaseTable);
			let tblHeader = document.createElement("div");
			tblHeader.id = "tblHeader";
			testCaseTable.append(tblHeader);
			for(let column of columns) {
				let colName = document.createElement("div");
				colName.className = "colName";
				colName.innerHTML = column.label;
				tblHeader.append(colName);
			}
			this._storedTestCases = JSON.parse(this._storage.getItem("storedTestCases"));
			for(let testCase of this._storedTestCases) {
				this.renderRow(testCase);
			}
		}
		
		renderRow(testCase) {
			let row = document.createElement('div');
			row.className = "row";
			this._DOMElements.testCaseTable.append(row);
			for(let key of Object.keys(testCase)) {
				let cell = document.createElement("div");
				cell.className = "cell";
				cell.innerHTML = testCase[key];
				row.append(cell);
			}
		}
		
		editTestCase() {
			
		}
		
		cloneTestCase() {
			
		}
		
		deleteTestCase() {
			
		}
		
		importTestCases() {
			
		}
		
		exportTestCases() {
			
		}

	}
	
	let page = new APITestingInterface();
	
})();