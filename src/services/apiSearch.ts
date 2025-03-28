import axios from 'axios';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export interface SearchParams {
  query: string;
  partialMatch: boolean;
  limit?: number;
}

// Base API URL - should be moved to environment variables in production
const API_BASE_URL = 'https://api.fda.gov/drug/ndc.json?search=brand_name';

/**
 * Performs a search query against the API
 * @param params Search parameters
 * @returns Promise with search results
 * @throws Error if the request fails
 */
async function searchAPI(params: SearchParams): Promise<SearchResponse> {
  try {

    // Search for exact matches if partialMatch is false
    const response = await axios.get<SearchResponse>(
        `${API_BASE_URL}:"${params.query}"`, {
      params: {
        limit: params.limit || 10,
      },
      timeout: 5000, // 5 second timeout
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Search request failed');
        }
        throw new Error('An unexpected error occurred');
    }
    throw error;
  }
}

export default searchAPI;