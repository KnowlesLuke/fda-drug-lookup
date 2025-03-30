import { GroupByFields } from "../interfaces/searchInterface";

/**
 * Configuration for search criteria and formatting
 */
export interface SearchConfig {
  search_item: string;      // The field to search on (e.g., 'brand_name', 'product_id')
  formatSearchQuery: boolean; // Whether to format the search query in title case
  groupBy: GroupByFields[];       // Fields to group results by (e.g., ['brand_name', 'route'])
}

/**
 * Default search configuration - This is the configuration that will be used if no other configuration is provided
 */
export const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  search_item: 'brand_name',
  formatSearchQuery: true,
  groupBy: ['brand_name', 'generic_name', 'route', 'dosage_form', 'openfda.manufacturer_name'] as GroupByFields[]
};