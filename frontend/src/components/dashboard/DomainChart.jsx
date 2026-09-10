 import React from "react";

function DomainChart({ data }) {

    const values = Object.values(data || {});

    const max = Math.max(...values, 1);

    return (
        <div className="stat-card">

            <h3>Notes Distribution by theme</h3>

            <div className="domain-chart">

                {Object.entries(data || {}).map(
                    ([colorCode, count]) => {

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
                                        background: colorCode,
                                        height: `${(count / max) * 150}px`
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