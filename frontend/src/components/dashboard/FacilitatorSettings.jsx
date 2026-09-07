 
import React, { useEffect, useState } from "react";
import boardService from "../../services/boardService";
import SearchFilterBar from "../../components/common/SearchFilterBar";

function FacilitatorSettings() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [toast, setToast] = useState({
        show: false,
        message: "",
        isError: false
    });

    const showToast = (message, isError = false) => {
        setToast({
            show: true,
            message,
            isError
        });

        setTimeout(() => {
            setToast({
                show: false,
                message: "",
                isError: false
            });
        }, 3000);
    };

    useEffect(() => {
        const loadBoards = async () => {
            try {
                setLoading(true);

                const response = await boardService.getBoards(0, 50);

                const data = response?.data ?? response;

                setBoards(
                    Array.isArray(data)
                        ? data
                        : data?.content || []
                );
            } catch (error) {
                showToast("Failed to fetch boards", true);
            } finally {
                setLoading(false);
            }
        };

        loadBoards();
    }, []);

    const handleUpdateCapacity = async (board) => {
        const capacity = Number(board.maxNoteCapacity);

        if (!capacity || capacity < 1) {
            showToast("Capacity must be greater than 0", true);
            return;
        }

        try {
            await boardService.updateSettings(
                board.id,
                capacity,
                null
            );

            showToast("Capacity updated successfully");
        } catch (error) {
            showToast("Failed to update capacity", true);
        }
    };

    const handleArchiveBoard = async (boardId) => {
        try {
            await boardService.updateSettings(
                boardId,
                null,
                "ARCHIVED"
            );

            setBoards((prevBoards) =>
                prevBoards.filter(
                    (board) => board.id !== boardId
                )
            );

            showToast("Board archived");
        } catch (error) {
            showToast("Failed to archive board", true);
        }
    };

    const handleCapacityChange = (boardId, value) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) =>
                board.id === boardId
                    ? {
                          ...board,
                          maxNoteCapacity: value
                      }
                    : board
            )
        );
    };

    // Search + status filtering
    const filteredBoards = boards.filter((board) => {
        const matchesSearch = board.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" ||
            board.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="loading-spinner">
                Loading...
            </div>
        );
    }

    return (
        <div className="facilitator-settings">

            <h1>Facilitator Controls</h1>

            <SearchFilterBar
                placeholder="Search boards..."
                onSearch={setSearchTerm}
                onFilterChange={setStatusFilter}
            />

            <table className="board-table">

                <thead>
                    <tr>
                        <th>Board Title</th>
                        <th>Notes Count</th>
                        <th>Max Capacity</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {filteredBoards.length === 0 ? (

                        <tr>
                            <td colSpan="4">
                                {searchTerm || statusFilter !== "ALL"
                                    ? "No boards match your search or filter."
                                    : "No boards found"}
                            </td>
                        </tr>

                    ) : (

                        filteredBoards.map((board) => (

                            <tr key={board.id}>

                                <td>
                                    {board.title}
                                </td>

                                <td>
                                    {board.currentNoteCount ?? 0}
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        value={
                                            board.maxNoteCapacity ?? ""
                                        }
                                        min="1"
                                        onChange={(e) =>
                                            handleCapacityChange(
                                                board.id,
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handleUpdateCapacity(board)
                                        }
                                    />
                                </td>

                                <td>
                                    <button
                                        className="btn-danger-soft"
                                        onClick={() =>
                                            handleArchiveBoard(
                                                board.id
                                            )
                                        }
                                    >
                                        Archive
                                    </button>
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            {toast.show && (
                <div
                    className="toast-undo"
                    style={{
                        background: toast.isError
                            ? "#ef4444"
                            : undefined
                    }}
                >
                    {toast.message}
                </div>
            )}

        </div>
    );
}

export default FacilitatorSettings;
 
 
 