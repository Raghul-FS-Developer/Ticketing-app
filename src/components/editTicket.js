import React, { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import url from "../db";
import { useNavigate, useParams } from "react-router-dom";
function EditTicket() {
  let navigate = useNavigate();
  let params = useParams();
  const credentials = window.localStorage;
  let user = credentials.getItem("user");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  async function getDetails() {
    try {
      let res = await axios.get(`${url}/${params.id}`);

      if (res.data.status === 404) {
        alert(res.data.msg);
        navigate("/view-all-tickets");
      } else {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPriority(res.data.priority);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editTicket(e) {
    e.preventDefault();

    try {
      let res = await axios.put(`${url}/edit-tickets/${params.id}`, {
        title: title,
        description: description,
        priority: priority,
        createdBy: user,
      });

      if (res.status === 200) {
        alert(res.data.message);

        navigate("/view-all-tickets");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-indigo-700 mb-4">
            Update Ticket
          </h1>
          <form className="space-y-4" onSubmit={editTicket}>
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                placeholder="Enter ticket title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                rows="3"
                placeholder="Enter ticket description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              ></textarea>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Priority
              </label>
              <select
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Update Ticket
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditTicket;
