import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

interface Message {
  otp: string;
  phone: string;
}

export const sendOtp = (msg: Message) => {
  try {
    client.messages
      .create({
        body: `Your OTP For Login Into Application is ${msg.otp}`,
        to: msg.phone,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .then((message) => console.log(message.sid));
  } catch (error) {
    console.log("something went wrong while sening otp", error);
  }
};
