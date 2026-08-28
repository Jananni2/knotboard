import React from "react";

function SearchFilterBar({
    onSearch,
    onFilterChange,
    placeholder
}) {
    return (
        <div className="search-filter-bar">

            <input
                type="text"
                placeholder={placeholder || "Search"}
                onChange={(e) =>
                    onSearch(e.target.value)
                }
            />

            <select
                onChange={(e) =>
                    onFilterChange(e.target.value)
                }
                defaultValue="ALL"
            >
                <option value="ALL">
                    All Status
                </option>

                <option value="ACTIVE">
                    Active
                </option>

                <option value="ARCHIVED">
                    Archived
                </option>
            </select>

        </div>
    );
}

export default SearchFilterBar;