// TODO: Handle possible null returns from getElementById
import { TodoList, type Todo } from "./TodoList";

const todoInput = document.getElementById("todoInput");
if (!(todoInput instanceof HTMLInputElement)) {
  throw new Error("todoInput must be an input element");
}

const addTodoButton = document.getElementById("addTodo");
if (!(addTodoButton instanceof HTMLButtonElement)) {
  throw new Error("addTodo must be a button element");
}

const todoListElement = document.getElementById("todoList");
if (!(todoListElement instanceof HTMLUListElement)) {
  throw new Error("todoList must be a <ul> element");
}

const todoCount = document.getElementById("todoCount");
if (!(todoCount instanceof HTMLDivElement)) {
  throw new Error("todoCount must be a <div> element");
}

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