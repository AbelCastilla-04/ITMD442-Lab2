export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export class TodoList {
  private todos: Todo[] = [];

  addTodo(text: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
  }

  toggleTodo(id: string): void {
    this.todos = this.todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  listTodos(): Todo[] {
    return this.todos;
  }

  getTodoCount(): number {
    return this.todos.length;
  }
}