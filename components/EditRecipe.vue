<template>
    <div>
        <div class="ui grid">
            <div class="four wide computer column four wide tablet column mobile hidden">
                <LeftSideMenu />
            </div>
            <div class="nine wide computer column nine wide tablet column sixteen wide mobile column">
                <h3 class="ui grey header">
                    {{ recipe.name }} : [Editing]
                </h3>
                <form>
                    <div id="recipe-editor">
                        <img class="ui fluid image" :src="imagePath" alt="Recipe cover image">
                    </div>
                    <div class="ui segment">
                        <UploadImage :description="uploadMessageDescription" :imageDimensionMsg="imageDimensionMsg"
                            :acceptTypes="acceptTypes" />
                        <div class="ui horizontal divider">
                            Or
                        </div>
                        <div class="ui form">
                            <div class="field">
                                <label>stock photo image url</label>
                                <span style="float:right!important;">
                                    <a href="https://www.dreamstime.com/stock-photos" target="_blank">
                                        STOCK PHOTOS
                                    </a>
                                </span>
                                <ValidationProvider rules="required" name="image url">
                                    <input type="text" v-model="imagePath"
                                        placeholder="Paste stock photo image address here" />
                                    <span class="errorText">error</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="ui form">
                            <div class="field">
                                <label>Ingredients (required*)</label>
                                <div>
                                    <div v-for="(input, index) in ingredients" :key="`ingInput-${index}`">
                                        <div>
                                            <ValidationProvider rules="required|alpha_spaces" name="ingredient name">
                                                <div>
                                                    <label>name</label>
                                                    <input v-model="input.name" type="text" placeholder="name of ingredient"
                                                        @input="debounceSearchIngredientImages(index)" />
                                                    <span class="errorText">
                                                        error slot TODO
                                                    </span>
                                                </div>
                                            </ValidationProvider>
                                            <br />
                                            <div class="ui grid">
                                                <ValidationProvider rules="required" name="ingredient unit">
                                                    <div class="six wide computer column sixteen wide mobile column">
                                                        <label>unit</label>
                                                        <input v-model="input.unit" type="text" placeholder="unit"
                                                            @input="debounceSearchIngredientImages(index)" />
                                                        <span class="errorText">
                                                            error slot TODO
                                                        </span>
                                                    </div>
                                                </ValidationProvider>
                                                <br />
                                            </div>
                                            <br />
                                            <br />
                                            <div class="ui grid">
                                                <div v-if="input.loading" class="loading-indicator">Loading...</div>
                                                <div v-if="input.showImageResults" class="thumbnail-container">

                                                    <div v-for="(result, resultIndex) in input.imageResults"
                                                        :key="`result-${resultIndex}`" class="ingredient-image-result">
                                                        <label>
                                                            <input type="radio" :value="result"
                                                                v-model="input.selectedThumbnail"
                                                                @change="selectThumbnail(index, input.selectedThumbnail.src.original)" />
                                                            <div class="thumbnail-wrapper">
                                                                <img :src="result.src.medium" class="thumbnail-image" />
                                                            </div>
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="ui grid">
                                                <div class="six wide computer column sixteen wide mobile column">
                                                    <label>thumbnail link</label>
                                                    <input v-model="input.thumbnail" type="text"
                                                        placeholder="Enter your preferred thumbnail link" />
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                            <div class="ui grid">
                                                <div class="six wide computer column sixteen wide mobile column">
                                                    <button @click="addField(input, ingredients)"
                                                        class="fluid ui black outline button"><i
                                                            class="plus circle icon"></i>new
                                                        item</button>
                                                </div>
                                                <div class="ten wide computer column  sixteen wide mobile column">
                                                    <button @click="removeField(index, ingredients)"
                                                        class="fluid ui tbb button"><i class="minus circle icon"></i>remove
                                                        item</button>
                                                </div>
                                            </div>
                                            <div class="ui horizontal divider">
                                                <i class="plus circe icon"></i>
                                            </div>
                                            <br />
                                            <div class="ui form">
                                                <div class="field">
                                                    <label>
                                                        Search Cookbook (required*)
                                                    </label>
                                                    <CookbookSelector ref="CookbookSelector"
                                                        @passCookbookCode="cookbook_id = $event"
                                                        @click="clearError('cookbookError')" />
                                                    <span class="errorText">{{ cookbookError }}</span>
                                                </div>
                                            </div>
                                            <div class="ui form">
                                                <div class="field">
                                                    <label>
                                                        <span>
                                                            Keywords (Optional)
                                                        </span>
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
                                                <div class="ten wide computer column  sixteen wide mobile column">
                                                    <button class="fluid ui tbb button" type="submit"
                                                        v-bind:class="{ loading: submitLoading }">update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="three wide computer column three wide tablet column mobile hidden">
                <ThreehundredByTwofifty />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { debounce } from 'lodash';

