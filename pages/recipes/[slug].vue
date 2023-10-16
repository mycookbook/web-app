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
definePageMeta({
    middleware: ["auth"]
})

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
