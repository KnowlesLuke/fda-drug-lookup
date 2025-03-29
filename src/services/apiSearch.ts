import axios from 'axios';

export interface SearchResult {
  id: string;
  brand_name: string;
  generic_name: string;
  manufacturer: string;
  product_number: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export interface SearchParams {
  query: string;
  partialMatch: boolean;
  limit?: number;
  searchField: string;
}

// Base API URL - should be moved to environment variables in production
const API_BASE_URL = 'https://api.fda.gov/drug/ndc.json?search=';

/**
 * Performs a search query against the API
 * @param params Search parameters
 * @returns Promise with search results
 * @throws Error if the request fails
 */
async function searchAPI(params: SearchParams): Promise<SearchResponse> {
  try {

    const { query, partialMatch, limit, searchField } = params;

    // Search for exact matches if partialMatch is false
    const exactMatch = partialMatch ? "" : ".exact";

    // Build the API URL with the search field and exact match
    const url = `${API_BASE_URL}${searchField}${exactMatch}:"${encodeURIComponent(query)}"`;

    const response = await axios.get<SearchResponse>(
      url, {
        params: {
          sort: 'product_ndc:asc',
          limit: limit || 10,
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