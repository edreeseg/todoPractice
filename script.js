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
		const highPrio = (element) => element.style.flexGrow = "2";
		submitButton.addEventListener("click", () => {
			let todo = document.createElement("li");
			if (todoText.value) todo.textContent = todoText.value;
			else throw new noTodoEntered;
			for (let level of priority){
				if (level.checked){
					if (level.value === "high") todo.classList.add("todoHigh");
					else if (level.value === "medium") todo.classList.add("todoMedium");
					else if (level.value === "low") todo.classList.add("todoLow");
					check = false;
				}
			}
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
	}
}