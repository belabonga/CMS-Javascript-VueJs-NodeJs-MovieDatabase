<template>

    <!-- HEADER -->
    <HeaderBar/>

    <!-- MAIN -->
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
                                        Create Genre
                                    </h1>
                                </div>
                                <div class="col-12 col-xl-auto mb-3">
                                    <a class="btn btn-sm btn-light text-dark" href="blog-management-posts-list.html">
                                        <i class="me-1" data-feather="arrow-left"></i>
                                        Back to All Genre
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <!-- Main page content-->
                <div class="container-fluid px-4">
                    <div class="row gx-4">

                        <!-- FORM -->
                            <form @submit.prevent="createGenre">

                            <!-- FORM GENRE NAME -->
                            <div class="col-lg-8">
                                <div class="card mb-4">
                                    <div class="card-header text-dark">Genre Name</div>
                                    <div class="card-body">
                                        <input class="form-control" type="text" placeholder="Enter your genre name..."
                                            v-model="name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- BUTTON FORM -->
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
                </div>
            </main>

            <!-- FOOTER  -->
            <FooterBar/>

        </div>
        <!-- SIDE MAIN CONTENT END -->
        
    </div>
    <!-- MAIN -->

</template>

<script>
    import FooterBar from './FooterBar.vue';
    import SideNav from './sidenav.vue';
    import HeaderBar from './HeaderBar.vue';
    
    export default {
        name : "Form Genre",
        emits : [ 'createGenreHandler', 'changePage', 'logoutHandler' ],
        components: { FooterBar, SideNav, HeaderBar },
        data() {
            return {
                name: ""
            }
        },
        methods: {
            changePage(page) {
                this.$emit('changePage', page)
            },
            createGenre() {
                this.$emit('createGenreHandler', this.name)
            },
            logoutHandler() {
                this.$emit('logoutHandler')
            }
        },
    }
</script>