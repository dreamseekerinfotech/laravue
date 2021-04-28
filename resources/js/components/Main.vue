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
