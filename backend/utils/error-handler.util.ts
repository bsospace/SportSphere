export interface AppError extends Error {
    statusCode?: number; // HTTP status code for the error
    isOperational?: boolean; // Whether the error is an expected operational error
  }
  
  /**
   * Custom error handler utility
   * @param error - The error object or string
   * @param statusCode - Optional HTTP status code (default: 500)
   * @returns An object with the error message and status code
   */
  export const handleError = (error: unknown, statusCode: number = 500): AppError => {
    let message: string;
  
    if (typeof error === "string") {
      message = error; // If error is a string, use it as the message
    } else if (error instanceof Error) {
      message = error.message; // Extract message from Error instance
    } else {
      message = "An unknown error occurred"; // Fallback for unhandled error types
    }
  
    const appError: AppError = new Error(message);
    appError.statusCode = statusCode;
    appError.isOperational = true;
  
    return appError;
  };
  
  /**
   * Utility to wrap async functions for error handling
   * @param fn - An async function
   * @returns A wrapped function with error handling
   */
  export const asyncHandler = <T>(
    fn: (...args: unknown[]) => Promise<T>
  ) => {
    return (...args: unknown[]): Promise<T | void> => {
      return fn(...args).catch((error) => {
        console.error("Unhandled Error:", error); // Log the error for debugging
        throw handleError(error);
      });
    };
  };