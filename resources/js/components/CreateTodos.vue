<template>
    <div>
        <h3 class="text-center">Create Todo</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addTodo">
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="todo.name"
                        />
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" v-model="todo.category">
                            <option value="New">New</option>
                            <option value="Inporgress">Inporgress</option>
                            <option value="QA">QA</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="date"
                            class="form-control"
                            v-model="todo.start_date"
                        />
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="date"
                            class="form-control"
                            v-model="todo.end_date"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Create
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todo: {}
        };
    },
    methods: {
        addTodo() {
            this.axios
                .post("http://localhost:8000/api/todos", this.todo)
                .then(response => this.$router.push({ name: "Todos" }))
                .catch(err => console.log(err))
                .finally(() => (this.loading = false));
        }
    }
};
</script>
