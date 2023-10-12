<template>
    <div style="background-color:#F4F4F4;border-radius: 8px; width: 100%; height: auto; padding:15px">
        <div>
            <h3>Who to follow</h3>
        </div>
        <br />
        <div class="ui grid">
            <div class="fourteen wide computer column">
                <Follow :toFollowList="whoToFollowList" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "WhoToFollow",
    mounted() {
        this.$store.dispatch('get_who_to_follow');
    },
    computed: {
        whoToFollowList() {
            return this.$store.state.userStore.who_to_follow
        }
    }
};
</script>

<style scoped></style>
