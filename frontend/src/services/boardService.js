 import api from "./api";

const boardService = {
    // POST /boards
    createBoard: async (boardData) => {
        const response = await api.post("/api/boards", boardData);
        return response.data;
    },

    // GET /boards?page={page}&size={size}
    getBoards: async (page = 0, size = 6) => {
        const response = await api.get(
            `/boards?page=${page}&size=${size}`
        );
        return response.data;
    },

    // GET /boards/{id}
    getBoardById: async (id) => {
        const response = await api.get(`/api/boards/${id}`);
        return response.data;
    },

    // GET /insights/board/{id}
    getBoardInsights: async (id) => {
        const response = await api.get(`/api/insights/board/${id}`);
        return response.data;
    },

    // POST /members/invite
    inviteMember: async (boardId, userId) => {
        const response = await api.post(
            `/api/members/invite?boardId=${boardId}&userId=${userId}`
        );
        return response.data;
    },

    // GET /insights/workspace/stats
    getWorkspaceStats: async () => {
        const response = await api.get(
            "/api/insights/workspace/stats"
        );
        return response.data;
    },

    // PUT /boards/{id}/settings
    updateSettings: async (id, maxCapacity, status) => {
        const response = await api.put(
            `/api/boards/${id}/settings?maxCapacity=${maxCapacity}&status=${status}`
        );
        return response.data;
    }
};

export default boardService;