import { deleteFileFromS3, uploadFileToS3 } from '~~/utils/s3'

export const imageUploadStore = {
  mutations: {
    SET_IMAGEPATH(_, response) {
      if (response.code !== 200) {
        this.state.upload_error =
          'Sorry, an error occured while uploading the image, please try again.'
      } else {
        this.state.imagePath = response.bucketUrl
      }
    },
    RESET_MSGS() {
      this.state.upload_error = null
      this.state.imagePath = ''
    },
  },
  actions: {
    async upload_image(context, file) {
      context.commit('SET_LOADING_STATE', true)
      const response = await uploadFileToS3(file)

      context.commit('RESET_MSGS')
      context.commit('SET_IMAGEPATH', response)
      context.commit('SET_LOADING_STATE', false)
    },
    async delete_image(_, key: string) {
      await deleteFileFromS3(key)
    },
    reset_msgs(context) {
      context.commit('SET_LOADING_STATE', false)
      context.commit('RESET_MSGS')
    },
  },
}
