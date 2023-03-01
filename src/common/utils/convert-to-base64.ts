import { message, UploadFile } from 'antd'
import { RcFile } from 'antd/es/upload'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = error => reject(error)
  })

export const beforeUpload = async (file: UploadFile, setImg: (img64: string) => void) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }

  const isLt2M = file?.size ? file.size / 1024 / 1024 < 2 : false

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }

  if (!file.url && !file.preview) {
    file.preview = await getBase64(file as RcFile)
    setImg(file.url || (file.preview as string))
  }

  return isJpgOrPng && isLt2M
}
