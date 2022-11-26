<template>
    <!-- DASHBOARD PAGE -->
    <!-- <DashboardVue
        v-if="pageHome === 'dashboard'"
        :totalMovie="totalMov"
        :totalGenre="totalGen"
      /> -->

      <!-- MOVIES PAGE -->
      <!-- <MoviesTableVue
        v-if="pageHome === 'moviesPage'"
        @moviesPageHandle="movies"
      /> -->


      <!-- GENRES PAGE -->
      <GenresTableVue
        v-if="pageHome === 'genresPage'"
        @genrePageHandle="genres"
      />

      <!-- HISTORY PAGE -->
      <HistoryPageVue
        v-if="pageHome === 'historyPage'"
        @historyPageHandle="histories"
        :logs="logs"
      />


      <!-- CREATE NEW GENRES PAGE -->
      <EditCreateGenrePageVue
        v-if="pageHome === 'formGenre'"
        @formGenrePageHandle="formGenre"
      />


      <!-- CREATE NEW MOVIE PAGE -->
      <EditCreateMoviePageVue
        v-if="pageHome === 'formMovie'"
        @formMoviePageHandle="formMovie"
      />
</template>

<script>
  import DashboardVue from "../components/dashboard.vue";
  import MoviesTableVue from "../components/MoviesTable.vue";
  import GenresTableVue from "../components/GenresTable.vue";
  import EditCreateGenrePageVue from "../components/EditCreateGenrePage.vue";
  import EditCreateMoviePageVue from "../components/EditCreateMoviePage.vue";
  import HistoryPageVue from "../components/HistoryPage.vue";

  export default {
    name : "Home Page",
    props : [
      "logs",
      "genres",
      "totalMov",
      "totalGen",
      "movies",
    ],
    // emits : [
    //   moviesPageHandle,
    //   genrePageHandle,
    //   historyPageHandle,
    //   formMoviePageHandle,
    //   formGenrePageHandle
    // ],
    data() {
      return {
        pageHome: "dashboard"
      }
    },
    components : {
          DashboardVue,
          MoviesTableVue,
          GenresTableVue,
          EditCreateGenrePageVue,
          EditCreateMoviePageVue,
          HistoryPageVue,
    },
    methods : {
      dashboard() {
        this.$emit('dashboardPageHandle')
      },

      movies() {
        this.$emit('moviesPageHandle')
      },

      genres(){
        this.$emit('genrePageHandle')
      },

      histories(){
        this.$emit('historyPageHandle')
      },

      // FORM ONLY
      formMovie(){
        this.$emit('formMoviePageHandle')
      },

      formGenre(){
        this.$emit('formGenrePageHandle')
      }


    }
  }
</script>