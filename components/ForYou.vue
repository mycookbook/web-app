<template>
    <div style="margin-top:25px;">
        <TrendingThisWeek />
        <br />
        <div class="ui divider"></div>
        <br />
        <Feedback />
        <br />
        <div class="ui divider"></div>
        <TakingOrders />
        <br /><br />
        <TrendingNow />
        <br />
        <div class="ui divider"></div>
        <br /><br />
        <PeopleWithSimilarInterests />
        <div>
            <a href="/">back to top</a>
        </div>
    </div>
</template>
    
<script lang="ts">

export default {
    name: "ForYou"
};
</script>