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
		newTodo.date = new Date();
		this.todos.push(newTodo);
		todoText.value = "";
		this.updateTodos();
	},
	deleteTodos(e){
		console.log(this.todos[e.target.parentNode.id]);
		this.updateTodos();
	},
	
	updateTodos(){
		const todoContainer = document.getElementsByClassName("todos")[0];
		todoContainer.innerHTML = "";
		for (let i = 0; i < this.todos.length; i++){
			const newTodo = document.createElement("li");
			newTodo.textContent = this.todos[i].name;
			newTodo.id = i;
			if (this.todos[i].priority === "high") newTodo.classList.add("todoHigh");
			else if (this.todos[i].priority === "medium") newTodo.classList.add("todoMedium");
			else newTodo.classList.add("todoLow");
			const exitButton = document.createElement("img");
			exitButton.src = "https://i.imgur.com/DgrTvpF.png";
			exitButton.classList.add(i);
			exitButton.classList.add("exitButton");
			newTodo.appendChild(exitButton);
			todoContainer.appendChild(newTodo);
		}
		manageEventListeners.deleteButtons();
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
	
	deleteButtons: () => {
		const exitButtons = document.getElementsByClassName("exitButton");
			for(let i = 0; i < manageTodos.todos.length; i++){
				exitButtons[i].addEventListener("click", (e) => {
				manageTodos.todos.splice(e.target.parentNode.id, 1)
				manageTodos.updateTodos()});
		}
	},
	
	sortTodos: (() => {
		const selectSort = document.getElementsByClassName("sortSelect")[0];
		selectSort.addEventListener("change", () => {
			switch (Array.from(selectSort.children, x => x.value).indexOf(selectSort.value)){
				case 1:
					manageTodos.todos = manageTodos.todos.sort((a, b) => b.date.getTime() - a.date.getTime());
					manageTodos.updateTodos();
					break;
				case 2:
					manageTodos.todos = manageTodos.todos.sort((a, b) => a.date.getTime() - b.date.getTime());
					manageTodos.updateTodos();
					break;
				case 3:
					manageTodos.todos = manageTodos.todos.sort((a, b) => a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0));
					manageTodos.updateTodos();
					break;
				case 4:
					manageTodos.todos = manageTodos.todos.sort((a, b) => b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0));
					manageTodos.updateTodos();
					break;
				case 5:
					manageTodos.todos = manageTodos.todos.sort((a, b) => {
						if (a.priority === "high" && b.priority !== "high") return -1;
						else if (b.priority === "high" && a.priority !== "high") return 1;
						else if (a.priority === "medium" && b.priority === "low") return -1;
						else if (b.priority === "medium" && a.priority === "low") return 1;
						else return 0;
					});
					manageTodos.updateTodos();
					break;
				case 6:
					manageTodos.todos = manageTodos.todos.sort((a, b) => {
						if (a.priority === "high" && b.priority !== "high") return 1;
						else if (b.priority === "high" && a.priority !== "high") return -1;
						else if (a.priority === "medium" && b.priority === "low") return 1;
						else if (b.priority === "medium" && a.priority === "low") return -1;
						else return 0;
					});
					manageTodos.updateTodos();
					break;
			}
		});
	})()
}