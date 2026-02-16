import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
