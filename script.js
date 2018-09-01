const durationButtons = document.getElementsByName("frequency");
const todoDuration = document.getElementsByClassName("todoDuration")[0];
for (let button of durationButtons){
    button.addEventListener("change", () => {
        button.id === "recurring" ? 
        todoDuration.style.position = "static"
        : todoDuration.style.position = "absolute";
    });
}