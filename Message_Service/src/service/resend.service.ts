import { Resend } from "resend";
const resend = new Resend();

export const sendEmail = async (to: string, name: string) => {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: to,
      subject: "Hello World",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome, ${name}!</h2>
          <p>We’re glad to have you!</p>
        </div>
        `,
    });
  } catch (error) {
    console.error(error);
  }
};
