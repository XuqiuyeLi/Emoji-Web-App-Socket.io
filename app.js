const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));


const racers = {'racer1':0, 'racer2':0};
io.on('connection', (socket) => {
 
    io.emit('click', racers);
 
    console.log(socket.id, 'connected');
    socket.on('click', (data) => {
        racers[data] += 5;
        io.emit('click', racers);
        console.log(data);
    });
});

// server looks in the env for the port number!
server.listen(process.env.PORT);