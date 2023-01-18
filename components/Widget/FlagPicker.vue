<template>
  <div @click="selectDropDown()">
    <div class="ui fluid search selection dropdown">
      <input type="hidden" name="country" />
      <i class="dropdown icon"></i>
      <div class="default text">Select Country</div>
      <div class="menu">
        <div
          v-for="f in flags"
          :key="f.code"
          :data-value="selectCountryCode(f.code)"
          class="item"
        >
          <i :class="generateFlagClass(f.code)"></i>
          <span class="capitalize">
            {{ f.country }}
          </span>
          <span class="ui right floated capitalize"> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import countries from '~~/data/countries'

export default {
  data() {
    return {
      flags: Object.values(countries),
    }
  },
  methods: {
    generateFlagClass: function (code) {
      const class_ = code + ' flag'
      return class_
    },
    selectCountryCode: function (code) {
      return code
    },
    selectDropDown() {
      $('.ui.dropdown').dropdown()
    },
  },
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
