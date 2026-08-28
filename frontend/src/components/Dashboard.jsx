 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import {
    fetchBoards,
    createBoard,
    fetchWorkspaceStats
} from "./store/slices/boardSlice";

function Dashboard() {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const boardState = useSelector((state) => state.boards);

    const user = auth?.user;

    const {
        items: boards = [],
        loading = false,
        totalElements = 0,
        totalPages = 0,
        workspaceStats = {}
    } = boardState || {};

    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [newBoard, setNewBoard] = useState({
        title: "",
        description: "",
        maxNoteCapacity: 5
    });

    // Redirect if not authenticated
    if (!auth?.token) {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        dispatch(fetchBoards({ page, size: 6 }));
        dispatch(fetchWorkspaceStats());
    }, [dispatch, page]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewBoard((prev) => ({
            ...prev,
            [name]:
                name === "maxNoteCapacity"
                    ? Number(value)
                    : value
        }));
    };

    const handleCreateBoard = async (e) => {
        e.preventDefault();

        await dispatch(createBoard(newBoard));

        setNewBoard({
            title: "",
            description: "",
            maxNoteCapacity: 5
        });

        setShowModal(false);

        dispatch(fetchBoards({ page, size: 6 }));
        dispatch(fetchWorkspaceStats());
    };

    const getCapacityColor = (current, max) => {
        if (!max || max <= 0) {
            return "#10b981";
        }

        const percentage = (current / max) * 100;

        if (percentage > 90) {
            return "#ef4444";
        }

        if (percentage >= 70) {
            return "#159e0b";
        }

        return "#10b981";
    };

    const getCapacityPercentage = (current, max) => {
        if (!max || max <= 0) {
            return 0;
        }

        return Math.min((current / max) * 100, 100);
    };

    const activeBoards =
        totalElements || boards.length;

    const totalNotes =
        workspaceStats?.totalNotes || 0;

    return (
        <div className="dashboard">

            {/* Dashboard Header */}
            <div className="dashboard-header">

                <div>
                    <h1>Project Workspace</h1>

                    <span>
                        Welcome back, {user?.username}
                    </span>
                </div>

                {user?.role === "FACILITATOR" && (
                    <button
                        type="button"
                        className="btn-primary-flex"
                        onClick={() => setShowModal(true)}
                    >
                        + New Board
                    </button>
                )}

            </div>

            {/* Statistics */}
            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Active Boards</h3>
                    <p>{activeBoards}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Notes Checked</h3>
                    <p>{totalNotes}</p>
                </div>

            </div>

            {/* Loading */}
            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Synchronizing Workspace...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && boards.length === 0 && (
                <div className="empty-state">
                    Your workspace is empty
                </div>
            )}

            {/* Boards */}
            {!loading && boards.length > 0 && (
                <div className="boards-grid">

                    {boards.map((board) => {

                        const current =
                            board.currentNoteCount || 0;

                        const max =
                            board.maxNoteCapacity || 0;

                        const percentage =
                            getCapacityPercentage(
                                current,
                                max
                            );

                        const capacityColor =
                            getCapacityColor(
                                current,
                                max
                            );

                        return (
                            <div
                                className="board-card"
                                key={board.id}
                            >

                                <div className="board-card-header">

                                    <h2>
                                        {board.title}
                                    </h2>

                                    <span className="status-tag">
                                        {board.status}
                                    </span>

                                </div>

                                <p className="board-description">
                                    {board.description}
                                </p>

                                {/* Capacity */}
                                <div className="capacity-section">

                                    <div className="capacity-label">
                                        <span>
                                            Capacity
                                        </span>

                                        <span>
                                            {current}/{max}
                                        </span>
                                    </div>

                                    <div className="capacity-bar">
                                        <div
                                            className="capacity-fill"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor:
                                                    capacityColor
                                            }}
                                        />
                                    </div>

                                </div>

                                <Link
                                    to={`/board/${board.id}`}
                                    className="launch-session"
                                >
                                    Launch Session
                                </Link>

                            </div>
                        );
                    })}

                </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="pagination">

                    <button
                        type="button"
                        disabled={page === 0}
                        onClick={() =>
                            setPage((p) => p - 1)
                        }
                    >
                        Previous
                    </button>

                    <span>
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={page >= totalPages - 1}
                        onClick={() =>
                            setPage((p) => p + 1)
                        }
                    >
                        Next
                    </button>

                </div>
            )}

            {/* New Board Modal */}
            {showModal &&
                user?.role === "FACILITATOR" && (
                    <div className="modal-overlay">

                        <div className="modal">

                            <div className="modal-header">

                                <h2>
                                    New Board
                                </h2>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    aria-label="Close"
                                >
                                    ×
                                </button>

                            </div>

                            <form
                                onSubmit={
                                    handleCreateBoard
                                }
                            >

                                <div className="form-group">

                                    <label htmlFor="board-title">
                                        Title
                                    </label>

                                    <input
                                        id="board-title"
                                        name="title"
                                        type="text"
                                        placeholder="eg, Sprint Planning"
                                        value={newBoard.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="board-description">
                                        Description
                                    </label>

                                    <textarea
                                        id="board-description"
                                        name="description"
                                        placeholder="What is this session about?"
                                        value={
                                            newBoard.description
                                        }
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="form-group">

                                    <label htmlFor="board-capacity">
                                        Max Capacity
                                    </label>

                                    <input
                                        id="board-capacity"
                                        name="maxNoteCapacity"
                                        type="number"
                                        min="5"
                                        max="500"
                                        value={
                                            newBoard.maxNoteCapacity
                                        }
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary-flex"
                                >
                                    Create Board
                                </button>

                            </form>

                        </div>

                    </div>
                )}

        </div>
    );
}

export default Dashboard;