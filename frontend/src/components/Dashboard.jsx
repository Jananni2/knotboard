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

    // MUST be before the conditional return
    useEffect(() => {
        if (auth?.token) {
            dispatch(fetchBoards({ page, size: 6 }));
            dispatch(fetchWorkspaceStats());
        }
    }, [dispatch, page, auth?.token]);

    // Redirect unauthenticated users
    if (!auth?.token) {
        return <Navigate to="/login" replace />;
    }

     