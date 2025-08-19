import fs from "fs";
import path from "path";
import { getRabbitMqChannel } from "../../db/rabbitMq.connection";
import roomModel from "../../models/room.model";
import { imageKitUpload } from "../../utils/imageKit";

const uploadRoomImage = async () => {
  console.log("Consumer is running");
  try {
    const channel = await getRabbitMqChannel();
    const imagePath = path.join(process.cwd(), "temp-file-store");

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

        const msg = JSON.parse(message.content.toString());
        const imagesFolder = path.join(imagePath, msg);

        const images = fs.readdirSync(imagesFolder);
        const imagesUrl = await imageKitUpload(images, msg);
        console.log(imagesUrl);

        await roomModel.updateOne(
          {
            _id: msg,
          },
          {
            $set: {
              photo: imagesUrl,
            },
          },
          { upsert: true }
        );

        fs.unlinkSync(imagesFolder);

        channel.ack(message);
      } catch (error) {
        console.error("Error processing message:", error);
        if (!message) {
          throw new Error("something went wrong - message service");
        }

        channel.nack(message, false, false);
      }
    });
  } catch (error) {
    console.log(
      "something went while consuming message uploadImages - message service",
      error
    );
  }
};

uploadRoomImage();
