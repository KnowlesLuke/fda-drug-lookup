import { useState } from "react";
import searchAPI from "../services/apiSearch";
import LoadingSpinner from "../ui/LoadingSpinner";

function Home() {

    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [partialMatch, setPartialMatch] = useState<boolean>(true);

    const handleSearch = async () => {

        if (!search.trim()) return;

        // Reset loading and error states
        setIsLoading(true);
        setError(null);

        try {
            const results = await searchAPI({ query: search, partialMatch: partialMatch });
            console.log(results);
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
            <div className="search-results">
                {isLoading && <LoadingSpinner />}
            </div>
        </>
    )
}

export default Home;