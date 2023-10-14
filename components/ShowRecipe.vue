<template>
    <div>
        <Breadcrumb :active="recipe?.cookbook?.name" :path="`/cookbooks/${recipe?.cookbook?.slug}`" :child="recipe?.name" />
        <div class="ui grid">
            <div class="sixteen wide computer column sixteen wide mobile column">
                <div class="ui grid" style="
              border: 1px solid rgb(255, 255, 255);
              border-radius: 15px !important;
              background-color: rgb(255, 255, 255);
            ">
                    <div class="eight wide computer column sixteen wide mobile column ui fluid image"
                        style="height: fit-content !important">
                        <div class="ui mini images">
                            {{ ingredients }}
                            <img v-for="ingredient in ingredients" :key="ingredient.name" class="ui image"
                                :src="ingredient.thumbnail" :alt="ingredient.name"
                                :title="ingredient.unit + ' ' + ingredient.name" style="cursor: zoom-in"
                                @click="ingredientLink(ingredient)" :style="{ display: 'inline-flex', height: '35px' }" />
                        </div>
                        <img :src="recipe?.imgUrl" :alt="recipe?.name" class="zoom" />
                        <div class="talkify-section">
                            <div class="ui header padded">
                                <span> HOW TO PREPARE </span>
                                <span style="float: right; cursor: pointer !important" @click="textToSpeech()">
                                    <button class="ui right labeled icon tbb button">
                                        <i class="right icon headphone"></i>
                                        Listen
                                    </button>
                                    <span style="
                        font-size: 14px;
                        margin-left: -5px;
                        font-weight: lighter;
                      "></span>
                                </span>
                            </div>
                            <div v-html="recipe?.description" class="ui left aligned text"></div>
                        </div>
                    </div>
                    <div class="eight wide computer column sixteen wide mobile column">
                        <div class="ui grid">
                            <div class="sixteen wide computer column sixteen wide mobile column">
                                <Follow v-if="recipe?.author" :followers="recipe?.author?.followers"
                                    :author="recipe?.author?.name" :avatar="recipe?.author?.avatar"
                                    :handle="recipe?.author?.name_slug" />
                            </div>
                        </div>
                        <div class="ui horizontal divider"></div>
                        <div class="ui grid">
                            <div class="four wide computer column sixteen wide mobile column">
                                <Claps />
                            </div>
                            <div class="four wide computer column sixteen wide mobile column">
                                <div class="ui tbb fluid mini circular button" :class="{ disabled: !_isLoggedIn }"
                                    title="Add a variation for this recipe, make it yours!">
                                    <i class="ui plus icon"></i>
                                    Customize
                                </div>
                            </div>
                            <div class="four wide computer column sixteen wide mobile column">
                                <div class="ui icon tbb fluid mini circular button" data-tooltip="Click to copy"
                                    data-position="top left" data-inverted="" id="clipboardMsg" @click="copyIngredients()">
                                    <i class="ui linkify icon"></i>
                                    Copy ingredients
                                </div>
                            </div>
                            <div class="four wide computer column sixteen wide mobile column">
                                <ReportIt />
                            </div>
                        </div>
                        <div class="ui grid">
                            <div class="sixteen wide computer column sixteen wide mobile column">
                                <Comments v-if="recipeComments" :comments="recipeComments" :author_id="recipe?.id" />
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
    props: ['recipe', 'recipeComments', 'ingredients'],
    methods: {
        ingredientLink(ingredient: { link: string; name: string; hasOwnProperty: (arg0: string) => any; purchaseLink: string; }) {
            let url = ""
            if (!ingredient.link) {
                let google_search_url = "https://www.google.com/search?q=" + ingredient.name;

                if (ingredient.hasOwnProperty('purchaseLink')) {
                    url = ingredient.purchaseLink
                } else {
                    url = google_search_url
                }
            } else {
                url = ingredient.link
            }

            navigateTo(url.toString(), {
                external: true,
                open: {
                    target: '_blank'
                }
            })
        }
    }
})
</script>

<style scoped>
.img-container .button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
}

.padded {
    padding-top: 30px;
    padding-bottom: 5px;
}

.hidden {
    display: none !important;
}

.show {
    display: block !important;
}

.shareIcons span {
    margin-right: 12% !important;
    cursor: pointer !important;
}
</style>