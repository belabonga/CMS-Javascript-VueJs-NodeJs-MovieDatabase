<style>
  @import "./assets/bootstrap/css/main.css";
</style>

<template>
  
  <!-- LOGIN PAGE --> 
  <LoginPage
    v-if="page === `login` && !isLoggedIn"
    @loginPageHandle="login"
    @changePage="changePage"
  />
  
  <!-- REGISTER PAGE -->
  <RegisterPage
    v-if="page === 'register' && !isLoggedIn"
    @registerPageHandle="register"
    @changePage="changePage"
  />
  
  <!-- HOME PAGE -->
  <HomePage2
  v-if = "page === 'home' && isLoggedIn"
    :genres="genres"
    :movies="movies"

    :totalGen="genres.length"
    :totalMov="movies.length"

    @LogsPageHandle="logsData"
    :logs = "logs"

    @createMovieHandler="createMovie"
    @createGenreHandler="createGenre"

    @changePage="changePage"

    @logoutHandler="logout"

    @changeStatus="changeStatus"
    @deleteGenreHandler="deleteGenre"

    @fetchEdit="fetchEdit"
    :singleMovie="singleMovie"
    @editMovie="editMovie"
  />

</template>

<script>
  
  import LoginPage from "./components/LoginPage.vue";
  import RegisterPage from "./components/RegisterPage.vue";
  import HomePage2 from "./pages/HomePage2.vue"
  import Swal from 'sweetalert2'
  import axios from "axios"
  
  // const baseUrl ="https://morning-plains-86824.herokuapp.com"
  const baseUrl = "http://localhost:3000"
  
  export default {
        components : { HomePage2, LoginPage, RegisterPage },
        data() {
            return {
              isLoggedIn : false,
              genres : [],
              movies : [],
              logs : [],
              page : 'login',
              username : '',
              id: 0,
              singleMovie: {}
            }
        },
        // GOOGLE SIGNIN MOUNTED
        mounted(){
          const cb = this.handleCredentialResponse
          window.onload = function () {
              google.accounts.id.initialize({
                client_id: "122934776884-msf8kh9unl5t3f99bkeav7gvm8l0lgii.apps.googleusercontent.com",
                callback: cb
              });
              google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
              );
              google.accounts.id.prompt(); // also display the One Tap dialog
          }
        },
        methods : {

          // HANDLE GOOGLE SIGN IN
          async handleCredentialResponse(response) {
              axios({
                  url : `${baseUrl}/google-signin`,
                  method : "POST",
                  data : {
                      access_token : response.credential
                  }
              })

              .then((res) => {
                  console.log(res);
                  localStorage.setItem("access_token", res.data.access_token);

                  // FETCH ALL DATAS
                  this.moviesData()
                  this.genresData()
                  this.logsData()

                  // SET LOGIN TRUE
                  this.isLoggedIn = true

                  // REDIRECT HOME PAGE
                  this.changePage(`home`)

                  // SWAL                  
                  Swal.fire({
                      icon: 'success',
                      title: 'Success Logged in!',
                      text :
                      // "Welcome Back ${res.data.username} !",
                      `Welcome back !`,
                      showConfirmButton: false,
                      timer: 1500
                  })
              })
              .catch((error) => {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops!',
                      text: error.responseJSON.message,
                      confirmButtonText: 'Try Again',
                  })
              })
            },

          // CHANGE PAGE
          changePage(page) {
            this.page = page
          },

          // LOGGING OUT
          logout() {
            // SWAL
            Swal.fire({
              title: 'Are you sure you want to logout?',
              text: "Confirm and logout",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Logout'
            })
            
            .then((result) => {
              if (result.isConfirmed) {

                // CLEARING TOKEN
                localStorage.clear()

                // SET LOGGED OUT
                this.isLoggedIn = false

                // SWAL
                Swal.fire(
                  'Logged out!',
                  'See you later :)',
                  'success'
                )

                // REDIRECT TO LOGIN PAGE
                this.changePage('login')
                this.login()
              }
            })
          },
          
          // LOGIN
          async login(credential) {
            try {
              // HIT ENDPOINT
              const response = await axios.post(`${baseUrl}/login`, {
                email : credential.email,
                password : credential.password,
              })
              
              // VAR TOKEN
              const token = response.data.access_token
              
              // VAR USERNAME
              const username = response.data.username
              this.username = username
              
              // LOCAL STORAGE SET ACCESS TOKEN 
              localStorage.setItem("access_token", token)
              
              // SET LOGGED IN
              this.isLoggedIn = true
              
              // CHANGE PAGE
              this.changePage(`home`)

              // FETCH ALL DATAS
              this.moviesData()
              this.genresData()
              this.logsData()
              
              // ALERT
              Swal.fire(
                'Horray!',
                `Welcome back, ${username} ! `,
                'success'
                )
                
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message
                })
              }
          },

          // REGISTER
          async register(credential) {
            try {
              const req = await axios.post(`${baseUrl}/register`, {
                username : credential.username,
                email : credential.email,
                password : credential.password,
                phoneNumber : credential.phoneNumber,
                address: credential.address
              })
              
              // SET LOGGED IN
              this.isLoggedIn = false
              
              // CHANGE PAGE
              this.changePage('login')
              
              // SWAL
              Swal.fire(
                'Horray!',
                `You registered ! `,
                'success'
                )
                
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message
                })
              }
            },
            
          // MOVIES TABLE
          async moviesData(){
              try {
                const movies = await axios.get(`${baseUrl}/movie`, {
                  headers : { access_token : localStorage.getItem("access_token") }
                })
                
                // PASSING DATAS
                this.movies = movies.data.movies
                
              } catch (error) {
                console.log(error)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message
                })
              }
          },
            
          // CHANGE STATUS IN MOVIES TABLE
          async changeStatus(status, id){
            try {
              const newStatus = await axios.patch(`${baseUrl}/movie/${id}`, {
                status, 
              }, {
                headers : { access_token : localStorage.getItem("access_token") }
              })

              this.moviesData()
              this.logsData()

              // SWAL
              Swal.fire(
                'Horray!',
                `Success changed status !`,
                'success'
              )

            } catch (error) {
              console.log(error)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message
                })
            }
          },

          // FIND ONE MOVIE FOR EDIT
          async fetchEdit(id, changePage){
            try {
              // ASSIGN ID
              this.id = id

              // AXIOS
              const singleMovie = await axios.get(`${baseUrl}/movie/${id}`, {
                headers : { access_token : localStorage.getItem("access_token") }
              })

              // PAYLOAD(S)
              this.singleMovie = singleMovie.data.movies

              // REDIRECT TO EDIT / CREATE PAGE
              changePage('edit-movie')

            } catch (error) {
              console.log(error);
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message
              })
            }
          },

          // EDIT MOVIE
          async editMovie(NewMovieValue, changePage){
            try {
              const edited = await axios.put(`${baseUrl}/movie/${this.id}`,{
                title : NewMovieValue.title,
                synopsis : NewMovieValue.synopsis,
                trailerUrl : NewMovieValue.trailerUrl,
                imgUrl : NewMovieValue.imgUrl,
                rating : NewMovieValue.rating,
                genreId : NewMovieValue.genreId
              }, {
                headers : { access_token : localStorage.getItem("access_token") }
              })

              // SWAL
              Swal.fire(
                'Horray!',
                `Success edit movie !`,
                'success'
              )

              // FETCH MOVIES DATA
              this.moviesData()

              // REDIRECT
              changePage('movies')

            } catch (error) {
              console.log(error);
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message
              })
            }
          },

          // DELETE MOVIE
          async deleteGenre(id, name){
            // CONFIRMATION ALERT
            Swal.fire({
              title: `Are you sure you want to delete genre ${name}?`,
              text: "Confirm and delete",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Delete'
            })
            
            .then( async (result) => {
              if (result.isConfirmed) {
                await axios.delete(`${baseUrl}/genre/${id}`, {
                  headers : { access_token : localStorage.getItem("access_token") }
                })

                // SUCCEED ALERT
                Swal.fire(
                  `Succeed`,
                  `Genre ${name} succesfully deleted`,
                  'success'
                )

                // RE-FETCH GENRE DATA 
                this.genresData()

              }
            })
          },

          // GENRE TABLE
          async genresData(){
            try {
              const genres = await axios.get(`${baseUrl}/genre`, {
                headers : { access_token : localStorage.getItem("access_token") }
              })

              // PASSING DATAS
              this.genres = genres.data.genres

            } catch (error) {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              })
            }
          },

          // LOGS TABLE
          async logsData(){
            try {
              const logs = await axios.get(`${baseUrl}/logs`, {
                headers : { access_token : localStorage.getItem("access_token") }
              })

              // PASSING DATAS
            
              this.logs = logs.data.logs

            } catch (error) {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              })
            }
          },
          
          // CREATE NEW MOVIE
          async createMovie(NewMovieValue) {
            try {
              const response = await axios.post(`${baseUrl}/movie`, {
                title : NewMovieValue.title,
                synopsis : NewMovieValue.synopsis,
                trailerUrl : NewMovieValue.trailerUrl,
                imgUrl : NewMovieValue.imgUrl,
                rating : NewMovieValue.rating,
                genreId : NewMovieValue.genreId
              }, {
                headers : { access_token : localStorage.getItem("access_token") }
              })
              
              // REDIRECT TO MOVIES PAGE
              this.changePage('home')

              // FETCH MOVIES DATA
              this.moviesData()

              // SWAL
              Swal.fire(
                'Horray!',
                `Successfully adding new movie ! `,
                'success'
              )

            } catch (error) {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              })
            }
          },

          // CREATE NEW GENRE
          async createGenre(name) {
            try {
              const response = await axios.post(`${baseUrl}/genre`, {
                name
              }, {
                headers : { access_token : localStorage.getItem("access_token") }
              })

              // ALERT
              Swal.fire(
                'Horray!',
                `Success create genre ${name} !`,
                'success'
              )

              // FETCH GENRE DATA
              this.genresData()
              
              // REDIRECT TO HOME PAGE
              this.changePage('home')

            } catch (error) {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              })
            }
          }

        },
        created(){
          if(localStorage.getItem('access_token')){
            this.page = `home`
            this.isLoggedIn = true
            this.moviesData()
            this.genresData()
            this.logsData()
          }
        }     
    }

</script>