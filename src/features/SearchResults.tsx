import { SearchResult } from "../interfaces/searchInterface";

interface SearchResultsProps {
    results: SearchResult[];
    isLoading: boolean;
    error: string | null;
    searchPerformed: boolean;
}

function SearchResults({ results, isLoading, error, searchPerformed }: SearchResultsProps) {

    // Check if the search is still loading
    // If so, display a loading message
    if (isLoading) return <div className="loading">Loading...</div>;

    // Check if the results are empty and the search has been performed
    // If so, display a message indicating no results were found
    if (!isLoading && results.length === 0 && searchPerformed) {
        return (
            <div className="error-message">Your search returned no results. Please try again.</div>
        );
    }

    return (
        <div className="results-section">
            {error && <div className="error-message">{error}</div>}
            {searchPerformed && !isLoading && !error && results.length > 0 && (
                <>
                    <div className="results-summary">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </div>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Brand Name</th>
                                <th>Generic Name</th>
                                <th>Manufacturer Name</th>
                                <th>Dosage Form</th>
                                <th>Administration Route</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.product_id}>
                                    <td>{result.brand_name}</td>
                                    <td>{result.generic_name}</td>
                                    <td className="multi-line">
                                        {result.openfda?.manufacturer_name?.join('\n') || 'N/A'}
                                    </td>
                                    <td>{result.dosage_form}</td>
                                    <td>{result.route.join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default SearchResults; 