import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/apiConfig';
import formatTitleCase from '../utils/formatTitleCase';
import { SearchParams, SearchResult, SearchResponse, GroupByFields } from '../interfaces/searchInterface';

/**
 * Performs a search query against the API
 * @param params Search parameters
 * @returns Promise with search results
 * @throws Error if the request fails
 */
async function searchAPI(params: SearchParams): Promise<SearchResult[]> {
  try {

    const { groupBy } = params;

    const url : string = buildAPIUrl(params);

    const response : AxiosResponse<SearchResponse> = await axios.get<SearchResponse>(url, 
      {
        timeout: API_CONFIG.TIMEOUT,
      });

    // Return the grouped results if the groupBy param is provided 
    // Otherwise return the ungrouped results
    return groupBy.length > 0 
      ? groupResults(groupBy, response.data.results)
      : response.data.results;

  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      console.log('Error message:', error?.response?.data?.error);
      throw new Error(error?.response?.data?.error?.message || 'An unexpected error occurred. Please try again.');
    }

    throw new Error('An unexpected error occurred. Please try again.');
  }
}

/**
 * Builds the API URL
 * @param params Search parameters
 * @returns string - The API URL
 */
function buildAPIUrl(params: SearchParams): string {

  const { query, partialMatch, limit, searchField, formatSearchQuery } = params;

  // Search for exact matches if partialMatch is false
  const exactMatch : string = partialMatch ? "" : ".exact";

  // Format the search query if formatSearchQuery is true
  const formattedQuery : string = formatSearchQuery ? formatTitleCase(query) : query;

  // Build the base url with the search field, exact match, and query
  const baseUrl = new URL(API_CONFIG.BASE_URL);
  const searchQuery : string = `${searchField}${exactMatch}:"${formattedQuery}"`;

  // Add the additional params
  baseUrl.searchParams.set('search', searchQuery);
  baseUrl.searchParams.set('limit', limit.toString());
  baseUrl.searchParams.set('sort', 'product_ndc:asc');

  return baseUrl.toString();
}


/**
 * Groups drugs by grouped by fields
 * @param groupBy Array of fields to group by
 * @param drugs Array of drugs to group
 * @returns Array of unique drugs grouped by grouped by specified fields
 */
function groupResults(groupBy: GroupByFields[], drugs: SearchResult[]): SearchResult[] {
  
  // Create a map to store unique drugs
  // Using map as it is faster than an array for this use case
  const uniqueDrugs = new Map<string, SearchResult>();

  drugs.forEach(drug => {
    const uniqueKey = groupBy
      .map(field => {
        const value = getFieldValue(drug, field);
        return Array.isArray(value) ? value.join('|') : value;
      })
      .join('|');

    if (!uniqueDrugs.has(uniqueKey)) {
      uniqueDrugs.set(uniqueKey, drug);
    }
  });

  // Return the unique drugs as an array
  return [...uniqueDrugs.values()];
}


/**
 * Gets the value of a field from a drug
 * @param drug The drug to get the value from
 * @param field The field to get the value from
 * @returns The value of the field
 */
function getFieldValue(drug: SearchResult, field: GroupByFields): string | string[] {

  // If the field is a nested field, get the value from the nested field
  if (field.includes('.')) {
    const [parent, child] = field.split('.');
    return (drug as any)[parent]?.[child] || [];
  }

  // Otherwise, return the value of the field
  return (drug as any)[field];
}

export default searchAPI;