document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  loadTasks();

  addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task === "") {
      alert("You must add a task");
      return;
    }

    addTask(task);
    taskInput.value = "";
  });

  function addTask(taskText, isCompleted = false) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    span.textContent = taskText;
    delBtn.innerHTML = "Delete🗑️";
    delBtn.classList.add("delete-btn");

    if (isCompleted) {
      li.classList.add("completed");
    }

    span.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    delBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      const task = {
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed")
      };
      tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      addTask(task.text, task.completed);
    });
  }
});
