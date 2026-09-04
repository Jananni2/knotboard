 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import DomainChart from "./components/dashboard/DomainChart";
import EmptyState  from "./components/common/EmptyState";

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

    const boards = boardState?.items || [];
    const loading = boardState?.loading || false;
    const totalElements = boardState?.totalElements || 0;
    const totalPages = boardState?.totalPages || 0;
    const workspaceStats = boardState?.workspaceStats || {};

    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [newBoard, setNewBoard] = useState({
        title: "",
        description: "",
        maxNoteCapacity: 5
    });

    /*
     * Fetch boards and workspace statistics.
     *
     * This MUST be before the conditional return because
     * React hooks cannot be called conditionally.
     */
    
    useEffect(() => {
        if (auth?.token) {
            dispatch(
                fetchBoards({
                    page: page,
                    size: 6
                })
            );

            dispatch(fetchWorkspaceStats());
        }
    }, [dispatch, page, auth?.token]);

    /*
     * Private route behavior.
     * If there is no authentication token,
     * redirect to login.
     */
    if (!auth?.token) {
        return <Navigate to="/login" replace />;
    }

    /*
     * Handle New Board form changes.
     */
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

    /*
     * Create a new board.
     */
    const handleCreateBoard = async (e) => {
        e.preventDefault();

        await dispatch(createBoard(newBoard));

        setNewBoard({
            title: "",
            description: "",
            maxNoteCapacity: 5
        });

        setShowModal(false);

        dispatch(
            fetchBoards({
                page: page,
                size: 6
            })
        );

        dispatch(fetchWorkspaceStats());
    };

    /*
     * Capacity percentage.
     */
    // const getCapacityPercentage = (current, max) => {
    //     if (!max || max <= 0) {
    //         return 0;
    //     }

    //     return Math.min(
    //         (current / max) * 100,
    //         100
    //     );
    // };

    /*
     * Capacity color according to SRS.
     *
     * > 90%  = red
     * >= 70% = amber
     * < 70%  = green
     */
    const getCapacityColor = (current, max) => {
        if (!max || max <= 0) {
            return "#10b981";
        }

        const percentage =
            (current / max) * 100;

        if (percentage > 90) {
            return "#ef4444";
        }

        if (percentage >= 70) {
            return "#159e0b";
        }

        return "#10b981";
    };

    const activeBoards =
        totalElements > 0
            ? totalElements
            : boards.length;

    const totalNotes =
        workspaceStats?.totalNotes || 0;

    return (
        <div className="dashboard">

            {/* Dashboard Header */}
            <div className="dashboard-header">

                <div>
                    <h1>Project Workspace</h1>

                    <span>
    Welcome back, {user?.username}!
</span>
                </div>

                {user?.role === "FACILITATOR" && (
                    <button
                        type="button"
                        className="btn-primary-flex"
                        onClick={() =>
                            setShowModal(true)
                        }
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

 <DomainChart data={workspaceStats} />

            {/* Loading State */}
            {loading && (
                <div className="loading-state">

                    <div className="spinner"></div>

                    <p>
                        Synchronizing Workspace...
                    </p>

                </div>
            )}


            {/* Empty Workspace */}
            {!loading &&
                boards.length === 0 && (
                    <div className="empty-state">
                        Your workspace is empty
                    </div>
                )}


            {/* Board Grid */}
            {!loading &&
                boards.length > 0 && (
                    <div className="boards-grid">

                        {boards.map((board) => {

                            const currentNoteCount =
                                board.currentNoteCount || 0;

                            const maxNoteCapacity =
                                board.maxNoteCapacity || 0;

                            // const percentage =
                            //     getCapacityPercentage(
                            //         currentNoteCount,
                            //         maxNoteCapacity
                            //     );

                            const capacityColor =
                                getCapacityColor(
                                    currentNoteCount,
                                    maxNoteCapacity
                                );

                            return (
                                <div
                                    className="board-card"
                                    key={board.id}
                                >

                                    {/* Board title and status */}
                                    <div className="board-card-header">

                                        <h2>
                                            {board.title}
                                        </h2>

                                        <span className="status-tag">
                                            {board.status}
                                        </span>

                                    </div>


                                    {/* Description */}
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
                                                {currentNoteCount}
                                                /
                                                {maxNoteCapacity}
                                            </span>

                                        </div>

                                        <div className="capacity-bar">

                                            <div
                                                className="capacity-fill"
                                                style={{
                                                    width:
                                                        `${percentage}%`,
                                                    backgroundColor:
                                                        capacityColor
                                                }}
                                            />

                                        </div>

                                    </div>


                                    {/* Launch Board */}
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
            {!loading &&
                totalPages > 1 && (
                    <div className="pagination">

                        <button
                            type="button"
                            disabled={page === 0}
                            onClick={() =>
                                setPage(
                                    (previous) =>
                                        previous - 1
                                )
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={
                                page >= totalPages - 1
                            }
                            onClick={() =>
                                setPage(
                                    (previous) =>
                                        previous + 1
                                )
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

                            {/* Modal Header */}
                            <div className="modal-header">

                                <h2>
                                    New Board
                                </h2>

                                <button
                                    type="button"
                                    aria-label="Close"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>


                            {/* Board Form */}
                            <form
                                onSubmit={
                                    handleCreateBoard
                                }
                            >

                                {/* Title */}
                                <div className="form-group">

                                    <label htmlFor="board-title">
                                        Board Title
                                    </label>

                                    <input
                                        id="board-title"
                                        name="title"
                                        type="text"
                                        placeholder="eg, Sprint Planning"
                                        value={
                                            newBoard.title
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* Description */}
                                <div className="form-group">

                                    <label htmlFor="board-description">
                                        Description
                                    </label>

                                    <textarea
                                        id="board-description"
                                        name="description"
                                        rows="3"
                                        placeholder="What is this session about?"
                                        value={
                                            newBoard.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>
 
                                {/* Capacity */}
                                <div className="form-group">

                                    <label htmlFor="board-capacity">
                                        Max Capacity (Notes)
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
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* Submit */}
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