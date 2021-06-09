const amqp = require('amqplib/callback_api')

// Create connection
amqp.connect('localhost',
 (err, conn) => {
  if (err) throw err;
  // Create channel
  conn.createChannel((err, ch) => {
    if (err) throw err;
    // Name of the queue
    const queueName = "MonitorThis";

    ch.assertQueue(queueName, { durable: false });

    // Recieve message
    ch.consume(queueName,(message) => {
      console.log("Recieved : " + message.content.toString());
      const spawn = require("child_process").spawn;
      const pythonProcess = spawn('python',["windows_audio_controller.py", message.content.toString()]);
      pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log("Python says: \n" + data + "Python Done!");
      });

    }, {
      noAck: true
    })
  })
})