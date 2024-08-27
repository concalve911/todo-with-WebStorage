"use strict";

const form = document.querySelector(".todo__form");
const todoList = document.querySelector(".todo__list");

document.addEventListener("DOMContentLoaded", loadTodos);

form.addEventListener("submit", addTodo);

function addTodo(event) {
  event.preventDefault();

  const input = document.querySelector(".todo__input");
  const inputText = input.value.trim();

  if (inputText === "") {
    return alert("You wrote an empty string");
  }

  const todoItem = createTodoItem(inputText);
  todoList.prepend(todoItem);
  input.value = "";

  saveTodos();
}

todoList.addEventListener("click", handleTodoClick);

function handleTodoClick(event) {
  const action = event.target.dataset.action;

  if (action === "delete") {
    event.target.closest("li").remove();
  } else if (action === "complete") {
    const todoItem = event.target.closest("li");
    todoItem.classList.toggle("completed");
  }

  saveTodos();
}

function createTodoItem(text, isCompleted = false) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo__list-item";
  if (isCompleted) {
    todoItem.classList.add("completed");
  }

  const textNode = document.createTextNode(text);
  todoItem.appendChild(textNode);

  const btnContainer = document.createElement("div");
  btnContainer.className = "todo__btn-container";

  const completeBtn = document.createElement("button");
  completeBtn.appendChild(document.createTextNode("Complete"));
  completeBtn.className = "todo__btn todo__btn--complete";
  completeBtn.dataset.action = "complete";
  btnContainer.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.className = "todo__btn todo__btn--delete";
  deleteBtn.dataset.action = "delete";
  btnContainer.appendChild(deleteBtn);

  todoItem.appendChild(btnContainer);

  return todoItem;
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll(".todo__list-item").forEach((todoItem) => {
    todos.push({
      text: todoItem.firstChild.textContent,
      isCompleted: todoItem.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo.text, todo.isCompleted);
    todoList.prepend(todoItem);
  });
}