export default defineNuxtComponent({
    props: ['imagePath', 'recipe'],
    data() {
        return {
            uploadMessageDescription: "Upload New Recipe Cover Image",
            imageDimensionMsg: "Image dimension for best results (1127 x 650px)",
            acceptTypes: ".png",
            customToolbar: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike"], // toggled buttons
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                ["clean"], // remove formatting button
            ],
            title: "",
            nationality: "",
            recipeDescription: "",
            ingredients: [{ name: "", unit: "", thumbnail: "", link: "", loading: false }],
            searchParameter: "",
            keywords: [],
            cookbook_id: "",
            //Errors
            submitLoading: false,
            error: [],
            cookbookError: "",
            nationalityError: "",
            summary: "",
            debounceSearchIngredientImages: debounce(this.searchIngredientImages, 500), // Debounced version of the method
        };
    },
    methods: {
        addField(value, field) {
            field.push({ value: { name: "", unit: "", thumbnail: "", link: "" } })
            // Clear the thumbnail data for all ingredients
            this.ingredients.forEach((ingredient, index) => {
                this.$delete(ingredient, 'imageResults');
                this.$delete(ingredient, 'showImageResults');
            });
        },
        removeField(index, field) {
            if (index > 0) {
                field.splice(index, 1);
            }
        },

        selectThumbnail(index, thumbnailUrl) {
            this.ingredients[index].thumbnail = thumbnailUrl.src.original;
        },

        async searchIngredientImages(index) {
            const ingredient = this.ingredients[index].name;
            const unit = this.ingredients[index].unit;
            // Remove the existing imageResults property
            this.$delete(this.ingredients[index], 'imageResults');
            this.$delete(this.ingredients[index], 'showImageResults');
            // Check if both name and unit are filled before making the API call
            if (ingredient && unit) {
                try {
                    this.$set(this.ingredients[index], 'loading', true); // Set loading state to true
                    // Make the API call to fetch the ingredient thumbnails
                    const response = await this.fetch_ingredient_thumbnail(ingredient)
                    // Extract the thumbnail URLs from the API response
                    const imageResults = response;
                    // Update the corresponding ingredient object with the image results
                    this.$set(this.ingredients[index], 'imageResults', imageResults);
                    this.$set(this.ingredients[index], 'showImageResults', imageResults.length > 0);
                } catch (error) {
                    console.log(error)
                } finally {
                    this.$set(this.ingredients[index], 'loading', false);
                }
            }
        },

        fetch_ingredient_thumbnail(ingredient) {
            const client = createClient(process.env.PEXEL_API_KEY);
            const query = ingredient;
            return new Promise((resolve, reject) => {
                client.photos.search({ query, per_page: 3 })
                    .then(photos => {
                        resolve(photos.photos)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },

        selectThumbnail(index, thumbnailUrl) {
            this.ingredients[index].thumbnail = thumbnailUrl;
        },

        dropdownValidation: function () {
            let isValid = true;
            if (!this.nationality) {
                this.nationalityError = "The nationality field is required"
                isValid = false;
            }
            if (!this.cookbook_id) {
                this.cookbookError = "The cookbook field is required";
                isValid = false
            }
            return isValid
        },

        async submitButton() {
            const validFile = this.dropdownValidation()
            this.submitLoading = true
            const filteredIngredients = this.ingredients.map(ingredient => {
                return {
                    name: ingredient.name,
                    unit: ingredient.unit,
                    thumbnail: ingredient.thumbnail
                }
            })
            const dataSend =
            {
                title: this.title,
                nationality: this.nationality,
                ingredients: filteredIngredients,
                keywords: this.keywords,
                draft: "false",
                recipeDescription: this.recipeDescription,
                imagePath: this.imagePath,
                cookbook_id: this.cookbook_id,
                summary: this.summary,
                recipeId: this.recipeId
            }

            if (validFile === true) {
                const postResponse = await this.$store.dispatch('update_recipe', dataSend)
                const result = await postResponse
                if (result && result.status === 200) {
                    alert("Recipe has been updated")
                    this.$router.push({ name: 'Dashboard', query: { tab: 'Recipes' } });
                } else {
                    console.log("Error")
                    this.submitLoading = false
                }
            }
            if (validFile === false) {
                alert('You have incomplete fields')
                this.submitLoading = false
            }
        },
    },
    filters: {
        truncate: function (text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    },
})
</script>

<style scoped>
.hideshowicon i {
    cursor: pointer !important;
}

.show {
    display: inline;
}

.hide {
    display: none !important;
}


.errorText {
    color: red;
    font-size: small;
    font-style: italic;
}

.thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 80px;
}

.thumbnail-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.thumbnail-wrapper {
    flex: 1;
}

.ingredient-image-result {
    margin-right: 10px;
    flex: 1;
}

.img-container {
    width: 100%;
}

.img-container img {
    width: 100%;
    height: auto;
}
</style>