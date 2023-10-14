<template>
    <div class="ui container">
        <Navigation />
        <br /><br />
        <div v-if="isLoading">
            <SkeletonCookbook />
        </div>
        <div v-else>
            <!-- begin breadcrumb -->
            <Breadcrumb :active="cookbook.name" />
            <!-- end of breadcrumb -->

            <!-- start categories section -->
            <div class="ui grid">
                <div
                    class="sixteen wide mobile column eight wide tablet column eight wide computer column eight wide large screen column">
                    <div class="ui labels">
                        <a v-for="category in cookbook.categories" :key="category.id" class="ui tiny label"
                            :style="{ 'background-color': getBgColor(category.color) }">
                            <span>
                                <a :href="'#/search?q=:cookbooks|categories ' + category.name">
                                    {{ category.name }}
                                </a>
                            </span>
                            <span v-html="category.emoji"></span>
                        </a>
                    </div>
                </div>
                <div
                    class="sixteen wide mobile column eight wide tablet column eight wide computer column eight wide large screen column">
                    <div class="ui fluid action input">
                        <input v-model="searchText" type="text" placeholder="Search recipes in this cookbook" />
                        <select v-model="searchBy" class="ui compact selection dropdown" style="height: auto !important">
                            <option value="all">All</option>
                            <option value="contributor" :selected="true">
                                By Contributor
                            </option>
                            <option value="recipe">By Recipe Name</option>
                            <option value="tagName">By Tag Name</option>
                        </select>
                        <div class="ui tbb button" title="search this cookbook" @click="searchCookbook()">
                            <span style="padding-right: 10px"> Search </span>
                            <span>
                                <i class="search icon" style="margin: auto !important"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui grid">
                <div
                    class="sixteen wide mobile column sixteen wide tablet column sixteen wide computer column sixteen wide large screen column">
                    <span style="float: right !important">
                        <div style="margin-top: -27px !important">
                            <small>
                                <a :href="'/#/search?q=' + searchText">Advanced search</a>
                            </small>
                        </div>
                    </span>
                </div>
            </div>
            <!-- end categories section -->

            <!-- start hero -->
            <div id="cover-img" class="ui grid">
                <div
                    class="sixteen wide mobile column eight wide tablet column eight wide computer column eight wide large screen column">
                    <div style="position: relative; display: flex">
                        <img :src="cookbook.bookCoverImg" class="ui fluid image" :alt="cookbook.alt_text"
                            style="max-height: 650px" />
                    </div>
                </div>
                <div
                    class="sixteen wide mobile column eight wide tablet column eight wide computer column eight wide large screen column">
                    <h2>About</h2>
                    <div>
                        {{ cookbook.description }}
                    </div>
                    <br />
                    <div class="ui divider"></div>
                    <button class="ui fluid tbb inverted button" @click="hideCoverImg()">
                        <h4>Show Recipes</h4>
                    </button>
                    <br />
                    <button class="ui fluid red button">
                        <h4><i class="bell icon"></i> Subscribe</h4>
                    </button>
                    <br />
                    <button class="ui fluid orange button">Like & Share</button>
                    <div>
                        <br />
                        <h2>Useful Resources & External Links</h2>
                        <div>
                            <ul>
                                <li>
                                    <a href="/#/wikis?gHirmb34567bijbwejj">How to use</a>
                                </li>
                                <li>
                                    <a>Guide to a healthy living for t2 diabetics</a>
                                </li>
                                <li>
                                    <a>How to fast like a Pro</a>
                                </li>
                            </ul>
                            <div>
                                <h3>videos</h3>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a>Link to youtube video</a>
                                    </li>
                                    <li>
                                        <a>Link to tiktok video</a>
                                    </li>
                                    <li>
                                        <a>Learn how to feel great system works!</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end hero -->

            <!-- recipes -->
            <div id="recipes-list" class="ui grid center hide">
                <div id="scrollIntoView" class="sixteen wide computer column sixteen wide mobile column">
                    <div>
                        <a style="cursor: pointer" @click="showCoverImg()">back to about page</a>
                    </div>
                    <RecipesList :recipes="_recipes" :cookbook-id="cookbook?.id" :cookbook-name="cookbook?.name" />
                </div>
            </div>
        </div>
        <!-- end! -->

        <div class="ui grid">
            <ContactForm />
            <BottomNav />
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    async mounted() {
        const { params } = this.$route
        await this.$store.dispatch('fetch_cookbook', params.slug)
    },
    computed: {
        cookbook() {
            return this.$store.state.cookbook?.data || {}
        },
        isLoading() {
            return this.$store.state.resource_isLoading
        },
        seeMore() {
            return this.$store.state.cookbookStore.seeMore
        },
        _recipes: {
            get() {
                if (this.recipes.length === 0) {
                    return this.$store.state.cookbook?.data?.recipes || []
                }

                return this.recipes
            },
            set(values: never[]) {
                this.recipes = values
            },
        },
    },
    data() {
        return {
            subscribed: false,
            incrementBy: 5,
            searchText: '',
            searchBy: 'recipe',
            recipes: [],
        }
    },
    methods: {
        seeMoreOrLess() {
            this.$store.dispatch('see_more_or_less')
        },
        getBgColor(code: any) {
            return `#${code}`
        },
        showSubscriptionForm() {
            this.subscribed = !this.subscribed
        },
        searchCookbook() {
            const by = this.searchBy.toLowerCase()
            const q = this.searchText.toLowerCase()
            const loadedRecipes = this.$store.state.cookbooks?.data?.recipes
            let filtered = []

            if (by === 'tagname') {
                filtered = loadedRecipes.filter(function (r: { tags: string }) {
                    return r.tags.toLowerCase().includes(q.toLowerCase())
                })
            }

            if (
                (by === 'recipe' && !q) ||
                (by === 'contributor' && !q) ||
                (by === 'tagname' && !q)
            ) {
                return this.loadedRecipes
            }

            if (by === 'recipe') {
                filtered = loadedRecipes.filter(function (r: { name: string }) {
                    return r.name.toLowerCase().includes(q.toLowerCase())
                })
            }

            if (by === 'contributor') {
                filtered = loadedRecipes.filter(function (r: { author: { name: string } }) {
                    const author = r.author.name.toLowerCase()
                    // alert(author)
                    return author.includes(q.toLowerCase())
                })
            }

            this._recipes = filtered

            this.scrollToElement()
        },
        scrollToElement() {
            const el = document.getElementById('scrollIntoView')

            el.scrollIntoView()
        },
        disclaimerText(visibility: any) {
            if (!visibility) {
                return 'DISCLAIMER NOTICE:This is a public repository. The contributions made herein are from different contributors across the globe, therefore, contents are opinionated. Cookbookshq shall not be held liable for any misunderstanding of the descriptions therein, or any inaccuracies encountered. '
            }

            return 'DISCLAIMER NOTICE: This is a private cookbook. This means that the owner has exclusive control over the contributions made in this cookbook and where possible, contributions are INVITE ONLY!!!'
        },
        redirectToDashboard() {
            location.replace('https://web.cookbookshq.com//#/dashboard')
        },
        hideCoverImg() {
            $('#cover-img').addClass('hide')
            $('#recipes-list').removeClass('hide')
        },
        showCoverImg() {
            $('#recipes-list').addClass('hide')
            $('#cover-img').removeClass('hide')
        },
    },
})
</script>

<style scoped>
.container {
    margin-top: 23vh;
}

p {
    color: rgba(0, 0, 0, 0.5);
}

.click {
    cursor: pointer !important;
}

.cookbook-info {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hide {
    display: none;
}
</style>
