import { getRabbitMqChannel } from "../../db/rabbitMq.connection";

const sendEmail = async () => {
  try {
    const channel = await getRabbitMqChannel();

    channel.assertQueue("email-queue", {
      durable: false,
    });

    channel.consume("sms-queue", (message) => {
      try {
        if (!message) {
          throw new Error("something went wrong - send sms worker");
        }

        const msg = JSON.parse(message.content.toString());
        //
        // service for sending email with templates
        //
      } catch (error) {
        console.error("Error processing message:", error);
        if (!message) {
          throw new Error("something went wrong - send email worker");
        }

        channel.nack(message, false, false);
      }
    });
  } catch (error) {
    console.log(
      "something went while consuming message sendEmail - message service",
      error
    );
  }
};
