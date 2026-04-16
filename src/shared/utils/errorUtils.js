/**
 * Extract error message from API response or Error object
 * @param {any} error 
 * @returns {string}
 */
export function getErrorMessage(error) {
  if (!error) return "";

  // If it's a string, return it directly
  if (typeof error === "string") return error;

  // Handle Axios response error data (error.response.data) or raw response data
  const data = error?.response?.data || error;

  // Handle the specific validation error structure (errors: { field: [messages] })
  if (data?.errors && typeof data.errors === "object" && !Array.isArray(data.errors)) {
    // Collect all error messages from the values of the object
    const messages = Object.values(data.errors).flat();
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  // Handle single message string
  if (data?.message) return data.message;
  
  // Handle result message if exists
  if (data?.result?.message) return data.result.message;

  // Handle title (common in ASP.NET Core validation responses)
  if (data?.title) return data.title;

  // Standard JS Error message
  if (error.message) return error.message;

  return "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.";
}
