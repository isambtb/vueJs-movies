<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="movie.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="movie.description"
          name="description"
        />
      </div>

      <button @click="saveMovie" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMovie">Add</button>
    </div>
  </div>
</template>

<script>
import MovieService from "../service/movieService";

export default {
  name: "add-movie",
  data() {
    return {
      movie: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveMovie() {
      var data = {
        title: this.movie.title,
        description: this.movie.description,
      };

      MovieService.create(data)
        .then((response) => {
          this.movie.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newMovie() {
      this.submitted = false;
      this.movie = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>