import React, { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import url from "../db";
import { useNavigate } from "react-router-dom";
function ViewAllTickets() {
      const credentials = window.localStorage;
  let user = credentials.getItem("user");

    let navigate = useNavigate()
  let [ticket, setTicket] = useState();

  function authenticate(createdBy,id){
 
    if(user === createdBy){
        navigate(`/edit-tickets/${id}`)

    }else{
        alert('you can only edit your tickets')
    }
  }
  let getTickets = async () => {
    try {
      let res = await axios.get(`${url}/`);
      setTicket(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteTicket(createdBy,id){
    try {
        if(user === createdBy){
        
        let res = await axios.delete(`${url}/delete/${id}`)
        alert(res.data.message)
        getTickets()

    }else{
        alert('you can only delete your tickets')
    }

        
    } catch (error) {
         alert(error.response.data.error);
    }
    

  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-emerald-700 mb-4">
            All Tickets
          </h1>

          <div className="space-y-4">
            {ticket?.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-2"
              >
                {/* Ticket Info */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {ticket.title}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-lg ${
                      ticket.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : ticket.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>

                <p className="text-sm text-gray-600">{ticket.description}</p>
                <p className="text-xs text-gray-500">
                  Created By: {ticket.createdBy}
                </p>
                <p className="text-xs text-gray-500">
                  Created At:{" "}
                  {new Date(ticket.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long", 
                    year: "numeric",
                  })}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer" onClick={()=>authenticate(ticket.createdBy,ticket.id)}>
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer" onClick={()=>deleteTicket(ticket.createdBy,ticket.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAllTickets;
