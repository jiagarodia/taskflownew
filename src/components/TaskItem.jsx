export default function TaskItem({ task, toggle, del }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <p
          className={`text-lg ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => toggle(task._id)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => del(task._id)}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
