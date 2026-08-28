import React, { useState } from "react";

function BoardForm({ initialData, onSubmit, onClose }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(
        initialData?.description || ""
    );
    const [capacity, setCapacity] = useState(
        initialData?.maxCapacity || ""
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title,
            description,
            maxCapacity: Number(capacity)
        };

        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>
                    {initialData?.id ? "Edit Board" : "Launch Board"}
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="board-title">
                        Board Title
                    </label>

                    <input
                        id="board-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Q3 Strategy Planning"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="board-description">
                        Description
                    </label>

                    <textarea
                        id="board-description"
                        rows="3"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="board-capacity">
                        Max Capacity (Notes)
                    </label>

                    <input
                        id="board-capacity"
                        type="number"
                        value={capacity}
                        onChange={(e) =>
                            setCapacity(e.target.value)
                        }
                        min="1"
                        required
                    />
                </div>

                <button type="submit">
                    {initialData?.id
                        ? "Update Board"
                        : "Launch Board"}
                </button>
            </form>
        </div>
    );
}

export default BoardForm;