import { deleteFileFromS3, uploadFileToS3 } from '~~/utils/s3'

export const imageUploadStore = {
    state() {
        return {
            upload_error: "",
            imagePath: ""
        }
    },
    mutations: {
        SET_IMAGEPATH(state: { upload_error: string; imagePath: any }, response: { code: number; bucketUrl: any }) {
            if (response.code !== 200) {
                state.upload_error =
                    'Sorry, an error occured while uploading the image, please try again.'
            } else {
                state.imagePath = response.bucketUrl
            }
        }
    },
    actions: {
        async upload_image(context: { commit: (arg0: string, arg1: boolean | { code: number; bucketUrl: string; error?: undefined; } | { code: number; error: unknown; bucketUrl?: undefined; } | undefined) => void; }, file: File) {
            context.commit('SET_LOADING_STATE', true)
            const response = await uploadFileToS3(file)

            context.commit('RESET_MSGS', response)
            context.commit('SET_IMAGEPATH', response)
            context.commit('SET_LOADING_STATE', false)
        },
        async delete_image(key: string) {
            await deleteFileFromS3(key)
        }
    },
}
