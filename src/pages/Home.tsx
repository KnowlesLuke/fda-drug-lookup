import { useState } from "react";
import searchAPI from "../services/apiSearch";
import SearchResults from "../features/SearchResults";
import { DEFAULT_SEARCH_CONFIG, SearchConfig } from "../config/searchConfig";
import { SearchResult, SearchParams } from "../interfaces/searchInterface";

function Home() {

    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [partialMatch, setPartialMatch] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(25);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

    // Options for the number of results to display
    const limitOptions: number[] = [5, 10, 25, 50];

    const clearSearch = () => {
        setSearch("");
        setResults([]);
        setLimit(25);
        setPartialMatch(false);
        setIsLoading(false);
        setError(null);
        setSearchPerformed(false);
    }

    const handleSearch = async () => {

        if (!search.trim()) return;

        // Set the loading and error states
        setIsLoading(true);
        setSearchPerformed(true);
        setError(null);
        setResults([]);

        // Get the default search config - This is set up for this specific use case
        const searchConfig : SearchConfig = DEFAULT_SEARCH_CONFIG;

        // Create the search parameters
        const searchParams : SearchParams = {
            query: search,
            partialMatch,
            searchField: searchConfig.search_item,
            formatSearchQuery: searchConfig.formatSearchQuery,
            groupBy: searchConfig.groupBy,
            limit
        }

        try {
            const results = await searchAPI(searchParams);
            setResults(results);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    // Handle the Enter key being pressed
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="search-container">
                <div className="search-controls">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
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
                        <button className="clear-btn" onClick={clearSearch}>Clear</button>
                        <button className="search-btn" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            <SearchResults
                results={results}
                isLoading={isLoading}
                error={error}
                searchPerformed={searchPerformed}
            />
        </>
    )
}

export default Home;