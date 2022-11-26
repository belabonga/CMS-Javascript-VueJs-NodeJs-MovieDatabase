<template>

<!-- HEADER -->
<HeaderBar/>

<div id="layoutSidenav">

    <!-- SIDENAV -->
    <SideNav
        @changePage="changePage"
        @logoutHandler="logoutHandler"

        :username="username"
    />

    <!-- SIDE MAIN CONTENT -->
    <div id="layoutSidenav_content">
        <main>
            <header class="page-header page-header-dark bg-dark pb-10">
                <div class="container-xl px-4">
                    <div class="page-header-content pt-4">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto mt-4">
                                <h1 class="page-header-title">
                                    <div class="page-header-icon"><i data-feather="activity"></i></div>
                                    Dashboard
                                </h1>
                                <div class="page-header-subtitle">Overview and content summary</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- Main page content-->
            <div class="container-xl px-4 mt-n10">
                <div class="row">
                    <div class="col-xxl-4 col-xl-12 mb-4">
                        <div class="card h-100">
                            <div class="card-body h-100 p-5">
                                <div class="row align-items-center">
                                    <div class="col-xl-8 col-xxl-12">
                                        <div class="text-center text-xl-start text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
                                            <h1 class="text-dark">Welcome to Movie Database!</h1>
                                            <p class="text-gray-700 mb-0">Movie Database is the world's most popular and authoritative source for movie content. Find ratings for the latest and most popular movie.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Example Colored Cards for Dashboard Demo-->
                <div class="row">
                    <div class="col-lg-6 col-xl-3 mb-4">
                        <div class="card bg-dark text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="me-3">
                                        <div class="text-white-75 small">Total Movies</div>
                                        <div class="text-lg fw-bold"> {{ totalMovie }} </div>
                                    </div>
                                    <i class="feather-xl text-white-50" data-feather="calendar"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between small">
                                <a class="text-white stretched-link"
                                    @click.prevent="changePage(`movies`)"
                                >View Data</a>
                                <div class="text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-3 mb-4">
                        <div class="card bg-danger text-white h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="me-3">
                                        <div class="text-white-75 small">Total Genres</div>
                                        <div class="text-lg fw-bold"> {{ totalGenre }} </div>
                                    </div>
                                    <i class="feather-xl text-white-50" data-feather="dollar-sign"></i>
                                </div>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between small">
                                <a class="text-white stretched-link"
                                    @click.prevent="changePage(`genres`)"
                                >View Data</a>
                                <div class="text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- FOOTER -->
        <FooterBar/>
    </div>

</div>

</template>

<script>
    import FooterBar from './FooterBar.vue';
    import HeaderBar from "./HeaderBar.vue";
    import SideNav from "./sidenav.vue";

    export default {
        name : "Dashboard",
        props : [ "totalMovie", "totalGenre", "username" ],
        emits : [ 'changePage', 'logoutHandler'],
        components: { FooterBar, SideNav, HeaderBar },
        methods: {
            changePage(page) {
                this.$emit('changePage', page)
            }
        },
    }
</script>