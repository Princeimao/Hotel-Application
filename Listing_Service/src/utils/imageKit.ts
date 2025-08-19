import fs from "fs";
import ImageKit from "imagekit";
import path from "path";

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

export const imageKitUpload = async (
  images: string[],
  roomId: string
): Promise<string[] | null> => {
  try {
    const uploadPromise = images.map((image) => {
      const filePath = path.join(
        process.cwd(),
        "temp-file-store",
        roomId,
        image
      );
      const fileBuffer = fs.readFileSync(filePath);

      return imagekit.upload({
        file: fileBuffer,
        fileName: image,
      });
    });

    console.log("upload --> ", uploadPromise);

    const result = await Promise.all(uploadPromise);

    return result.map((res) => res.url);
  } catch (error) {
    console.log("something went wrong", error);

    const imagePath = path.join(process.cwd(), "temp-file-store");

    if (fs.existsSync(path.join(imagePath, roomId))) {
      fs.unlinkSync(path.join(imagePath, roomId));
    }

    return null;
  }
};
