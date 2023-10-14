<template>
    <div class="ui container">
        <Navigation />
        <div v-if="isLoading">
            <SkeletonRecipeCard />
        </div>
        <div v-else>
            <div v-if="inEditMode">
                <EditRecipe />
            </div>
            <div v-else>
                <ShowRecipe :recipe="recipe" :recipeComments="_recipeComments" :ingredients="ingredientsList(recipe)" />
            </div>
        </div>
        <ContactForm />
        <BottomNav />
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    mounted() {
        this.$store.dispatch('fetch_recipe', this.$route.params.slug)
    },
    props: ['slug', 'id'],
    computed: {
        recipe() {
            return this.$store.state.recipe?.data || {}
        },
        isLoading() {
            return this.$store.state.resource_isLoading
        },
        _recipeComments() {
            this.recipeComments = this.$store.state.recipe?.comments || []
            return this.recipeComments
        },
        _isLoggedIn() {
            const hasSession = this.$store.state.access_token !== null
            this.isLoggedIn = true
            if (!hasSession) {
                this.isLoggedIn = false
            }

            return this.isLoggedIn
        },
        inEditMode() {
            return this.$route.query.mode == 'edit'
        }
    },
    data() {
        return {
            links: {
                breadcrumbs: {
                    cookbookLink: '/cookbook/',
                },
                varietiesPageLink: '/recipes/',
            },
            recipeComments: [],
        }
    },
    methods: {
        copyIngredients() {
            const recipe = this.$store.state.recipe

            const ingredients = recipe.ingredients.data
            let ingredientsList = ''

            const line1 = 'Ingredients list for ' + recipe.name + '\n\n'
            const lastLine = '\n' + 'Have fun!' + '\n' + ':heart: Team CookbooksHQ'

            for (let i = 0; i < ingredients.length; i++) {
                ingredientsList +=
                    '- ' + ingredients[i].unit + ' ' + ingredients[i].name + '\n'
            }

            const message = line1 + ingredientsList + lastLine

            navigator.clipboard.writeText(message).then(function () {
                $('#clipboardMsg').data('tooltip', 'Copied!')
            })
        },
        textToSpeech() {
            const config = useRuntimeConfig()
            talkify.config.debug = false
            talkify.config.useSsml = false

            talkify.config.remoteService.apiKey = config.public.talkifyKey
            talkify.config.ui.audioControls.enabled = true

            const player = new talkify.TtsPlayer().enableTextHighlighting()

            player.forceVoice({ name: 'Zira', description: 'Zira' })

            const playlist = new talkify.playlist()
                .begin()
                .usingPlayer(player)
                .withRootSelector('.talkify-section')
                .withTextInteraction()
                .build()

            playlist.play()
        },
        ingredientLink(ingredient: { link: string; name: string; purchaseLink: string }) {
            let url = ''
            if (!ingredient.link) {
                const googleSearchUrl =
                    'https://www.google.com/search?q=2 lbs red potatoes' + ingredient.name

                if (ingredient.purchaseLink) {
                    url = ingredient.purchaseLink
                } else {
                    url = googleSearchUrl
                }
            } else {
                url = ingredient.link
            }

            window.open(url, '_blank').focus()
        },
        ingredientsList(recipe: { ingredients: string }) {
            try {
                return JSON.parse(recipe.ingredients).data
            } catch (e) {
                return [];
            }
        }
    },
})
</script>

<style scoped>
.container {
    margin-top: 23vh;
}
</style>
