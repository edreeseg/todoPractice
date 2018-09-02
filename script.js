class noTodoEntered extends Error {}

class noPrioritySelected extends Error {}

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
	
	addTodo: (() => {
		const submitButton = document.getElementsByClassName("addTodo")[0];
		const todoText = document.getElementById("todoEntry");
		const todoContainer = document.getElementsByClassName("todos")[0];
		const priority = document.getElementsByName("priority");
		const test = document.createElement("span");  // Change name!  Using span to have different max-width for text than for li.
		const highPrio = (element) => element.style.flexGrow = "2";
		submitButton.addEventListener("click", () => {
			let todo = document.createElement("li");
			if (todoText.value) test.textContent = todoText.value; // Used to be adding textContent to the li element directly.
			else throw new noTodoEntered;
			let check = true;
			for (let level of priority){
				if (level.checked){
					if (level.value === "high") todo.classList.add("todoHigh");
					else if (level.value === "medium") todo.classList.add("todoMedium");
					else if (level.value === "low") todo.classList.add("todoLow");
					check = !check;
				}
			} if (check) throw new noPrioritySelected;
			todo.appendChild(test);  // Spans are getting replaced with each new entry.
			const exitButton = document.createElement("img");
			exitButton.src = "https://i.imgur.com/DgrTvpF.png";
			exitButton.classList.add("exitButton");
			todo.appendChild(exitButton);
			todoContainer.appendChild(todo);
			todoText.value = "";
			manageEventListeners.deleteTodo();
		});
	})(),
	
	deleteTodo: () => {
		const exitButtons = document.getElementsByClassName("exitButton");
		for (let i = 0; i < exitButtons.length; i++){
			exitButtons[i].addEventListener("click", (e) => {
				e.target.parentNode.remove();
			});
		}
	},
	
	sortTodos: () => {
		console.log("this is a placeholder");
	}
}