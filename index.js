let express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
let app = express()
let port = 4000
const Ticket = require("./model/tickets"); 

require("dotenv").config();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.url).then(()=>console.log('DB is connected'))

app.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/:id", async (req, res) => {
    
    try {
        const ticket = await Ticket.findOne({ id: req.params.id });
        
        if (ticket == null) {
       
        
      return res.json({ status:404,msg: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
  
    res.status(500).json({ error: err.message });
  }
});

app.post("/create-ticket", async (req, res) => {
  try {
    
     const { title, description, priority, status, createdBy } = req.body;

    const tick = new Ticket({
      title,
      description,
      priority,
      status,
      createdBy,
    });

    const savedTicket = await tick.save();  
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PUT update ticket
app.put("/edit-tickets/:id", async (req, res) => {
  try {
    
    const updatedTicket = await Ticket.findOneAndUpdate(
      { id: req.params.id }, // match by uuid
      req.body,
      { new: true } // return updated doc
    );

    if (updatedTicket) {
      return res.status(200).json({ message: "Ticket updated successfully" });
    }else if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
    
  }
});

// 4. DELETE ticket
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTicket = await Ticket.findOneAndDelete({ id: req.params.id });

    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(port,()=>console.log('server is up in port',port))