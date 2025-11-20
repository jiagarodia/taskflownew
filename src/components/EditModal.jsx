// src/components/EditModal.jsx
import React, { useState, useEffect } from "react";

export default function EditModal({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
    }
  }, [initial]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-md w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-3">Edit Task</h3>
        <input
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave({ ...initial, title, description })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
