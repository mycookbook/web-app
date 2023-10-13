<template>
    <div>
        <div class="ui inline cookie nag top fixed">
            <span class="ui title">
                By using this website, you acknowledge that you have read and understood
                our
                <NuxtLink to="/privacy-policy">Privacy Policy, </NuxtLink>
                <NuxtLink to="/usage-policy">Usage Policy, </NuxtLink>
                <NuxtLink to="/terms-and-conditions">Terms &amp; Conditions</NuxtLink>
            </span>
            <span id="cookie-dismiss" @click="dismissCookiePolicy()">
                <i class="close icon"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    methods: {
        dismissCookiePolicy() {
            document.cookie = 'read-cookie-policy=true'
            $('.cookie.nag').hide()
        },
    },
})
</script>

<style scoped>
.title a {
    color: #ddd;
    text-decoration: underline;
}

#cookie-dismiss {
    cursor: pointer;
    float: right !important;
    color: white;
}
</style>
