export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  token?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function httpClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...customConfig,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.ok) {
    // Determine if the response is JSON or empty specifically for DELETE or 204
    if (response.status === 204) {
      return {} as T;
    }
    try {
        const data = await response.json();
        return data as T;
    } catch {
         // Fallback if response is text or blob, usually handled by checking content-type, 
         // but for this generic client we assume JSON or empty for simplicity
         return {} as T;
    }
  } else {
    // Handle error responses
    let errorMessage = 'Something went wrong';
    let errorData = null;

    try {
      errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // Ignored if invalid JSON
    }

    if (response.status === 401) {
      // Could trigger a global logout event here or throw specific error
      throw new ApiError('Unauthorized accessing', 401, errorData);
    }

    if (response.status === 403) {
      throw new ApiError('Forbidden access', 403, errorData);
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }
}
