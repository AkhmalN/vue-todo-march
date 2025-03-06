import { defineStore } from "pinia";

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  userId: number;
}

interface ITodoState {
  todos: ITodo[];
  loading: boolean;
  error: boolean;
  search: string;
  showEditor: boolean;
  isSelectedItem: ITodo | undefined;
  isNewTodo: boolean;
  isOnBoarding: boolean;
  success: boolean;
}

export const useTodoStore = defineStore("todos", {
  state: (): ITodoState => ({
    todos: [] as ITodo[],
    loading: false,
    error: false,
    search: "",
    showEditor:
      JSON.parse(localStorage.getItem("showEditor") || "false") || false,
    isSelectedItem: undefined,
    isNewTodo: false,
    isOnBoarding: false,
    success: false,
  }),

  getters: {
    filteredTodos: (state): ITodo[] => {
      return state.todos.filter((todo: ITodo) =>
        todo.title.toLocaleLowerCase().includes(state.search.toLowerCase())
      );
    },
  },

  actions: {
    async fetchTodos() {
      this.loading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        const limitedData = data.slice(0, 5);

        // Update todos state dengan data terbatas
        this.todos = limitedData;

        if (this.todos.length > 0) {
          this.isOnBoarding = true;
        }
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addTodo(newTodo: any) {
      this.loading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
          }
        );
        if (response.ok) {
          this.success = true;
        }

        this.todos.push(newTodo);
        this.isSelectedItem = newTodo;

        this.success = false;
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
        this.isSelectedItem = newTodo;
        this.isNewTodo = false;
      }
    },

    async updateTodo(updatedTodo: ITodo) {
      this.loading = true;
      console.log(updatedTodo);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
          }
        );

        if (response.ok) {
          const index = this.todos.findIndex(
            (todo) => todo.id === updatedTodo.id
          );
          console.log(index);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
        } else {
          throw new Error("Failed to update todo");
        }
        this.isSelectedItem = updatedTodo;
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async removeTodo(todoId: string) {
      this.loading = true;
      try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
          method: "DELETE",
        });
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
        this.isOnBoarding = true;
        this.isSelectedItem = undefined;
      }
    },

    setSearch(query: string) {
      this.search = query;
    },

    setShowEditor(value: boolean) {
      this.showEditor = value;
      localStorage.setItem("showEditor", JSON.stringify(value));
    },

    setSelectedItem(todo: ITodo | undefined) {
      this.isSelectedItem = todo;
      this.isNewTodo = false;
      this.isOnBoarding = false;
    },

    setNewTodo(value: boolean) {
      this.isNewTodo = value;
      this.isSelectedItem = undefined;
      this.isOnBoarding = false;
    },
  },
});
