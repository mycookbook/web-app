<template>
    <div class="ui container">
        <Navigation />
        <div class="ui grid">
            <div class="sixteen wide computer column sixteen wide mobile column">
                <div class="ui grid">
                    <div class="three wide computer column sixteen wide mobile hidden column">
                        <LeftSideMenu />
                    </div>
                    <div class="eight wide computer column sixteen wide mobile column">
                        <a class="ui label">
                            <em>Control what you see by
                                <NuxtLink href="/#/dashboard?tab=Preferences">choosing </NuxtLink>your preffered topics
                            </em>
                        </a>
                        <br /><br />
                        <FeedData />
                    </div>
                    <div class="five wide computer column sixteen wide mobile column">
                        <div class="ui grid">
                            <ThreehundredByTwofifty />
                        </div>
                        <div class="ui grid">
                            <div class="sixteen wide computer column sixteen wide mobile column">
                                <WhoToFollowList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    margin-top: 23vh;
}
</style>
