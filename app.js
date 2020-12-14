const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

loadDefault();

function loadDefault() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", saveTask);
  clearBtn.addEventListener("click", clearTasks);
  taskList.addEventListener("click", removeItems);
  filter.addEventListener("keyup", filterItems);
}

function getTasks(e) {
  let tasks;
  if (localStorage.getItem("task") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("task"));

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function saveTask(e) {
  if (taskInput.value === "") {
    alert("no tasks");
  }
  const li = document.createElement("li");
  li.className = "collection-item";
  li.setAttribute("title", "newtask");
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);

  saveInLS(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}

function saveInLS(task) {
  let tasks;
  if (localStorage.getItem("task") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("task"));
  console.log(tasks);
  tasks.push(task);
  console.log(tasks);
  localStorage.setItem("task", JSON.stringify(tasks));
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function removeItems(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeFromLS(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("task") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("task"));

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) tasks.splice(index, 1);
  });

  localStorage.setItem("task", JSON.stringify(tasks));
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const value = task.firstChild.textContent;
    if (value.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else task.style.display = "none";
  });
  e.preventDefault();
}
