class RequiredFieldsBlank extends Error {}

class DuplicateId extends Error {}

const manageTodos = {
	todos: [],
	addTodos(){
		const submitButton = document.getElementsByClassName("addTodo")[0];
		const todoText = document.getElementById("todoEntry");
		const priority = document.getElementsByName("priority");
		const newTodo = {};
		for(;;){
			try {
				const id = Number(Math.random().toString().substring(2, 10));
				for (let entry of this.todos){
					if (entry.id === id) throw new DuplicateId;
				}
				newTodo.id = id;
				break;
			} catch(e){
				if (e instanceof DuplicateId){ 
				continue;
				}
				else throw e;
			}
		}
		if (todoText.value) newTodo.name = todoText.value;
		else throw new RequiredFieldsBlank;
		let check = true;
		for (let level of priority){
			if (level.checked){
				newTodo.priority = level.value;
				check = !check;
			}
		} if (check) throw new RequiredFieldsBlank;
		this.todos.push(newTodo);
		todoText.value = "";
		this.updateTodos();
	},
	deleteTodos(e){
		this.todos.splice(e.target.parentNode.id, 1);
		console.log(this.todos);
		this.updateTodos();
	},
	
	updateTodos(){
		const todoContainer = document.getElementsByClassName("todos")[0];
		todoContainer.innerHTML = "";
		for (let [index, entry] of this.todos.entries()){
			const newTodo = document.createElement("li");
			newTodo.textContent = entry.name;
			newTodo.id = index;
			if (entry.priority === "high") newTodo.classList.add("todoHigh");
			else if (entry.priority === "medium") newTodo.classList.add("todoMedium");
			else newTodo.classList.add("todoLow");
			const exitButton = document.createElement("img");
			exitButton.src = "https://i.imgur.com/DgrTvpF.png";
			exitButton.classList.add("exitButton");
			newTodo.appendChild(exitButton);
			todoContainer.appendChild(newTodo);
			manageEventListeners.deleteButtons();
		}
	}
	
}

const manageEventListeners = {
	todoDuration: (() => {
		const durationButtons = document.getElementsByName("frequency");
		const todoDuration = document.getElementsByClassName("todoDuration")[0];
		for (let button of durationButtons){
			button.addEventListener("change", () => {
				button.id === "recurring" ? 
				todoDuration.style.position = "static"
				: todoDuration.style.position = "absolute";
			});
		}
	})(),
	
	submitButton: (() => {
		const submitButton = document.getElementsByClassName("addTodo")[0];
		submitButton.addEventListener("click", () => manageTodos.addTodos());
	})(),
	
	deleteButtons: () => { // Broken
		const exitButtons = document.getElementsByClassName("exitButton");
		for (let i = 0; i < exitButtons.length; i++){
			exitButtons[i].addEventListener("click", (e) => manageTodos.deleteTodos(e));
		}
	},
	
	sortTodos: () => {
		console.log("this is a placeholder");
	}
}