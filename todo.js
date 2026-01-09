const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const lanes = document.querySelectorAll(".swim-lane");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (input.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }
  createTask(input.value, "todo");
  input.value = "";
  saveTasks();
  updateCounts();
});

function createTask(text, laneName) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.textContent = text;

  task.ondblclick = () => {
    const updated = prompt("Edit task:", task.textContent);
    if (updated) {
      task.childNodes[0].nodeValue = updated;
      saveTasks();
    }
  };

  const del = document.createElement("button");
  del.textContent = "X";
  del.className = "delete-btn";
  del.onclick = () => {
    task.remove();
    saveTasks();
    updateCounts();
  };

  task.appendChild(del);
  document.querySelector(`[data-lane="${laneName}"]`).appendChild(task);
  addDragListeners(task);
}

function saveTasks() {
  const data = {};
  lanes.forEach(lane => {
    const laneName = lane.dataset.lane;
    data[laneName] = [];
    lane.querySelectorAll(".task").forEach(task => {
      data[laneName].push(task.childNodes[0].nodeValue);
    });
  });
  localStorage.setItem("tasks", JSON.stringify(data));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return;

  Object.keys(data).forEach(lane => {
    data[lane].forEach(task => createTask(task, lane));
  });
  updateCounts();
}

function updateCounts() {
  lanes.forEach(lane => {
    lane.querySelector(".count").textContent =
      lane.querySelectorAll(".task").length;
  });
}

window.onload = loadTasks;
