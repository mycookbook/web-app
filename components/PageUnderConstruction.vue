<template>
    <div>
        <Navigation />
        <div class="ui grid container">
            <div class="sixteen wide computer column sixteen wide mobile column sixteen wide tablet column">
                <img class="ui large centered fluid image" :src="backgroundUrl">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import backgroundImagePath from '~/assets/img/page-under-construction.png'

export default defineNuxtComponent({
    computed: {
        backgroundUrl() {
            return backgroundImagePath
        },
    },
})
</script>

<style scoped>
.container {
    margin-top: 25vh;
}
</style>