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
    let message = "100";
    // Declare the queue
    ch.assertQueue(queueName, { durable: false });

    // Send message to the queue
    ch.sendToQueue(queueName, Buffer.from(message));
    console.log(" {x} " + message);

    // Close the connection and exit
    setTimeout(() => {
      conn.close();
    }, 500)
  })
})