<template>
    <div>
        <div>
            <div class="ui modal">
                <div class="tbb header">
                    <i class="ui assistive listening systems icon"></i>New Recipe Alert
                </div>
                <div class="scrolling content">
                    <div class="ui grid">
                        <div class="eight wide computer column">
                            <img class="ui large fluid image" src="~/assets/img/omg-what-is-that.jpg" />
                        </div>
                        <div class="eight wide computer column">
                            <h1 class="ui header capitalize">
                                {{ showing }}???
                                <div class="sub header">OMFG what is that recipe!!! &#128513;</div>
                            </h1>
                            <h2 class="ui header">
                                We don't know that recipe ...
                                <div class="sub header">
                                    Do you know the recipe???
                                </div>
                            </h2>
                            <br /><br />
                            <div>
                                Everyday, content creators like you use this platform to showcase their creativity. It is
                                an opportunity to be a part of something meaninful and fun. All you need to do is
                                signin with your TikTok account and that's it! Start creating recipes.
                            </div>
                            <br />
                            <div>
                                <NuxtLink to="/signin" class="ui black button" @click="hideModal()">
                                    Sign in with TikTok
                                </NuxtLink>
                            </div>
                            <br /><br /><br />
                            <div>
                                <h6 style="font-weight: lighter;!important">
                                    <div>
                                        Looking for search tips? We gatchu. Check out our <a
                                            href="/help/query-syntax">search query syntax</a>. The
                                        simple easy to remember syntax helps you to find fine grained results easily
                                        and quickly too. Also see community guidelines.
                                    </div>
                                </h6>
                            </div>
                            <div class="ui checkbox" @change="modalConsent()">
                                <input type="checkbox" name="modalConsent" id="dismissCheckbox">
                                <label>Don't show again</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    props: ['showing'],
    methods: {
        hideModal() {
            $('.ui.modal').modal('hide')
        },
        modalConsent() {
            const dontShowAgain = $('#dismissCheckbox').is(':checked')

            if (dontShowAgain) {
                localStorage.setItem('keepShowing', 'no')
            }
        }
    }
})
</script>

<style scoped>
.capitalize{
    text-transform: capitalize;
}
</style>