import mongoose from "mongoose";
import { getRabbitMqChannel } from "../../db/rabbitMq.connection";
import calendarModel from "../../models/calendar.model";

interface Message {
  roomId: mongoose.Schema.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  bookingId: mongoose.Schema.Types.ObjectId;
}

const updateAvailabilityCalander = async () => {
  try {
    const channel = await getRabbitMqChannel();

    channel.assertQueue("update-calendar", {
      durable: false,
    });

    channel.consume("update-calendar", async (message) => {
      try {
        if (!message) {
          throw new Error("something went wrong - send update-calendar worker");
        }

        const msg: Message = JSON.parse(message.content.toString());

        await calendarModel.create({
          roomId: msg.roomId,
          checkIn: msg.checkIn,
          checkOut: msg.checkOut,
          bookingId: msg.bookingId,
        });
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
      "something went while consuming message sendEmail - message service",
      error
    );
  }
};

updateAvailabilityCalander();
