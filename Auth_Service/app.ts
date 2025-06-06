import express from "express";
import { prisma } from "./src/db/prisma.client";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  console.log(prisma);
  const user = await prisma.user.findFirst({
    where: {
      email: "prince@price.com",
    },
  });
  res.send(`Working in ${process.env.NODE_ENV} - ${user}`);
});
