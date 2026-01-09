function addDragListeners(task) {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
    saveTasks();
    updateCounts();
  });
}

document.querySelectorAll(".swim-lane").forEach(lane => {
  lane.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".is-dragging");
    lane.appendChild(dragging);
  });
});
