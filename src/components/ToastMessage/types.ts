export type ToastMessageProps = {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning'
  onClose: () => void
}
