import { useState } from "react";
import searchAPI, { SearchResult } from "../services/apiSearch";
import SearchResults from "../features/SearchResults";
import LoadingSpinner from "../ui/LoadingSpinner";
function Home() {

    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [partialMatch, setPartialMatch] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(25);
    const limitOptions: number[] = [5, 10, 25, 50];
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

    const handleSearch = async () => {

        if (!search.trim()) return;

        // Reset loading and error states
        setIsLoading(true);
        setError(null);
        setResults([]);
        setSearchPerformed(false);

        try {
            const results = await searchAPI({ query: search, partialMatch: partialMatch, searchField: "brand_name" });
            setResults(results.results);
            setSearchPerformed(true);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="search-container">
                <h1>Search</h1>
                <div className="search-controls">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="search-input"
                    />
                    <select 
                        value={limit} 
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="limit-select"
                    >
                        {limitOptions.map(value => (
                            <option key={value} value={value}>
                                {value} results
                            </option>
                        ))}
                    </select>
                    <label className="partial-match-label">
                        <input
                            type="checkbox"
                            checked={partialMatch}
                            onChange={(e) => setPartialMatch(e.target.checked)}
                        />
                        Include partial matches
                    </label>
                    <div className="search-button-container">
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            {isLoading && <LoadingSpinner />}

            {results.length > 0 && (
                <SearchResults
                    results={results}
                    isLoading={isLoading}
                    error={error}
                    searchPerformed={searchPerformed}
                />
            )}
        </>
    )
}

export default Home;