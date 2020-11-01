// create instanc of AMQP protocol on which Rabbit MQ publishes message
const amqp = require("amqplib");

// Hard Coded Message we are sending to the Queue
//const msg = { number: 19 }

// Message sent as per user input
const msg = { number: process.argv[2] }

// Call function conect
connect();

// Create async connection function
const connect = async () => {


    try {
        // Create Connection
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = connection.createChannel();
        const result = (await channel).assertQueue("jobs");
        (await channel).sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));

        console.log(`Job sent successfully ${msg.number}`);

    } catch (ex) {
        console.error(ex);
    }
}