<template>
    <div>
        <div class="cookbook-editor">
            <div style="text-align: center">
                <div>
                    {{ description }}
                </div>
                <div>
                    <div class="ui header">
                        {{ imageDimensionMsg }}
                    </div>
                </div>
                <br />
                <div>
                    <div class="ui tbb button" :class="{ loading: isLoading }" @click="showFileFinder()">
                        Select & Upload
                    </div>
                    <form enctype="multipart/form-data" method="post">
                        <input id="myfile" ref="file" type="file" name="myfile" :accept="acceptTypes" hidden />
                    </form>
                </div>
                <br />
                <div>
                    {{ fileName }}
                </div>
            </div>
        </div>
        <div v-if="errorMessage" class="ui error message">{{ errorMessage }}</div>
        <div v-if="uploadSuccess" class="ui success message">Success.</div>
    </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
    props: {
        description: String,
        imageDimensionMsg: String,
        acceptTypes: String,
    },
    data() {
        return {
            fileName: '',
        }
    },
    mounted() {
        // this.$store.dispatch('reset_msgs')
    },
    computed: {
        isLoading() {
            return this.$store.state.resource_isLoading
        },
        errorMessage() {
            return this.$store.state.upload_error
        },
        uploadSuccess() {
            return this.$store.state.imagePath !== ''
        },
    },
    methods: {
        showFileFinder() {
            $('#myfile').trigger('click')

            const input = document.querySelector('input')
            input.addEventListener('change', (e) => {
                const file = e.target.files[0]
                this.fileName = file.name
                this.$store.dispatch('upload_image', file)
            })
        },
    },
})
</script>

<style scoped>
.cookbook-editor {
    border: 1px dashed blue;
    height: 170px;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>
