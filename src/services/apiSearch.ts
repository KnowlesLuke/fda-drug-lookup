import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';
import formatTitleCase from '../utils/formatTitleCase';

/**
 * Search result interface
 */
export interface SearchResult {
  product_id: string;
  brand_name: string;
  generic_name: string;
  manufacturer: string;
  product_number: string;
  route: string[];
  dosage_form: string;
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
    const searchQuery : string = `${searchField}${exactMatch}:"${encodeURIComponent(formatTitleCase(query))}"`;

    // Add the additional params
    baseUrl.searchParams.set('search', searchQuery);
    baseUrl.searchParams.set('limit', limit.toString());
    baseUrl.searchParams.set('sort', 'product_ndc:asc');
    
    // Build the API URL with the search field and exact match
    const url : string = baseUrl.toString();

    const response : AxiosResponse<SearchResponse> = await axios.get<SearchResponse>(
      url, {
        timeout: API_CONFIG.TIMEOUT,
      });

    // Group the results by brand name and route - this is to remove duplicates
    const groupedResults = groupDrugsByBrandAndRoute(response.data.results);
    
    return {
      results: groupedResults,
      total: groupedResults.length
    };

  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      console.log('Error message:', error?.response?.data.error);
      throw new Error(error?.response?.data?.error.message || 'An unexpected error occurred');
    }

    throw new Error('An unexpected error occurred');
  }
}

/**
 * Groups drugs by brand name and route
 * @param drugs Array of drugs to group
 * @returns Array of unique drugs grouped by brand name and route
 */
function groupDrugsByBrandAndRoute(drugs: SearchResult[]): SearchResult[] {
  
  const uniqueDrugsByBrandAndRoute = new Map<string, SearchResult>();
    
  drugs.forEach(drug => {
    
    // Create a unique key for the drug by combining the brand name and route
    const uniqueKey = `${formatTitleCase(drug.brand_name)}|${drug.route.join('|')}`;
    
    // If the drug is not already in the map, add it
    if (!uniqueDrugsByBrandAndRoute.has(uniqueKey)) {
      uniqueDrugsByBrandAndRoute.set(uniqueKey, drug);
    }
  });

  // Return the unique drugs
  return Array.from(uniqueDrugsByBrandAndRoute.values());
}

export default searchAPI;