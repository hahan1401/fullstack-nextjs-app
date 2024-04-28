export const generateResponseData = {
  success: <T>(data: T) => {
    return {responseData: data}
  },
  error: <T>(error: T) => {
    return {error: error}
  }
}