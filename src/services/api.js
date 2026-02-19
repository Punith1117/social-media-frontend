const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add Authorization header if token exists (token validation handled by AuthContext)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Standardized error object format
        throw {
          success: false,
          error: data.error || `HTTP ${response.status}`,
          status: response.status,
          field: data.field || null
        };
      }

      return data;
    } catch (error) {
      // Re-throw standardized errors
      if (error.success === false) {
        throw error;
      }
      
      // Handle network/other errors with standardized format
      throw {
        success: false,
        error: 'Network error. Please check your connection.',
        status: 0,
        field: null
      };
    }
  }

  async signup(username, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async login(username, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // User Profile Management
  async getMe() {
    return this.request('/users/me');
  }

  async updateUser(userData) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append('photo', file);

    return this.request('/users/me/photo', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for multipart/form-data
    });
  }

  async deleteProfilePhoto() {
    return this.request('/users/me/photo', {
      method: 'DELETE',
    });
  }

  async getUserByUsername(username) {
    return this.request(`/users/${username}`);
  }

  async followUser(followingId) {
    return this.request(`/follow/${followingId}`, {
      method: 'POST',
    });
  }

  async unfollowUser(followingId) {
    return this.request(`/follow/${followingId}`, {
      method: 'DELETE',
    });
  }

  async getFollowStats(userId) {
    return this.request(`/follow/stats/${userId}`);
  }
}

export default new ApiService();
