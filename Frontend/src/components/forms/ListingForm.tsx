import { generateUploadToken } from "@/api/hotelApi";
import { imageUpload } from "@/utils/imageKitUpload";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/react";
import crypto from "crypto";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ListingForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  console.log(imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const authenticator = async () => {
    try {
      const response = await generateUploadToken();
      if (response.success === false) {
        throw new Error(`${response.message}`);
      }

      if (!response.imagekit) {
        throw new Error("Credentials not found");
      }

      const { signature, expire, token, publicKey } = response.imagekit;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      images.map(async (image) => {
        const response = await imageUpload(
          expire,
          token,
          signature,
          publicKey,
          image,
          `listing-${crypto.randomUUID()}.jpg`,
          "listing"
        );

        if (response.url === undefined) {
          throw new Error("url not found");
        }

        setImageUrl((prev) => [...prev, response.url!]);
      });
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="min-h-160">
      <div className="h-120 w-210 rounded-2xl bg-gray-100">
        <Label className="h-120 w-210 cursor-pointer flex flex-col items-center justify-center">
          <img src="../../../Drag_and_Drop.jpg" alt="" className="w-30" />
          <h4 className="text-gray-400 text-lg font-bold text-center">
            Drag and Drop
          </h4>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </Label>
      </div>

      <div className={`${images.length !== 0 ? "min-h-70 mb-40" : null}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 w-full max-w-3xl">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-full h-30 object-cover rounded-lg shadow"
              />
              <Button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <Button className="mt-4" onClick={handleUpload}>
          Upload Images
        </Button>
      </div>
    </div>
  );
};

export default ListingForm;
