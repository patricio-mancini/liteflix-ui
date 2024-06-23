import { uploadMovie, logout } from '@/lib/api/client';

describe('API Client Functions', () => {
  beforeEach(() => {
    jest.resetModules()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadMovie', () => {
    const mockFile = new File(['dummy content'], 'test-file.jpg', { type: 'image/jpeg' });

    it('uploads movie successfully', async () => {
      const mockResponse = { isSuccess: true };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
      });

      const result = await uploadMovie(mockFile, 'Test Movie');
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user/movies', {
        method: 'POST',
        credentials: 'include',
        body: expect.any(FormData),
      });
    });

    it('handles upload failure', async () => {
      const mockResponse = { isSuccess: false, errorMessage: 'Failed to upload file' };
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });

      const result = await uploadMovie(mockFile, 'Test Movie');
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user/movies', {
        method: 'POST',
        credentials: 'include',
        body: expect.any(FormData),
      });
    });

    it('handles network error during upload', async () => {
      const networkErrorMessage = 'Network error occurred';
      global.fetch = jest.fn().mockRejectedValue(new Error(networkErrorMessage));

      const result = await uploadMovie(mockFile, 'Test Movie');
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toContain(networkErrorMessage);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user/movies', {
        method: 'POST',
        credentials: 'include',
        body: expect.any(FormData),
      });
    });
  });

  describe('logout', () => {
    it('successfully logs out', async () => {
      const mockResponse = { isSuccess: true };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
      });

      const result = await logout();
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
    });

    it('handles logout failure', async () => {
      const mockResponse = { isSuccess: false, errorMessage: 'Failed to logout' };
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });

      const result = await logout();
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
    });

    it('handles network error during logout', async () => {
      const networkErrorMessage = 'Network error occurred';
      global.fetch = jest.fn().mockRejectedValue(new Error(networkErrorMessage));

      const result = await logout();
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toContain(networkErrorMessage);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
    });
  });
});

