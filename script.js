document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => renderTask(task, index));
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  function renderTask(task, index) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    const completeBtn = li.querySelector(".complete-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", () => {
      const tasks = getTasks();
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      loadTasks();
    });

    deleteBtn.addEventListener("click", () => {
      const tasks = getTasks();
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    });

    taskList.appendChild(li);
  }

  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
      const tasks = getTasks();
      tasks.push({ text, completed: false });
      saveTasks(tasks);
      taskInput.value = "";
      loadTasks();
    }
  });

  loadTasks();
});
