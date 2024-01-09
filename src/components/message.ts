import { ElMessage } from 'element-plus'

const message = (type: 'success' | 'warning' | 'error' | 'info', msg: string) => {
  return ElMessage({
    showClose: true,
    duration: 3000,
    message: msg,
    type: type
  })
}

export const MessageWarning = (msg: string) => message('warning', msg)
export const MessageSuccess = (msg: string) => message('success', msg)
export const MessageError = (msg: string) => message('error', msg)
