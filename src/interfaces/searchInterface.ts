/**
 * Search result interface
 */
export interface SearchResult {
    product_id: string;
    brand_name: string;
    generic_name: string;
    product_number: string;
    route: string[];
    dosage_form: string;
    openfda: {
        manufacturer_name: string[];
    };
  }
  
/**
 * Search response interface
*/
export interface SearchResponse {
    results: SearchResult[];
}

/**
 * Search parameters interface
 */
export interface SearchParams {
    query: string;
    partialMatch: boolean;
    limit: number;
    searchField: string;
    formatSearchQuery: boolean;
    groupBy: GroupByFields[];
}

/**
 * The fields that can be used to group results by
 */ 
export type GroupByFields = keyof SearchResult;