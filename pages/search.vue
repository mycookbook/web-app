<template>
    <div class="ui container">
        <Navigation />
        <div class="margin-top-150"></div>
        <div class="ui grid">
            <div class="three wide computer column sixteen wide mobile column sixteen wide tablet column">
                <h2>Trending this week</h2>
            </div>
            <div class="thirteen wide computer column sixteen wide mobile column sixteen wide tablet column">
                <div class="ui huge header">
                    Showing {{ results.length }} of {{ results.length }} results for "{{
                        showing
                    }}"
                </div>
            </div>
        </div>
        <div class="ui grid">
            <div class="three wide computer column sixteen wide mobile column sixteen wide tablet column"
                style="border-right: solid #eeeeee 1px">
                <p class="ui info message">
                    Results are ranked based on relevance and the activities of users in
                    your geographical location
                </p>
                <div style="padding-top: 3%">
                    <div class="ui orange progress" data-percent="99" id="example3">
                        <div class="bar"></div>
                        <div class="label">
                            <a href="/#/search?q=">Jamaican Jerk Chicken 99%</a>
                        </div>
                    </div>
                    <div class="ui orange progress" data-percent="74" id="example1">
                        <div class="bar"></div>
                        <div class="label">
                            <a href="/#/search?q="> Chicken Egg Nuggets 74% </a>
                        </div>
                    </div>
                    <div class="ui orange progress" data-percent="45" id="example2">
                        <div class="bar"></div>
                        <div class="label">
                            <a href="/#/search?q="> Mac & Cheese 45% </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="thirteen wide computer column sixteen wide mobile column sixteen wide tablet column">
                <div>
                    <div class="ui fluid action input">
                        <input type="text" placeholder="Try: peppermint tea recipe" v-model="searchq"
                            @keyup="searchForQuery" id="sq" />
                        <div class="ui tbb button" @click="searchForQuery">Search</div>
                    </div>
                </div>
                <div>
                    <span style="float: right !important">
                        <small>
                            <a href="/"> Cookbookshq <sup>&#174;</sup> </a>
                        </small>
                    </span>
                </div>
                <div style="margin: 18px !important">
                    <i class="lightbulb icon"></i>
                    <em>Do you know that you can search for more fine-grained results? As
                        an example, you can type
                        <code>:cookbooks|author [all or part of author's name].</code> This
                        will list all the cookbooks that matches your search query!
                        <br /><br />
                        <b>Neat right? Learn how to search like a pro using our homegrown</b></em>
                    <NuxtLink :to="`/help/query-syntax`"> query syntax </NuxtLink>
                </div>
                <div class="margin-top-20"></div>
                <div class="ui grid">
                    <div class="sixteen wide computer column sixteen wide mobile column sixteen wide tablet column">
                        <AdsComponent />
                    </div>
                </div>
                <h4 class="ui horizontal divider header">Search Results</h4>
                <div v-show="results.length > 0">
                    <span>
                        <small>
                            <a class="link" @click="sortBy('newest')"> most recent | </a>
                        </small>
                    </span>
                    <span>
                        <small>
                            <a class="link" @click="sortBy('oldest')"> oldest </a>
                        </small>
                    </span>
                </div>
                <br />
                <div v-for="result in results" :key="result.id" class="capitalize">
                    <div>
                        <div v-if="result.resource_type === 'cookbook'">
                            <span v-if="result.is_locked">
                                <i class="ui lock icon"></i> <small>Private </small>
                            </span>
                            <span v-else>
                                <i class="ui unlock icon"></i> <small>Community </small>
                            </span>
                            <span>
                                <small>
                                    <b>{{ result.resource_type }}</b> >
                                    <NuxtLink :to="getTo(result.author.name_slug)">
                                        {{ result.author.name_slug }}
                                    </NuxtLink>
                                    > {{ result.created_at }}
                                </small>
                            </span>
                        </div>

                        <div v-if="result.resource_type === 'recipe'">
                            <span v-if="result.author_can_take_orders">
                                <i class="shopping basket icon"></i>
                            </span>
                            <span>
                                <small>
                                    <b>{{ result.resource_type }}</b> >
                                    <NuxtLink :to="getTo(result.author.name_slug)">
                                        {{ result.author.name_slug }}
                                    </NuxtLink>
                                    > {{ result.created_at }}
                                </small>
                            </span>
                        </div>

                        <span style="float: right; text-transform: lowercase">
                            <small>
                                <span v-if="result.contains && result.contains.length > 0">
                                    includes
                                    <span style="background-color: #ffff00" v-for="contain in result.contains"
                                        :key="contain">
                                        {{ contain }}
                                    </span>
                                </span>
                                <span v-if="result.missing && result.missing.length > 0">
                                    : missing
                                    <span v-for="missing in result.missing" :key="missing"><s>
                                            {{ missing }}
                                        </s></span>
                                </span>
                            </small>
                        </span>
                    </div>
                    <div>
                        <a class="link">
                            <div @click="redirectTo(result.resource_type, result.slug)">
                                <h4>{{ result.name }}</h4>
                            </div>
                        </a>
                    </div>
                    <div>
                        {{
                            isCookbook(result.resource_type)
                            ? result.description + '...'
                            : result.summary + '...'
                        }}
                    </div>
                    <div class="margin-top-15"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    mounted() {
        this.initkeywords()
        this.$store.dispatch('empty_results_object')
        if (this.$route.query.q !== '') {
            this.searchq = this.$route.query.q
            this.$store.dispatch('fetch_results', this.$route.query.q)
        }
    },
    computed: {
        results() {
            return this.$store.state.searchStore.results
        },
        showing() {
            if (this.$route.query.q !== '') {
                if (this.searchq !== '') {
                    return this.searchq
                }

                return this.$route.query.q
            }
        },
    },
    data() {
        return {
            searchq: '',
        }
    },
    methods: {
        isCookbook(type) {
            return type === 'cookbook'
        },
        isRecipe(type) {
            return type === 'recipe'
        },
        getTo(name) {
            return '/contributors/' + name
        },
        searchForQuery(e) {
            if (e.which === 13) {
                const qStr = $('#sq').val()
                this.$router.replace(`/search?q=${qStr}`)
                this.searchq = qStr
            }

            this.$store.dispatch('empty_results_object')
            this.$store.dispatch('fetch_results', this.searchq)
        },
        redirectTo(type, slug) {
            this.$router.replace(`/${type}s/${slug}`)
        },
        sortBy(order) {
            this.$store.dispatch('sort_results_by', order)
        },
        initkeywords() {
            $('#example1').progress()
            $('#example2').progress()
            $('#example3').progress()
        },
    },
})
</script>

<style scoped>
.margin-top-15 {
    margin-top: 15px;
}

.margin-top-20 {
    margin-top: 20px;
}

.margin-top-25 {
    margin-top: 75px;
}

.margin-top-150 {
    margin-top: 158px;
}

.checkboxes .checkbox {
    margin: 10px;
}

.capitalize {
    text-transform: capitalize !important;
}

.link {
    cursor: pointer !important;
}
</style>
