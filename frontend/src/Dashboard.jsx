 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import DomainChart from "./components/dashboard/DomainChart";
import BoardForm from "./components/board/BoardForm";

import {
    fetchBoards,
    createBoard,
    fetchWorkspaceStats
} from "./store/slices/boardSlice";

function Dashboard() {
    const dispatch = useDispatch();

    // -----------------------------------------
    // Redux state
    // -----------------------------------------
    const auth = useSelector((state) => state.auth);
    const boardState = useSelector((state) => state.boards);

    const user = auth?.user;

    const boards = boardState?.items || [];
    const loading = boardState?.loading || false;

    const totalElements =
        boardState?.totalElements || 0;

    const totalPages =
        boardState?.totalPages || 0;

    const workspaceStats =
        boardState?.workspaceStats || {};

    // -----------------------------------------
    // Local state
    // -----------------------------------------
    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // -----------------------------------------
    // Fetch boards and workspace statistics
    // -----------------------------------------
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

    // -----------------------------------------
    // Redirect if not logged in
    // -----------------------------------------
    if (!auth?.token) {
        return <Navigate to="/login" replace />;
    }

    // -----------------------------------------
    // Create new board
    // -----------------------------------------
    const handleCreateBoard = async (boardData) => {
        const result = await dispatch(
            createBoard(boardData)
        );

        // Only close modal if creation succeeded
        if (createBoard.fulfilled.match(result)) {
            setShowModal(false);

            // Refresh boards
            dispatch(
                fetchBoards({
                    page: page,
                    size: 6
                })
            );

            // Refresh workspace statistics
            dispatch(fetchWorkspaceStats());
        }
    };

    // -----------------------------------------
    // Capacity percentage
    // -----------------------------------------
    const getCapacityPercentage = (current, max) => {
        if (!max || max <= 0) {
            return 0;
        }

        return Math.min(
            (current / max) * 100,
            100
        );
    };

    // -----------------------------------------
    // Capacity color
    // -----------------------------------------
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

    // -----------------------------------------
    // Statistics
    // -----------------------------------------
    const activeBoards =
        totalElements > 0
            ? totalElements
            : boards.length;

    const totalNotes =
        workspaceStats?.totalNotes || 0;

    return (
        <div className="dashboard">

            {/* =====================================
                DASHBOARD HEADER
            ====================================== */}
            <div className="dashboard-header">

                <div>
                    <h1>Project Workspace</h1>

                    <span>
                        Welcome back, {user?.username}!
                    </span>
                </div>

                {/* New Board button only for Facilitator */}
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


            {/* =====================================
                STATISTICS
            ====================================== */}
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


            {/* =====================================
                DOMAIN CHART
            ====================================== */}
            <DomainChart data={workspaceStats} />


            {/* =====================================
                LOADING STATE
            ====================================== */}
            {loading && (
                <div className="loading-state">

                    <div className="spinner"></div>

                    <p>
                        Synchronizing Workspace...
                    </p>

                </div>
            )}


            {/* =====================================
                EMPTY WORKSPACE
            ====================================== */}
            {!loading &&
                boards.length === 0 && (
                    <div className="empty-state">
                        Your workspace is empty
                    </div>
                )}


            {/* =====================================
                BOARD GRID
            ====================================== */}
            {!loading &&
                boards.length > 0 && (
                    <div className="boards-grid">

                        {boards.map((board) => {

                            const currentNoteCount =
                                board.currentNoteCount || 0;

                            const maxNoteCapacity =
                                board.maxNoteCapacity || 0;

                            const percentage =
                                getCapacityPercentage(
                                    currentNoteCount,
                                    maxNoteCapacity
                                );

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


                                    {/* =================================
                                        CAPACITY
                                    ================================== */}
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


                                    {/* =================================
                                        LAUNCH BOARD
                                    ================================== */}
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


            {/* =====================================
                PAGINATION
            ====================================== */}
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
                                page >=
                                totalPages - 1
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


            {/* =====================================
                NEW BOARD MODAL
            ====================================== */}
            {showModal &&
                user?.role === "FACILITATOR" && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <BoardForm
                                onSubmit={handleCreateBoard}
                                onClose={() =>
                                    setShowModal(false)
                                }
                            />

                        </div>

                    </div>
                )}

        </div>
    );
}

export default Dashboard;