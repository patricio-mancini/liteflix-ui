'use client'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface ApiResponse {
  isSuccess: boolean;
  errorMessage?: string;
}

export const uploadMovie = async (file: File, title: string): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);

  try {
    const response = await fetch(`${apiBaseUrl}/user/movies`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      return { isSuccess: true };
    } else {
      return { isSuccess: false, errorMessage: 'Failed to upload file' };
    }
  } catch (error: any) {
    return { isSuccess: false, errorMessage: `Error uploading file: ${error.message}` };
  }
};

export const logout = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      return { isSuccess: true };
    } else {
      return { isSuccess: false, errorMessage: 'Failed to logout' };
    }
  } catch (error: any) {
    return { isSuccess: false, errorMessage: `Error during logout: ${error.message}` };
  }
};