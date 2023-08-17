"use strict";

const inputEl = document.querySelector("#taskInput");
const taskListEl = document.querySelector("#taskList");
const MessageEl = document.querySelector(".message");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    addTasks(task);
  });
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getAllTasks() {
  const taskElements = document.querySelectorAll("#text-itm");
  const tasks = [];
  taskElements.forEach(taskElement => {
    tasks.push(taskElement.textContent);
  });
  return tasks;
}

inputEl.focus();

function addTasks(inputText) {
  const createEl = document.createElement("li");
  createEl.id = "list-elem";
  createEl.innerHTML = `
    <input type="checkbox" id="checkbox" onclick="checkItm(this)">
    <span id="text-itm">${inputText}</span>
  <button id="edit" onclick="editFunc(this)">Edit</button>
  <button id="btn" onclick="removeItem(this)">Remove</button>    
      `;
  taskListEl.appendChild(createEl);
}

function checkItm(checkbox) {
  const itemCkeck = checkbox.nextElementSibling;
  itemCkeck.style.textDecoration = checkbox.checked ? "line-through" : "none";
  checkbox.checked
    ? itemCkeck.classList.add("fade")
    : itemCkeck.classList.remove("fade");
}

function removeItem(remove) {
  if (confirm("Are you sure you want to delete")) {
    const itemRemove = remove.parentElement;
    taskListEl.removeChild(itemRemove);
    const tasks = getAllTasks();
    saveTasks(tasks); // Update local storage after removing the item
    MessageEl.textContent = "Item deleted successfully";
    MessageEl.style.color = "green";

    setTimeout(function () {
      MessageEl.textContent = "";
    }, 2000);
  }
}

function editFunc(edit) {
  const editItm = edit.previousElementSibling;
  const editTxt = editItm.textContent;
  inputEl.value = editTxt;
  inputEl.focus();

  if (inputEl.value === editTxt) {
    const removeEdit = edit.parentElement;
    taskListEl.removeChild(removeEdit);
  }
}

document.addEventListener("keydown", function (e) {
  const inputText = inputEl.value.trim();
  if (e.key === "Enter") {
    if (inputEl.value !== "") {
      addTasks(inputText);
      saveTasks(getAllTasks());
      MessageEl.textContent = "";
      inputEl.value = "";
    } else {
      MessageEl.textContent = "Please enter a text to add items";
      MessageEl.style.color = "red";
    }
  }
});

function addTask() {
  inputEl.focus();
  const inputText = inputEl.value.trim();
  if (inputEl.value !== "") {
    addTasks(inputText);
    saveTasks(getAllTasks());
    MessageEl.textContent = "";
    inputEl.value = "";
  } else {
    MessageEl.textContent = "Please enter a text to add items";
    MessageEl.style.color = "red";
  }
}
