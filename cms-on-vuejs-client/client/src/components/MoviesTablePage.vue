<template>
    <!-- HEADER -->
    <HeaderBar/>

    <div id="layoutSidenav">
        <!-- SIDE NAV -->
        <SideNav
            @changePage="changePage"
            @logoutHandler="logoutHandler"
        />

        <!-- SIDE MAIN CONTENT -->
        <div id="layoutSidenav_content">
            <!-- MAIN CONTENT -->
            <main>
                <!-- MOVIES TABLES & HEADER -->
                <!-- HEADER MOVIES -->
                <header class="page-header page-header-dark bg-dark pb-10">
                    <div class="container-xl px-4">
                        <div class="page-header-content pt-4">
                            <div class="row align-items-center justify-content-between">
                                <div class="col-auto mt-4">
                                    <h1 class="page-header-title">
                                        <div class="page-header-icon"><i data-feather="filter"></i></div>
                                        Movies
                                    </h1>
                                    <div class="page-header-subtitle">This is the movies big data's where you can find the most popular movie in the world.</div>
                                </div>
                                <div class="col-12 col-xl-auto mb-3">
                                    <a class="btn btn-sm btn-light text-dark"
                                    @click="changePage('add-movie')"
                                    >
                                    <i class="me-1" data-feather="plus"></i>
                                    ADD MOVIE</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <!-- HEADER MOVIES END -->

                <!-- MOVIES TABLE -->
                <div class="container-xl px-4 mt-n10">

                    <!-- MOVIES TABLE -->
                    <div class="card mb-4">
                        <div class="card-body">
                            <table id="datatablesSimple">
                                <thead>
                                    <tr>
                                        <th>Cover Image</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Synopsis</th>
                                        <th>Genre</th>
                                        <th>Trailer</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- TABLE GOES HERE -->
                                    <MovieTable
                                        v-for="movie in movies" :key="movie.id"
                                        :movie="movie"
                                        @changeStatus="changeStatus"
                                        @fetchEdit="fetchEdit"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- MOVIES TABLE END -->

                </div>
                <!-- MOVIES TABLE END -->
                <!-- MOVIE TABLES & HEADER END -->
            </main>
            <!-- MAIN CONTENT END -->

            <!-- FOOTER -->
            <FooterBar/>

        </div>
        <!-- MOVIES & SIDENAV CONTENT END -->
    </div>
</template>


<script>
    import FooterBar from './FooterBar.vue';
    import SideNav from './SideNav.vue';
    import HeaderBar from './HeaderBar.vue';
    import MovieTable from './MovieTable.vue';
    
    export default {
        name : "Movies Page",
        props: ["movies"],
        components : { FooterBar, SideNav, HeaderBar, MovieTable },
        methods: {
            changePage(page) {
                this.$emit('changePage', page)
            },
            changeStatus(status, id) {
              this.$emit('changeStatus', status, id)
            },
            fetchEdit(id){
                this.$emit('fetchEdit', id)
            },
            logoutHandler() {
                this.$emit('logoutHandler')
            }
        },
        

    }
</script>