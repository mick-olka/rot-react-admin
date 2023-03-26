import { toast } from 'react-toastify'

export const toasterPending = <T>(
  method: Promise<T>,
  pending?: string,
  error?: string,
  success?: string,
): Promise<T> => {
  return toast.promise(method, {
    pending: pending || 'Loading...',
    error: error || 'Error',
    success: success || 'Success',
  })
}
