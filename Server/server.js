const express=require("express");
const app=express();
const path=require("path");
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})



app.use(express.json());

// This tells Express to serve any static files it finds in the 'client' directory.
// The path.join() part correctly figures out the path from the 'server' folder 
// up one level and then into the 'client' folder.
app.use(express.static(path.join(__dirname, '../client')));

app.get("/",(req,res)=>{
    // res.render("index.html");
    res.send("woinh");
})

app.post('/api/reports', (req, res) => {
  console.log('Received a new report submission!');
  
  // req.body contains the JSON data sent from the client
  console.log('Report Data:', req.body); 

  // Send a response back to the client to confirm we received it
  res.status(201).json({ message: "Report received successfully!" });
// res.send("Hello");
});