// TODO: Handle possible null returns from getElementById
import { TodoList, type Todo } from "./TodoList";

const todoInput = (() => {
  const el = document.getElementById("todoInput");
  if (!(el instanceof HTMLInputElement)) {
    throw new Error("todoInput must be an input element");
  }
  return el;
})();

const addTodoButton = (() => {
  const el = document.getElementById("addTodo");
  if (!(el instanceof HTMLButtonElement)) {
    throw new Error("addTodo must be a button element");
  }
  return el;
})();

const todoListElement = (() => {
  const el = document.getElementById("todoList");
  if (!(el instanceof HTMLUListElement)) {
    throw new Error("todoList must be a <ul> element");
  }
  return el;
})();

const todoCount = (() => {
  const el = document.getElementById("todoCount");
  if (!(el instanceof HTMLDivElement)) {
    throw new Error("todoCount must be a <div> element");
  }
  return el;
})();

const todoApp = new TodoList();

function renderTodos(): void {
  todoListElement.innerHTML = "";

  todoApp.listTodos().forEach((todo: Todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.style.textDecoration = todo.completed ? "line-through" : "none";

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle";
    toggleButton.addEventListener("click", () => {
      todoApp.toggleTodo(todo.id);
      renderTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      todoApp.removeTodo(todo.id);
      renderTodos();
    });

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    todoListElement.appendChild(li);
  });

  todoCount.textContent = `Total todos: ${todoApp.getTodoCount()}`;
}

addTodoButton.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (!text) return;

  todoApp.addTodo(text);
  todoInput.value = "";
  renderTodos();
});

renderTodos();