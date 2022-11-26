<template>
    <tr >
      <td><img :src="movie.imgUrl" style="width: 150px" /></td>
      <td>{{ movie.title }}</td>
      <td>{{ movie.Author.username }}</td>
      <td>{{ movie.synopsis }}</td>
      <td>{{ movie.genre }}</td>
      <td>{{ movie.trailer }}</td>
      <td>
        <div class="dropdown">
          <button
            class="btn btn-xs btn-dark dropdown-toggle"
            id="dropdownFadeInUp"
            type="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ movie.status }}
          </button>

          <!-- DROPDOWN STATUS -->
          <select
            class="dropdown-menu animated--fade-in-up"
            aria-labelledby="dropdownFadeInUp"
            v-model="status"
            @change="changeStatus(movie.id)"
          >
            <option class="dropdown-item" :selected="movie.status === `Active`"  value="Active">Active</option>
            <option class="dropdown-item" :selected="movie.status === `Archived`"  value="Archived">Archived</option>
            <option class="dropdown-item" :selected="movie.status === `Inactive`"  value="Inactive">Inactive</option>
          </select>
        </div>
      </td>
      <!-- <td><div class="badge bg-primary text-white rounded-pill">Full-time</div></td> -->
      <!-- EDIT BUTTON -->
      <td>
        <a @click.prevent="fetchEdit(movie.id)">
          <i class="fa-solid fa-pen-to-square"></i>
        </a>
      </td>
      <!-- EDIT BUTTON END -->
    </tr>
  </template>
  
  <script>
      export default {
          name : "Movies Table",
          props : [ "movie" ],
          emits : [ 'changeStatus', 'fetchEdit', 'deleteMovie' ],
          data() {
              return {
                  status: ""
              }
          },
          methods : {
            changeStatus(id){
              this.$emit('changeStatus', this.status, id)
            },
            fetchEdit(id){
              this.$emit('fetchEdit', id)
            }
          }
      }
  </script>
  