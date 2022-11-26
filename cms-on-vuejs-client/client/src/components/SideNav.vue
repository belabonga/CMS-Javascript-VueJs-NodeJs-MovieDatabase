<!-- SIDENAV / SIDEBAR -->
<template>
    <!-- SIDE NAV -->
    <div id="layoutSidenav_nav">
                <nav class="sidenav shadow-right sidenav-dark">
                    <div class="sidenav-menu">
                        <div class="nav accordion" id="accordionSidenav">
                            <!-- Sidenav Menu Heading (Core)-->
                            <div class="sidenav-menu-heading">Core</div>

                            <!-- DASHBOARD -->
                            <a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseDashboards" aria-expanded="false" aria-controls="collapseDashboards"
                                @click.prevent="changePage(`dashboard`)"
                            >
                                <div class="nav-link-icon"><i data-feather="activity"></i></div>
                                Dashboard
                            </a>

                            <!-- Sidenav Heading (Custom)-->
                            <div class="sidenav-menu-heading">Data</div>

                            <!-- SIDENAV MOVIES -->
                            <a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts"
                                @click.prevent="changePage(`movies`)"
                            >
                            <div class="nav-link-icon"><i data-feather="layout"></i></div>
                            Movies
                            <div class="sidenav-collapse-arrow"></div>
                            </a>

                            <!-- SIDENAV GENRES -->
                            <a class="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages"
                                @click.prevent="changePage(`genres`)"
                            >
                                <div class="nav-link-icon"><i data-feather="grid"></i></div>
                                Genres
                            </a>

                            <!-- SIDENAV LOGS -->
                            <div class="sidenav-menu-heading">LOGS</div>
    
                            <!-- Sidenav Accordion (Components)-->
                            <a class="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseComponents" aria-expanded="false" aria-controls="collapseComponents"
                                @click.prevent="changePage(`logs`)"
                            >
                                <div class="nav-link-icon"><i data-feather="package"></i></div>
                                History
                            </a>

                            <!-- SIDENAV LOGS -->
                            <div class="sidenav-menu-heading">ACCOUNT</div>
    
                            <!-- Sidenav Accordion (Components)-->
                            <a class="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseComponents" aria-expanded="false" aria-controls="collapseComponents"
                                @click="logoutHandler"
                            >
                                <div class="nav-link-icon"><i data-feather="package"></i></div>
                                Logout
                            </a>
                    
                        </div>
                    </div>
                    
                    <!-- SIDENAV FOOTER - USER -->
                    <div class="sidenav-footer">
                        <div class="sidenav-footer-content">
                            <div class="sidenav-footer-subtitle">Logged in as:</div>
                            <div class="sidenav-footer-title"> {{ username }} </div>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- SIDE NAV END -->
</template>

<script>
    export default {
        name : "Sidebar",
        props : [ 'username' ],
        emits : [ 'changePage', 'logoutHandler' ],
        methods: {
            changePage(page) {
               this.$emit('changePage', page) 
            },
            logoutHandler() {
                this.$emit('logoutHandler')
            }
        },
    }
</script>