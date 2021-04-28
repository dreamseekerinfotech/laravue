# How to Build Laravel 8 and vue App

Hello Everyone, Today we will learn how to intigrate vue into laravel. for this we will perform one crud oparations and I will explain you how and what libraries required to intigrate vue into laravel.

Let's start with our tutorial

1st step: Install laravel and setup database

We will create ToDos application in which option to add /update/ delete / Get Todos. first of all create on laravel project by following command

composer create-project laravel/laravel laravue

next create database and connect with laravel application by adding following code in .env file

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravue
DB_USERNAME=root
DB_PASSWORD=123456

next migrate database using following command

php artisan migrate

image migration1.png

2nd step: create new model and migration for Todos

after basic setup create Todos model and migration file by following comand

php artisan make:model Todos -m

image makemigration.png

edit migration file and add fields which we need to create Todos

edit following file
database\migrations\2021_04_28_131922_create_todos_table.php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
}


now edit model file 
app\Models\Todos.php

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'category',
        'start_date',
        'end_date'
    ];   
}

let's migrate our new files

image migrate2.png

3rd step: create controller file

we are create controller file with name "TodosContoller". here we are useing --resorce option in because it will create all function related to crud, you can create plain controller file and create all function individually.

php artisan make:controller TodosController --resource

following is controller file and i made changes into it please check

path: app\Http\Controllers\TodosController.php

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todos;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todos::all()->toArray();
        return array_reverse($todos);    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $todo = new Todos([
            'name' => $request->input('name'),
            'category' => $request->input('category'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ]);
        $todo->save();

        return response()->json('Todo created!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $todo = Todos::find($id);
        return response()->json($todo);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $todo = Todos::find($id);
        return response()->json($todo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $todos = Todos::find($id);
        $todos->update($request->all());

        return response()->json('Todo updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todo = Todos::find($id);
        $todo->delete();

        return response()->json('Todo deleted!');
    }
}


let's add api router into our api.pnp file 

use App\Http\Controllers\TodosController;

Route::resource('todos', TodosController::class);

we need to redirect all our urls to only one file where we initialised our vue project for that need to add following command in to web.php route file

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');

now let's check out our backend works perfectly 

image gettodosapipostman.png

image todocreateapicheck.png

So thats it for out backend, our backend works perfectly and now move towards our frontend.

4th step: setup vue and install nececery dependencies

first of all run following composer command to install vue ui into our project

composer require laravel/ui

php artisan ui vue

install node dependeny by following command

npm install

now let's install other dependencies which we require foe api call and routing.
 
npm install vue-router vue-axios

5th step : create vue app
first of all we need to initialise out vue app for that we need to add our js file and css file app.js and app.css in out app.blade.php file add add root div for vue app. 

so out app.blade.php file code is ass below

<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" value="{{ csrf_token() }}" />

    <title>Your Todos App</title>

    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
</head>

<body>
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>

</html>

lets create router.js file into our js folder

resources\js\router.js

import Todos from './components/Todos.vue';
import CreateTodos from './components/CreateTodos.vue';
import EditTodos from './components/EditTodos.vue';
 
export const routes = [
    {
        name: 'Todos',
        path: '/',
        component: Todos
    },
    {
        name: 'CreateTodos',
        path: '/create',
        component: CreateTodos
    },
    {
        name: 'EditTodos',
        path: '/edit/:id',
        component: EditTodos
    }
];


create four new components files

1. app.js
2. Main.vue
3. Todos.vue
4. CreateTodos.vue
5. EditTodos.vue

let's configure vuejs's main file which is app.js 
resources\js\app.js

require("./bootstrap");

window.Vue = require("vue").default;
import Main from "./components/Main.vue";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import axios from "axios";
import { routes } from "./router";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
    mode: "history",
    routes: routes
});

const app = new Vue({
    el: "#app",
    router: router,
    render: h => h(Main)
});


let's edit first file  Main.vue
resources\js\components\Main.vue

<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link"
                        >Todos</router-link
                    >
                    <router-link to="/create" class="nav-item nav-link"
                        >Create Todo</router-link
                    >
                </div>
            </div>
        </nav>

        <router-view> </router-view>
    </div>
</template>

<script>
export default {};
</script>

edit Todos.vue file
resources\js\components\Todos.vue

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

now add following code into CreateTodos.vue file
resources\js\components\CreateTodos.vue

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

at last let's change EditTodos.vue file
resources\js\components\EditTodos.vue

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


image todoslist.png
image createtodo.png
image edittodo.png

That's it for this tutorial. today we learnd how to setup laravel vue project and how you can make you beautiful SPA site(Single Page Application)

If you have any query hit me on my social media or you can mail me on learning@dreamseekerinfotech.com
