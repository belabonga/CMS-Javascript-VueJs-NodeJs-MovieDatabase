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
            <main>
                <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                    <div class="container-fluid px-4">
                        <div class="page-header-content">
                            <div class="row align-items-center justify-content-between pt-3">
                                <div class="col-auto mb-3">
                                    <h1 class="page-header-title">
                                        <div class="page-header-icon"><i data-feather="file-plus"></i></div>
                                        Create Movie
                                    </h1>
                                </div>
                                <div class="col-12 col-xl-auto mb-3">
                                    <a class="btn btn-sm btn-light text-dark" href="blog-management-posts-list.html">
                                        <i class="me-1" data-feather="arrow-left"></i>
                                        Back to All Movie
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <!-- Main page content-->
                <div class="container-fluid px-4">

                    <!-- FORM CREATE NEW MOVIE -->
                    <div class="row gx-4">

                        <!-- FORM -->
                        <form @submit.prevent="createMovie">

                        <!-- TITLE -->
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-header text-dark">Title</div>
                                <div class="card-body">
                                    <input class="form-control" id="title-create-from" type="text" placeholder="Enter movie title..."
                                        v-model="NewMovieValue.title"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- SYNOPSIS -->
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-header text-dark">Synopsis</div>
                                <div class="card-body">
                                    <input class="form-control" id="synopsis-create-from" type="text" placeholder="Enter synopsis..."
                                        v-model="NewMovieValue.synopsis"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- TRAILER URL -->
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-header text-dark">Trailer URL</div>
                                <div class="card-body">
                                    <input class="form-control" id="trailer-url-create-from" type="text" placeholder="Enter trailer url..."
                                        v-model="NewMovieValue.trailerUrl"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- IMAGE URL -->
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-header text-dark">Image Url</div>
                                <div class="card-body">
                                    <input class="form-control" id="img-url-create-from" type="text" placeholder="Enter movie image..."
                                        v-model="NewMovieValue.imgUrl"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- FORM RATING -->
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-header text-dark">Rating</div>
                                <div class="card-body">
                                    <select class="form-select" aria-label="Default select example"
                                        v-model="NewMovieValue.rating"
                                    >
                                        <option selected>Select Rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>                                        
                                </div>
                            </div>
                        </div>

                        <!-- FORM GENRE -->
                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <div class="card-header text-dark">Genre</div>
                                <div class="card-body">
                                    <select class="form-select" aria-label="Default select example"
                                        v-model="NewMovieValue.genreId"
                                    >
                                        <option selected >Select Rating</option>
                                        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                                            {{ genre.name }}
                                        </option>
                                    </select>                                        
                                </div>
                            </div>
                        </div>
                        
                        <!-- SUBMIT -->
                        <div class="col-lg-4">
                            <div class="card card-header-actions">
                                <div class="card-header text-dark">
                                    Publish
                                    <i class="text-muted" data-feather="info" data-bs-toggle="tooltip" data-bs-placement="left"></i>
                                </div>
                                <div class="card-body">
                                    <div class="d-grid">
                                        <button class="fw-500 btn btn-dark" type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </form>
                        <!-- FORM END -->

                    </div>
                    <!-- FORM CREATE NEW MOVIE END -->

                </div>
            </main>
            <!-- FOOTER HERE -->
            <FooterBar/>
        </div>
        <!-- SIDE MAIN CONTENT END -->
    </div>


</template>

<script>
    import FooterBar from './FooterBar.vue';
    import HeaderBar from "./HeaderBar.vue";
    import SideNav from './SideNav.vue';
    
    export default {
        name : "Create/Edit Movie Page",
        props : [ 'genres', "pageHome", "singleMovie" ],
        emits : [ 'createMovieHandler', 'changePage', "editMovie", "logoutHandler" ],
        components: { FooterBar, SideNav, HeaderBar },
        data() {
            return {
                NewMovieValue: {
                    title : "",
                    synopsis : "",
                    trailerUrl : "",
                    imgUrl : "",
                    rating : "",
                    genreId : ""
                }
            }
        },
        methods: {
            changePage(page) {
                this.$emit('changePage', page)
            },
            createMovie() {
                if(this.pageHome === `add-movie`){
                    this.$emit('createMovieHandler', this.NewMovieValue)
                } else {
                    this.$emit('editMovie', this.NewMovieValue)
                }
            },
            logoutHandler() {
                this.$emit('logoutHandler')
            }
        },
        created(){
            if(this.pageHome  === `edit-movie`){
                this.NewMovieValue = this.singleMovie
            }else{
                this.NewMovieValue = {
                    title : "",
                    synopsis : "",
                    trailerUrl : "",
                    imgUrl : "",
                    rating : "",
                    genreId : ""
                }
            }
        }
    }
</script>