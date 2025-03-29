import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';

/**
 * Search result interface
 */
export interface SearchResult {
  id: string;
  brand_name: string;
  generic_name: string;
  manufacturer: string;
  product_number: string;
}

/**
 * Search response interface
 */
interface SearchResponse {
  results: SearchResult[];
  total: number;
}

/**
 * Search parameters interface
 */
export interface SearchParams {
  query: string;
  partialMatch: boolean;
  limit: number;
  searchField: string;
}

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
    const exactMatch : string = partialMatch ? "" : ".exact";

    const baseUrl = new URL(API_CONFIG.BASE_URL);
    const searchQuery : string = `${searchField}${exactMatch}:"${encodeURIComponent(query)}"`;

    // Add the additional params
    baseUrl.searchParams.set('search', searchQuery);
    baseUrl.searchParams.set('limit', limit.toString());
    baseUrl.searchParams.set('sort', 'product_ndc:asc');
    
    // Build the API URL with the search field and exact match
    const url : string = baseUrl.toString();

    const response : AxiosResponse<SearchResponse> = 
      await axios.get<SearchResponse>(url, {
        timeout: API_CONFIG.TIMEOUT,
      });

    return response.data;

  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Search request failed');
    }

    throw new Error('An unexpected error occurred');
  }
}

export default searchAPI;