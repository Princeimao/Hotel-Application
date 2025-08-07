import ImageKit from "imagekit";

if (!process.env.IMAGEKIT_URL_ENDPOINT) {
  throw new Error("ImageKitp public key not define");
}
if (!process.env.IMAGEKIT_PUBLIC_KEY) {
  throw new Error("ImageKitp public key not define");
}
if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error("ImageKitp public key not define");
}
export const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
