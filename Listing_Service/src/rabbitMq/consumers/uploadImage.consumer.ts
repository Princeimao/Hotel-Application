import fs from "fs";
import path from "path";
import { getRabbitMqChannel } from "../../db/rabbitMq.connection";
import roomModel from "../../models/room.model";
import { imageKitUpload } from "../../utils/imageKit";

const uploadRoomImage = async () => {
  try {
    const channel = await getRabbitMqChannel();
    const imagePath = path.join(
      process.cwd(),
      "Listing_Service",
      "temp-file-store"
    );

    channel.assertQueue("room-queue", {
      durable: false,
    });

    channel.consume(
      "room-queue",
      async (message) => {
        try {
          if (!message) {
            throw new Error("something went wrong - send sms worker");
          }

          const msg = JSON.parse(message.content.toString());
          const imagesFolder = path.join(imagePath, msg);

          const images = fs.readdirSync(imagesFolder);
          const imagesUrl = imageKitUpload(images, msg);

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
        } catch (error) {
          console.error("Error processing message:", error);
          if (!message) {
            throw new Error("something went wrong - send sms worker");
          }

          channel.nack(message, false, false);
        }
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(
      "something went while consuming message uploadImages - message service",
      error
    );
  }
};
