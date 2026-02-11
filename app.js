// TODO: Add proper types to this class and its methods
class TodoList {
    constructor() {
        // TODO: What type should this array hold?
        this.todos = [];
    }

    // TODO: Add parameter type and return type
    addTodo(text) {
        const todo = {
            id: crypto.randomUUID(),
            text: text,
            completed: false
        };
        this.todos.push(todo);
        return todo;
    }

    // TODO: Add parameter type and return type
    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    // TODO: Add parameter type and return type
    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
    }

    // TODO: Add return type
    listTodos() {
        return this.todos;
    }

    // TODO: Add return type
    getTodoCount() {
        return this.todos.length;
    }
}

// TODO: Handle possible null returns from getElementById
const app = document.getElementById('app');
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoListElement = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');

const todoApp = new TodoList();

function renderTodos() {
    todoListElement.innerHTML = '';
    // TODO: Add type for the todo parameter
    todoApp.listTodos().forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.dataset.tid = todo.id;
        li.style.textDecoration = todo.completed ? 'line-through' : 'none';
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        // TODO: Add type for the event parameter
        deleteButton.onclick = (e) => {
            console.log('Delete button clicked:', e.target);
            const listItem = e.target.parentElement;
            const todoId = listItem.dataset.tid;
            todoApp.removeTodo(todoId);
            renderTodos();
        };

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle';
        // TODO: This event parameter is unused - you can remove it or add proper typing
        toggleButton.onclick = (e) => {
            todoApp.toggleTodo(todo.id);
            renderTodos();
        };

        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        todoListElement.appendChild(li);
    });

    // Update todo count display
    // TODO: todoCount might be null, handle this case
    const count = todoApp.getTodoCount();
    todoCount.textContent = `Total todos: ${count}`;
}

// TODO: Add type for the event parameter
addTodoButton.addEventListener('click', (e) => {
    console.log('Add button clicked:', e.currentTarget);
    // TODO: todoInput might be null, handle this case
    if (todoInput.value.trim()) {
        todoApp.addTodo(todoInput.value);
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();
