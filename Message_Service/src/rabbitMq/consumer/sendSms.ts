import { getRabbitMqChannel } from "../../db/rabbitMq.connection";
import { sendOtp } from "../../service/twilio.service";

const sendSms = async () => {
  try {
    const channel = await getRabbitMqChannel();

    channel.assertQueue("sms-queue", {
      durable: false,
    });

    channel.consume("sms-queue", (message) => {
      try {
        if (!message) {
          throw new Error("something went wrong - send sms worker");
        }

        const msg = JSON.parse(message.content.toString());
        sendOtp(msg);
      } catch (error) {
        console.error("Error processing message:", error);
        if (!message) {
          throw new Error("something went wrong - send sms worker");
        }

        channel.nack(message, false, false);
      }
    });
  } catch (error) {
    console.log(
      "something went while consuming message - message service",
      error
    );
  }
};
