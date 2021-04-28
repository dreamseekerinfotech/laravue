<template>
    <div>
        <h3 class="text-center">Edit Todo</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updatetodo">
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
                            type="datetime-local"
                            class="form-control"
                            v-model="todo.start_date"
                        />
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="datetime-local"
                            class="form-control"
                            v-model="todo.end_date"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Update
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
    created() {
        this.axios
            .get(`http://localhost:8000/api/todos/${this.$route.params.id}`)
            .then(res => {
                this.todo = res.data;
            });
    },
    methods: {
        updatetodo() {
            this.axios
                .patch(
                    `http://localhost:8000/api/todos/${this.$route.params.id}`,
                    this.todo
                )
                .then(res => {
                    this.$router.push({ name: "Todos" });
                });
        }
    }
};
</script>
