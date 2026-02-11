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