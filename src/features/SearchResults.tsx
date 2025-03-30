import { SearchResult } from "../services/apiSearch";

interface SearchResultsProps {
    results: SearchResult[];
    isLoading: boolean;
    error: string | null;
    searchPerformed: boolean;
}

function SearchResults({ results, isLoading, error, searchPerformed }: SearchResultsProps) {

    return (
        <div className="results-section">
            {error && <div className="error-message">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}
            {!isLoading && !error && results.length === 0 && searchPerformed && (
                <div className="no-results">No results found</div>
            )}
            {!isLoading && !error && results.length > 0 && (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Brand Name</th>
                            <th>Generic Name</th>
                            <th>Dosage Form</th>
                            <th>Administration Route</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.product_id}>
                                <td>{result.brand_name}</td>
                                <td>{result.generic_name}</td>
                                <td>{result.dosage_form}</td>
                                <td>{result.route.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchResults; 