export function apiResponse<T>(message: string, data: T, success = true) {
  return {
    success,
    message,
    data,
  };
}
