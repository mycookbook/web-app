<template>
    <div>
        <Navigation />
        <div class="ui grid container">
            <div class="sixteen wide computer column sixteen wide mobile column sixteen wide tablet column">
                <img class="ui large centered image" :src="backgroundUrl">
            </div>
            <ContactForm />
            <BottomNav />
        </div>
    </div>
</template>

<script lang="ts">
import backgroundImagePath from '~/assets/img/page-under-construction.jpg'

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
    margin-top: 20vh;
}
</style>