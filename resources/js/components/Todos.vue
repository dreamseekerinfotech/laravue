<template>
    <div>
        <h2 class="text-center">Todos List</h2>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in todos" :key="todo.id">
                    <td>{{ todo.id }}</td>
                    <td>{{ todo.name }}</td>
                    <td>{{ todo.category }}</td>
                    <td>{{ todo.start_date }}</td>
                    <td>{{ todo.end_date }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link
                                :to="{
                                    name: 'EditTodos',
                                    params: { id: todo.id }
                                }"
                                class="btn btn-success"
                                >Edit</router-link
                            >
                            <button
                                class="btn btn-danger"
                                @click="deletetodo(todo.id)"
                            >
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: []
        };
    },
    created() {
        this.axios.get("http://localhost:8000/api/todos/").then(response => {
            this.todos = response.data;
        });
    },
    methods: {
        deletetodo(id) {
            this.axios
                .delete(`http://localhost:8000/api/todos/${id}`)
                .then(response => {
                    let i = this.todos.map(data => data.id).indexOf(id);
                    this.todos.splice(i, 1);
                });
        }
    }
};
</script>
