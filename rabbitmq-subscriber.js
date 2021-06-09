const amqp = require('amqplib/callback_api');
const fs = require('fs');
const yaml = require('js-yaml');

let data;
try {
  let fileContents = fs.readFileSync('./creds.yml', 'utf8');
  data = yaml.load(fileContents);
} catch (e) {
  console.log(e);
}

// Create connection
amqp.connect(data.mqserveraddress, (err, conn) => {
  if (err) throw err;
  // Create channel
  conn.createChannel((err, ch) => {
    if (err) throw err;
    // Name of the queue
    const queueName = "MonitorThis";

    ch.assertQueue(queueName, { durable: false });

    // Receive message
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