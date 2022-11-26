<template>
    
    <!-- DASHBOARD -->
    <Dashboard
        v-if="pageHome === `dashboard`"

        @changePage="changePage"
        @logoutHandler="logoutHandler"

        :totalMovie="totalMov"
        :totalGenre="totalGen"
        :username="username"
    />
    <!-- DASHBOARD END -->               


    <!-- MOVIES TABLE -->
    <MoviesTablePage
        v-if="pageHome === `movies`"

        @changePage="changePage"
        @logoutHandler="logoutHandler"

        :movies="movies"
        @changeStatus="changeStatus"
        @fetchEdit="fetchEdit"

    />
    <!-- MOVIES TABLE END -->


    <!-- GENRE TABLE -->
    <GenresTable
        v-if="pageHome === `genres`"

        @changePage="changePage"
        @logoutHandler="logoutHandler"

        @deleteGenreHandler="deleteGenreHandler"

        :genres="genres"
    />
    <!-- GENRE TABLE END -->


    <!-- LOGS TABLE -->
    <HistoryPage
        v-if="pageHome === `logs`"

        @changePage="changePage"
        @logoutHandler="logoutHandler"

        :logs="logs"
    />
    <!-- LOGS TABLE END -->


    <!-- CREATE MOVIE -->
    <EditCreateMoviePage
        v-if="pageHome === `add-movie` || pageHome === `edit-movie`"

        @changePage="changePage"
        @logoutHandler="logoutHandler"

        @createMovieHandler="createMovieHandler"
        :pageHome="pageHome"
        :genres = "genres" 
        :singleMovie="singleMovie" 
        @editMovie="editMovie"
    />
    <!-- CREATE MOVIE END -->


    <!-- CREATE GENRE -->
    <EditCreateGenrePage
        v-if="pageHome === `add-genre`" 

        @changePage="changePage"
        @logoutHandler="logoutHandler"

        @createGenreHandler="createGenreHandler"
    />
    <!-- CREATE GENRE END -->

</template>

<script>
import Dashboard from '../components/dashboard.vue'
import MoviesTablePage from '../components/MoviesTablePage.vue'
import GenresTable from '../components/GenresTable.vue';
import HistoryPage from '../components/HistoryPage.vue';
import EditCreateMoviePage from '../components/EditCreateMoviePage.vue';
import EditCreateGenrePage from '../components/EditCreateGenrePage.vue';

export default {
name : "Home Page",
components : { Dashboard, MoviesTablePage, GenresTable, HistoryPage, EditCreateMoviePage, EditCreateGenrePage },
props : [ "logs", "genres", "totalMov", "totalGen", "movies", "singleMovie", "username" ],
emits : [ 'createMovieHandler', 'createGenreHandler', 'changeStatus', 'fetchEdit', 'editMovie', 'logoutHandler', 'deleteGenreHandler' ],
data() {
    return {
        pageHome: "dashboard"
    };
},
methods: {
    changePage(page) {
        this.pageHome = page
    },
    createMovieHandler(NewMovieValue) {
        this.$emit('createMovieHandler', NewMovieValue)
    },
    createGenreHandler(name) {
        this.$emit('createGenreHandler', name)
    },
    changeStatus(status, id){
        this.$emit('changeStatus', status, id)
    },
    fetchEdit(id){
        this.$emit('fetchEdit', id, this.changePage)
    },
    editMovie(NewMovieValue){
        this.$emit('editMovie', NewMovieValue, this.changePage)
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