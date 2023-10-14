<template>
    <div>
        <div class="hideshowicon">
            <div v-if="inEditMode">
                show editor<i class="ui chevron up icon" @click="toggleEditor('show')"></i>
            </div>
            <div v-else>
                hide editor<i class="ui chevron down icon" @click="toggleEditor('hide')"></i>
            </div>
        </div>
        <br />

        <div id="recipe-editor" class="hide">
            <div class="ui segment">
                <UploadImage :description="uploadMessageDescription" :image-dimension-msg="imageDimensionMsg"
                    :accept-types="acceptTypes" />
                <div class="ui horizontal divider">Or</div>
                <div class="ui form">
                    <div class="field">
                        <label>stock photo image url</label>
                        <span style="float: right !important">
                            <a href="https://www.dreamstime.com/stock-photos" target="_blank">
                                STOCK PHOTOS
                            </a>
                        </span>
                        <input type="text" placeholder="Paste stock photo image address here" />
                    </div>
                </div>
            </div>
            <div class="ui horizontal divider"></div>
            <div class="ui form">
                <div class="field">
                    <label>Title (required*)</label>
                    <input type="text" placeholder="Enter recipe title" />
                </div>
            </div>
            <br />
            <div class="ui form">
                <div class="field">
                    <label>Nationality (required*)</label>
                    <WidgetFlagPicker />
                </div>
            </div>
            <br />
            <div class="ui form">
                <div class="field">
                    <label>
                        <span> How to prepare (required*) </span>
                        <span style="float: right !important">
                            <a href="/help/templates"> see templates </a>
                        </span>
                    </label>
                    <VueEditor v-model="recipeDescription" :editorOptions="editorSettings" :editorToolbar="customToolbar"
                        placeholder="A very good description will be several characters long. A well detailed recipe keeps your followers engaged and keep coming back for more. Not sure how to start? Check out our sample templates." />
                </div>
            </div>
            <br />
            <div class="ui form">
                <div class="field">
                    <label>Ingredients (required*)</label>
                    <div v-for="(input, index) in ingredients" :key="`ingInput-${index}`">
                        <div>
                            <label>name</label>
                            <input v-model="input.name" type="text" placeholder="name of ingredient" />
                        </div>
                        <br />
                        <div class="ui grid">
                            <div class="six wide computer column sixteen wide mobile column">
                                <label>unit</label>
                                <input v-model="input.unit" type="text" placeholder="unit" />
                            </div>
                            <br />
                            <div class="ten wide computer column sixteen wide mobile column">
                                <label>thumbnail</label>
                                <input v-model="input.thumbnail" type="text" placeholder="thumbnail" />
                            </div>
                        </div>
                        <br />
                        <div>
                            <label>link</label>
                            <input v-model="input.link" type="text" placeholder="Link" />
                        </div>
                        <br />
                        <div class="ui grid">
                            <div class="six wide computer column sixteen wide mobile column">
                                <button class="fluid ui black outline button" @click="addField(input, ingredients)">
                                    <i class="plus circle icon"></i>new item
                                </button>
                            </div>
                            <div class="ten wide computer column sixteen wide mobile column">
                                <button class="fluid ui tbb button" @click="removeField(index, ingredients)">
                                    <i class="minus circle icon"></i>remove item
                                </button>
                            </div>
                        </div>
                        <div class="ui horizontal divider">
                            <i class="plus circe icon"></i>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div class="ui form">
                <div class="field">
                    <label> Search Cookbook (required*) </label>
                    <input type="text" placeholder="e.g vegan cookbook" />
                </div>
            </div>
            <br />
            <div class="ui form">
                <div class="field">
                    <label>
                        <span> Keywords (Optional) </span>
                        <br />
                        <small>
                            Adding keywords is a great way to boost the visibility of your
                            recipes
                        </small>
                    </label>
                    <input type="text" placeholder="e.g main dishes, fitfam" />
                </div>
            </div>
            <div class="ui horizontal divider"></div>
            <div class="ui grid">
                <div class="six wide computer column sixteen wide mobile column">
                    <button class="fluid ui black outline button">save as draft</button>
                </div>
                <div class="ten wide computer column sixteen wide mobile column">
                    <button class="fluid ui tbb button">save</button>
                </div>
            </div>
        </div>

        <div class="ui horizontal divider">
            <i class="camera icon"></i>
        </div>

        <div>
            <div v-if="_myRecipes.length < 1">
                <em>You have no recipes.</em>
            </div>
            <div v-else>
                <div class="ui items">
                    <div v-for="recipe in _myRecipes" :key="recipe.id" class="item">
                        <div class="ui tiny image">
                            <img :src="recipe.imgUrl" />
                        </div>
                        <div class="content">
                            <a class="header" href="">
                                <small>
                                    <span>
                                        <NuxtLink :to="`/recipes/${recipe.slug}`">
                                            {{ recipe.name }}
                                        </NuxtLink>
                                    </span>
                                </small>
                            </a>
                            <span style="float: right !important; font-size: 16px">
                                <NuxtLink :to="`/recipes/${recipe.slug}?mode=edit`"> edit </NuxtLink>
                            </span>
                            <div class="meta">
                                <span>
                                    {{ truncate(recipe.summary, 115, '...') }}
                                </span>
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
    mounted() {
        this.$store.dispatch('fetch_contributor', this.$store.state.username);
        this.$store.dispatch('reset_msgs')
    },
    computed: {
        _categories() {
            const contents = this.$store.state.cookbookStore.definitions.categories.contents
            return JSON.parse(contents)
        },
        _myRecipes() {
            const recipes = this.$store.state.contributor?.recipes || []
            return recipes.filter(function (recipe) {
                return recipe.is_draft === false
            })
        },
        editorSettings() {
            return { theme: 'snow' }
        },
    },
    data() {
        return {
            inEditMode: true,
            uploadMessageDescription: 'Upload Recipe Cover Image',
            imageDimensionMsg: 'Image dimension for best results (1127 x 650px)',
            acceptTypes: '.png',
            recipeDescription: '',
            ingredients: [{ name: '', unit: '', thumbnail: '', link: '' }],
            customToolbar: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                [
                    { align: '' },
                    { align: 'center' },
                    { align: 'right' },
                    { align: 'justify' },
                ],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                ['clean'], // remove formatting button
            ],
        }
    },
    methods: {
        toggleEditor(action) {
            if (action === 'hide') {
                $('#recipe-editor').removeClass('show')
                $('#recipe-editor').addClass('hide')
            }

            if (action === 'show') {
                $('#recipe-editor').addClass('show')
                $('#recipe-editor').removeClass('hide')
            }
            this.inEditMode = !this.inEditMode
        },
        addField(_, field) {
            field.push({ value: { name: '', unit: '', thumbnail: '', link: '' } })
        },
        removeField(index, field) {
            field.splice(index, 1)
        },
        truncate(text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix
            } else {
                return text
            }
        },
    },
})
</script>

<style scoped>
@import url("vue2-editor/dist/vue2-editor.css");
@import url("quill/dist/quill.core.css");
@import url("quill/dist/quill.bubble.css");

@import url("quill/dist/quill.snow.css");

.hideshowicon i {
    cursor: pointer !important;
}

.show {
    display: inline;
}

.hide {
    display: none !important;
}
</style>
