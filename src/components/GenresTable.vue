<template>
    <!-- HEADER -->
    <HeaderBar/>

    <div id="layoutSidenav">
        
        <!-- SIDENAV -->
        <SideNav
            @changePage="changePage"
            @logoutHandler="logoutHandler"
        />

        <!-- SIDE MAIN CONTENT -->
        <div id="layoutSidenav_content">
        <!-- MAIN CONTENT -->
        <main>
            <!-- HEADER GENRE -->
            <header class="page-header page-header-dark bg-dark pb-10">
                <div class="container-xl px-4">
                    <div class="page-header-content pt-4">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto mt-4">
                                <h1 class="page-header-title">
                                    <div class="page-header-icon"><i data-feather="filter"></i></div>
                                    Genres
                                </h1>
                                <div class="page-header-subtitle">This is the movie genres big data's where you can find the most popular movie genre in the world.</div>
                            </div>

                            <!-- ADD GENRE BUTTON -->
                            <div class="col-12 col-xl-auto mb-3">
                                <a class="btn btn-sm btn-light text-dark"
                                    @click="changePage('add-genre')"
                                >
                                    <i class="me-1" data-feather="plus"></i>
                                    ADD GENRE
                                </a>
                            </div>
                            <!-- ADD GENRE BUTTON END -->


                        </div>
                    </div>
                </div>
            </header>
            <!-- HEADER GENRE END -->
    
            <!-- GENRE TABLE -->
            <div class="container-xl px-4 mt-n10">
    
                <!-- GENRE TABLE -->
                <div class="card mb-4">
                    <div class="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Genre</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(genre, i) in genres" :key="genre.id">
                                    <td> {{ i + 1 }} </td>
                                    <td> {{ genre.name }} </td>

                                    <!-- DELETE BUTTON -->
                                    <td>
                                        <a @click.prevent="deleteGenreHandler(genre.id, genre.name)">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </td>
                                    <!-- DELETE BUTTON END -->

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- GENRE TABLE END -->
    
            </div>
            <!-- GENRE TABLE END -->
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
    import HeaderBar from "./HeaderBar.vue";
    import SideNav from "./sidenav.vue";
    
    export default {
        name : "Genres Page",
        props : [ "genres" ],
        emits : ['changePage', 'logoutHandler'],
        components : { FooterBar, HeaderBar, SideNav },
        methods: {
            changePage(page) {
                this.$emit('changePage', page)
            },
            logoutHandler() {
                this.$emit('logoutHandler')
            },
            deleteGenreHandler(id, name){
              this.$emit('deleteGenreHandler', id, name)
            }
        },
    }
</script>