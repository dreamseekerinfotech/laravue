import Todos from "./components/Todos.vue";
import CreateTodos from "./components/CreateTodos.vue";
import EditTodos from "./components/EditTodos.vue";

export const routes = [
    {
        name: "Todos",
        path: "/",
        component: Todos
    },
    {
        name: "CreateTodos",
        path: "/create",
        component: CreateTodos
    },
    {
        name: "EditTodos",
        path: "/edit/:id",
        component: EditTodos
    }
];
