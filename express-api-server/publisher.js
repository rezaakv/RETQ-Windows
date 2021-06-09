module.exports = {
  mqPublish: function(volume) {
    const amqp = require('amqplib/callback_api');
    const fs = require('fs');
    const yaml = require('js-yaml');
    
    let data;
    try {
      let fileContents = fs.readFileSync('../creds.yml', 'utf8');
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
        let message = volume;
        // Declare the queue
        ch.assertQueue(queueName, { durable: false });

        // Send message to the queue
        ch.sendToQueue(queueName, Buffer.from(message));
        console.log(" {x} " + message);

        // Close the connection and exit
        setTimeout(() => {
          conn.close();
        }, 500)
      });

    })
   }
}