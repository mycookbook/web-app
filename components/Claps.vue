<template>
    <div class="ui tbb fluid button" title="claps" :class="{ disabled: hasReachedMaximumAllowedThreshold }"
        @click="addClap()">
        <span>
            <i class="ui heart icon"></i>
            {{ totalCount }} Claps
        </span>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    mounted() {
        this.$store.dispatch('reset_hasClapped')
    },
    computed: {
        totalCount() {
            const totalCount = this.$store.state.recipeStore.totalCount

            if (totalCount > 0) {
                return totalCount
            }
            return this.$store.state.recipe?.data.claps
        },
        hasReachedMaximumAllowedThreshold() {
            return (
                this.$store.state.recipeStore.hasClapped >=
                this.$store.state.recipeStore.maxAllowedClaps
            )
        },
    },
    methods: {
        addClap() {
            const id = this.$store.state.recipe?.data.id
            const payload = { recipeId: id }
            this.$store.dispatch('add_clap', payload)
        },
    },
})
</script>
