 import React from "react";

function DomainChart({ data }) {

    // data example:
    // {
    //     red: 10,
    //     blue: 5,
    //     green: 8,
    //     yellow: 3
    // }

    const values = Object.values(data || {});

    const max = Math.max(...values, 1);

    return (
        <div className="stat-card">

            <h3>Notes Distribution by Theme</h3>

            <div className="domain-chart">

                {Object.entries(data || {}).map(
                    ([colorCode, count]) => {

                        const height =
                            (count / max) * 100;

                        return (
                            <div
                                key={colorCode}
                                className="domain-bar-container"
                            >

                                {/* Count above bar */}
                                <span className="domain-count">
                                    {count}
                                </span>

                                {/* Bar */}
                                <div
                                    className="domain-bar"
                                    style={{
                                        height: `${height}%`,
                                        background: colorCode
                                    }}
                                />

                                {/* Theme name */}
                                <span className="domain-label">
                                    {colorCode}
                                </span>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}

export default DomainChart;