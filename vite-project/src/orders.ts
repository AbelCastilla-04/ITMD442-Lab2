// TODO: Handle possible null returns from getElementById
import { TodoList, type Todo } from './TodoList';
function getRequiredElement<T extends HTMLElement>(
  id: string,
  guard: (el: HTMLElement) => el is T
): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Required element #${id} was not found`);

  if (!guard(el)) {
    throw new Error(`Element #${id} is not the expected element type`);
  }
  return el;
}

const todoInput = getRequiredElement(
  "todoInput",
  (el): el is HTMLInputElement => el instanceof HTMLInputElement
);

const addTodoButton = getRequiredElement(
  "addTodo",
  (el): el is HTMLButtonElement => el instanceof HTMLButtonElement
);

const todoListElement = getRequiredElement(
  "todoList",
  (el): el is HTMLUListElement => el instanceof HTMLUListElement
);

const todoCount = getRequiredElement(
  "todoCount",
  (el): el is HTMLDivElement => el instanceof HTMLDivElement
);

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

addTodoButton.addEventListener("click", (e: MouseEvent) => {
  console.log("Add button clicked:", e.currentTarget);

  const text = todoInput.value.trim();
  if (!text) return;

  todoApp.addTodo(text);
  todoInput.value = "";
  renderTodos();
});

renderTodos();