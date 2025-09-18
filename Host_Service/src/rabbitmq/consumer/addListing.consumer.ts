import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { getRabbitMqChannel } from "../../db/rabbitMq.connection";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

const addListing = async () => {
  console.log("add listing worker is running");
  try {
    const channel = await getRabbitMqChannel();

    channel.assertQueue("room-queue", {
      durable: true,
      arguments: {
        "x-dead-letter-exchange": "dead-letter-exchange",
      },
    });

    channel.consume("room-queue", async (message) => {
      try {
        if (!message) {
          throw new Error("something went wrong - send sms worker");
        }

        const msg: { hostId: string; roomId: string } = JSON.parse(
          message.content.toString()
        );

        await prisma.host.update({
          where: {
            id: msg.hostId,
          },
          data: {
            accommodationId: {
              push: msg.roomId,
            },
          },
        });

        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        if (!message) {
          throw new Error("something went wrong - Host service");
        }

        channel.nack(message, false, false);
      }
    });
  } catch (error) {
    console.log(
      "something went while consuming message addListing - Host Service",
      error
    );
  }
};

addListing();
