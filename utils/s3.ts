import axios from 'axios'
import { S3 } from 'aws-sdk'

type AWSConfigType = {
  secretAccessKey: string
  accessKey: string
  bucket: string
  region: string
}

function initializeS3(config: AWSConfigType) {
  return new S3({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKey,
    signatureVersion: 'v4',
    region: config.region,
  })
}
export async function uploadFileToS3(file: File) {
  const config = useRuntimeConfig()
  const key = Date.now() + '-' + file.name.replace(/\s/g, '-')
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Expires: 10,
    ContentType: file.type,
  }
  const s3 = initializeS3(config.public.aws)
  const url = s3.getSignedUrl('putObject', params)

  try {
    const result = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    })

    const bucketUrl =
      decodeURIComponent(result.request.responseURL).split(key)[0] + key

    return {
      code: 200,
      bucketUrl,
    }
  } catch (error) {
    console.log('err', error)
    return {
      code: 403,
      error,
    }
  }
}

export async function deleteFileFromS3(key: string) {
  const config = useRuntimeConfig()
  const s3 = initializeS3(config.public.aws)
  const params = {
    Bucket: config.public.aws.bucket,
    Key: key,
  }
  await s3.deleteObject(params)
}
