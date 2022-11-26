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
                <!-- HEADER HISTORY -->
                <header class="page-header page-header-dark bg-dark pb-10">
                    <div class="container-xl px-4">
                        <div class="page-header-content pt-4">
                            <div class="row align-items-center justify-content-between">
                                <div class="col-auto mt-4">
                                    <h1 class="page-header-title">
                                        <div class="page-header-icon"><i data-feather="filter"></i></div>
                                        History
                                    </h1>
                                    <div class="page-header-subtitle">This history page of any changes in this website</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <!-- HEADER HISTORY END -->
        
                <!-- HISTORY TABLE -->
                <div class="container-xl px-4 mt-n10">
        
                    <!-- HISTORY TABLE -->
                    <div class="card mb-4">
                        <div class="card-body">
                            <table id="datatablesSimple">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Updated By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(log, i) in logs" :key="log.id" >
                                        <td> {{ i + 1 }} </td>
                                        <td> {{log.name}} </td>
                                        <td> {{log.description}} </td>
                                        <td> {{log.updatedBy}} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- HISTORY TABLE END -->
        
                </div>
                <!-- HISTORY TABLE END -->
            </main>
            <!-- MAIN CONTENT END -->
    
            <!-- FOOTER -->
            <FooterBar/>
    
        </div>
        <!-- HISTORY & SIDENAV CONTENT END -->
    </div>
    

</template>
    
    
<script>
    import FooterBar from './FooterBar.vue';
    import HeaderBar from "./HeaderBar.vue";
    import SideNav from "./sidenav.vue";
    
    export default {
        name : "Logs",
        props : [ "logs" ],
        components : { FooterBar, HeaderBar, SideNav },
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