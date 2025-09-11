import { createClient } from "redis";

export const redis = createClient();

async function connectRedis() {
  try {
    await redis.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
}

connectRedis();
