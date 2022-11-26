<template>
    <!-- LOGIN PAGE SCOPE  -->
    <div id="layoutAuthentication" class="bg-dark">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container-xl px-4">
                    <div class="row justify-content-center">
                        <div class="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                            <!-- Social login form-->
                            <div class="card my-5">
                                <div class="card-body p-5 text-center">
                                    <div class="h3 fw-light mb-3">Sign In : </div>

                                    <!-- <div class="btn btn-icon btn-google mx-1" id="buttonDiv">
                                        <i class="fab fa-google fa-fw fa-sm"></i>
                                    </div> -->

                                    <!-- GOOGLE LOGIN -->
                                    <div id="buttonDiv">
                                    </div>
                                    <!-- GOOGLE LOGIN END -->
                                </div>
                                <hr class="my-0" />
                                <div class="card-body p-5">
                                    <!-- Login form-->
                                    <form @submit.prevent="login">
                                            
                                        <!-- Form Group (email address)-->
                                            <div class="mb-3">
                                                <label class="text-gray-600 small" for="emailExample">Email address</label>
                                                <input class="form-control form-control-solid" type="text" aria-label="Email Address" aria-describedby="emailExample"
                                                    v-model="Credential.email"
                                                />
                                            </div>

                                            <!-- Form Group (password)-->
                                            <div class="mb-3">
                                                <label class="text-gray-600 small" for="passwordExample">Password</label>
                                                <input class="form-control form-control-solid" type="password" placeholder="" aria-label="Password" aria-describedby="passwordExample"
                                                    v-model="Credential.password"
                                                />
                                            </div>

                                            <!-- SUBMIT BUTTON -->
                                            <div class="d-flex align-items-center justify-content-between mb-0">
                                                <input class="btn btn-dark" type="submit" value="Login">
                                            </div>
                                        </form>

                                        <!-- LOGIN FORM END -->
                                    </div>
                                    <hr class="my-0" />
                                    <div class="card-body px-5 py-4">
                                        <div class="small text-center text-dark">
                                            New user?
                                            <a href="#" style="color: red;"
                                                @click.prevent="changePage('register')"
                                            >Create an account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <!-- FOOTER -->
            <FooterBar/>
    
    </div>
    <!-- LOGIN PAGE SCOPE END -->
</template>

<script>
    import FooterBar from './FooterBar.vue';

    export default {
        name : "Login Page",
        emits : [ 'loginPageHandle', 'changePage' ],
        components: { FooterBar },
        data() {
            return {
                Credential : {
                    email : "",
                    password : "",
                }
            }
        },
        methods : {
            login() {
                this.$emit('loginPageHandle', this.Credential)
            },
            changePage(page) {
               this.$emit('changePage', page) 
            }
        }
        
    }
</script>