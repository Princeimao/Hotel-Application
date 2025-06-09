import { createClient } from "redis";

export const redis = createClient();
redis.connect();
