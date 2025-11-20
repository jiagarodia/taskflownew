import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const nav = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await api.put(`/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) nav("/");
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">TaskFlow</h1>

      {/* Add Task */}
      <form className="flex gap-3 mb-5" onSubmit={addTask}>
        <input
          type="text"
          value={title}
          placeholder="Add task..."
          className="flex-1 p-3 border rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="px-4 bg-green-600 text-white rounded">
          Add
        </button>
      </form>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <button
          className={`px-4 py-1 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`px-4 py-1 rounded ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={`px-4 py-1 rounded ${
            filter === "pending"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            toggle={toggleTask}
            del={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
