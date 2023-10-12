<template>
  <div class="contact-form-container">
    <div class="ui grid">
      <div class="ui ten wide computer column sixteen wide mobile column">
        <img
          class="ui large left floated image"
          src="/signup-img.png"
          alt="enter your email address to be the first to get notified of about new recipes"
        />
      </div>
      <div
        class="ui six wide computer column sixteen wide mobile column margin-auto mobile hidden"
      >
        <div class="ui input full-width">
          <input type="text" placeholder="Your email address" v-model="email" />
          <button
            :class="{ loading: isLoading, 'ui tbb button': true }"
            @click="getSubscribed()"
          >
            Be the first to know
          </button>
        </div>
      </div>
      <div class="sixteen wide mobile column mobile only">
        <div class="ui input full-width">
          <input type="text" placeholder="Your email address" v-model="email" />
        </div>
      </div>
      <div class="sixteen wide mobile column mobile only">
        <div class="ui input">
          <button
            :class="{ loading: isLoading, 'ui tbb button': true }"
            @click="getSubscribed()"
          >
            Be the first to know
          </button>
        </div>
      </div>
    </div>
    <div class="ui grid">
      <div class="ui ten wide computer column sixteen wide mobile column"></div>
      <div
        class="ui six wide computer column sixteen wide mobile column form-errors"
      >
        <div v-if="errors.email" class="ui negative message">
          {{ errors.email[0] }}
        </div>
        <div v-if="success" class="ui message success">
          Congratulations, you have successfully subscribed.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  mounted() {
    this.$store.dispatch('reset_contact_form')
  },
  computed: {
    isLoading() {
      return this.$store.state.resource_isLoading
    },
    errors() {
      return this.$store.state.form_errors.contact_form
    },
    success() {
      return this.$store.state.subscriptionStore.success
    },
  },
  data() {
    return { email: '' }
  },
  methods: {
    getSubscribed: function () {
      this.$store.dispatch('subscribeUser', this.email)
    },
  },
})
</script>

<style scoped>
.contact-form-container {
  width: 100%;
  border-top: 1px solid #ccc;
  margin-top: 5%;
}

.form-errors {
  margin-top: -4% !important;
}

.margin-auto {
  margin: auto;
}

.full-width {
  width: 100% !important;
}
</style>
