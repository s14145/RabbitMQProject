const amqp = require("amqplib");

connect();

const connect = async () => {

    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {


            const input = JSON.parse(console.log(message.content.toString()));

            console.log(`Received job with input ${input.number}`)

            // Rabbit MQ implementation (At least once or At most once but no exactly once) of Acknowledgement for dequeuing messages from Queue 
            //so that messages is removed from Queue in Server
            if (input.number == 7)
                channel.ack(message);

        })

        console.log("Waiting for messages ........")

    } catch (ex) {
        console.error(ex);
    }
}