<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Movies List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(movie, index) in movies"
          :key="index"
          @click="setActiveMovie(movie, index)"
        >
          {{ movie.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllMovies">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentMovie">
        <h4>Movie</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentMovie.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentMovie.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentMovie.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/movies/' + currentMovie.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Movie...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MovieService from "../service/movieService";

export default {
  name: "movies-list",
  data() {
    return {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveMovies() {
      MovieService.getAll()
        .then(response => {
          this.movies = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveMovies();
      this.currentMovie = null;
      this.currentIndex = -1;
    },

    setActiveMovie(movie, index) {
      this.currentMovie = movie;
      this.currentIndex = movie ? index : -1;
    },

    removeAllMovies() {
      MovieService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      MovieService.findByTitle(this.title)
        .then(response => {
          this.movies = response.data;
          this.setActiveMovie(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveMovies();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>