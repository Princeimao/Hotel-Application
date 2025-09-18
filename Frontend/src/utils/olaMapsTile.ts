import { OlaMaps } from "olamaps-web-sdk";

if (!import.meta.env.VITE_OLAMAPS_API_KEY) {
  throw new Error("Ola Api key is not define");
}

export const olaMaps = new OlaMaps({
  apiKey: import.meta.env.VITE_OLAMAPS_API_KEY,
});
