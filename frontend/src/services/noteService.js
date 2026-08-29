import api from "./api";

const noteService = {
    // GET /notes/board/{boardId}
    getNotesByBoard: async (boardId) => {
        const response = await api.get(
            `/api/notes/board/${boardId}`
        );
        return response.data;
    },

    // POST /notes
    addNote: async (noteData) => {
        const response = await api.post(
            "/api/notes",
            noteData
        );
        return response.data;
    },

    // PUT /notes/{id}/move
    moveNote: async (id, x, y, version) => {
        const response = await api.put(
            `/api/notes/${id}/move`,
            {
                x,
                y,
                version
            }
        );
        return response.data;
    },

    // PUT /notes/{id}/content
    updateNoteContent: async (id, content, version) => {
        const response = await api.put(
            `/notes/${id}/content`,
            {
                content,
                version
            }
        );
        return response.data;
    },

    // DELETE /notes/{id}
    deleteNote: async (id) => {
        const response = await api.delete(
            `/notes/${id}`
        );
        return response.data;
    },

    // POST /notes/{id}/undo
    undoDelete: async (id) => {
        const response = await api.post(
            `/notes/${id}/undo`
        );
        return response.data;
    }
};

export default noteService;