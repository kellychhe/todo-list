const express = require('express') //access express function
const app = express() // app is telling express function to run
const bodyParser = require('body-parser') //access body parser module
const MongoClient = require('mongodb').MongoClient //access mongodb
const {ObjectId} = require('mongodb') //gives access to _id in mongodb
const port = process.env.PORT || 8000

var db //declares variable to use later

require('dotenv').config()
const url = process.env.MONGODB_URL
const dbName = "toDoList"; //name of database

app.listen(port, () => { // listening on port 3000
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });// lets us know we have successfully connected to the database
});

app.set('view engine', 'ejs') // has to come before use, get, and post. tells express to use ejs when we ask it to render
app.use(bodyParser.urlencoded({extended: true})) // body parser will be applied to url
app.use(bodyParser.json()) // body parser will be applied to strigified JSON 
app.use(express.static('public')) //anything in this public folder, it is ran on server immediately no route needed

app.get('/', (req, res) => { //get request for when the page is loaded and url contians '/' -- or invisible slash
  db.collection('tasks').find().toArray((err, result) => { // gathering all the messages in the database and putting them into an array
    if (err) return console.log(err)
    let taskCount = 0
    result.forEach(obj => {if (!obj.taskDone && obj.listItem !== '') taskCount++} )
    res.render('index.ejs', {tasks: result, taskCount: taskCount})
  })
})

app.post('/tasks', (req, res) => { // post request creates a document 
  db.collection('tasks').insertOne({listItem: req.body.listItem, taskDone: false}, (err, result) => { //insert one creates document and adds it to collection is where db info is stored in mongodb
    //user input does not affect thumbup and down because they are hard coded into the message
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/tasks', (req, res) => { // update request after some action
    console.log(req.body)
  db.collection('tasks')
  .findOneAndUpdate({_id: ObjectId(req.body._id)}, { // we are finding the name/message in the db that matches the name/message targeted my main.js event listener
    $set: {  
      taskDone: req.body.check // adds one to thumbUp value
    }
  }, {
    sort: {_id: -1},
    upsert: false 
  }, (err, result) => {
    // console.log(result)
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/tasks', (req, res) => { // a delete request
  db.collection('tasks').findOneAndDelete({_id: ObjectId(req.body._id)}, (err, result) => { // find matching name/message object in database and delete it
    if (err) return res.send(500, err)
    res.send('Task deleted!')
  })
})

app.delete('/tasksAll', (req, res) => { // a delete request
  db.collection('tasks').deleteMany({}, (err, result) => { // find matching name/message object in database and delete it
    if (err) return res.send(500, err)
    res.send('All tasks deleted!')
  })
})

app.delete('/tasksCompleted', (req, res) => { // a delete request
    db.collection('tasks').deleteMany({taskDone: true}, (err, result) => { // find matching name/message object in database and delete it
      if (err) return res.send(500, err)
      res.send('Completed tasks deleted!')
    })
  })