<template>
    <div>
        <div class="ui list">
            <div class="item" style="background-color: rgb(244 244 244); padding:15px!important;">
                <div>
                    <i class="yellow star icon"></i>
                    <i class="yellow star icon"></i>
                    <i class="yellow star icon"></i>
                    <i class="yellow star icon"></i>
                    <i class="yellow star icon"></i>
                    <br /><br />
                </div>
                <div class="content">
                    <a class="header" style="color: black!important;">Trending this
                        week</a>
                    <div class="description">
                        <div>
                            <small>Check out this week's <a href="/search?q=:recipes|trending">top 10 trending
                                    recipes</a>. Finding your next favorite recipe is as easy
                                as the click of a button >>>
                            </small>
                        </div>
                        <div class="ui tiny circular button" style="float: right;">
                            <i class="search icon"></i>
                            <NuxtLink :to="{ path: '/search', query: { q: ':recipes|trending' } }"></NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts">
export default {
    name: "TrendingThisWeek"
};
</script>
    
<style scoped>
.container {
    margin-top: 23vh;
}
</style>