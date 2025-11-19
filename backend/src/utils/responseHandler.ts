interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: Record<string, unknown>;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
}

export const successResponse = <T>(
  data: T,
  metadata?: Record<string, unknown>
): SuccessResponse<T> => ({
  success: true,
  data,
  metadata: {
    ...metadata,
    timestamp: new Date().toISOString(),
  },
});

export const errorResponse = (message: string, details?: unknown): ErrorResponse => ({
  success: false,
  error: {
    message,
    details,
  },
});
