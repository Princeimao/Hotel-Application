import { generateUploadToken } from "@/api/hotelApi";
import { imageUpload } from "@/utils/imageKitUpload";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListinImageForm = ({ setLoading }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      throw new Error("images not found");
    }

    try {
      const authParams = await generateUploadToken();

      if (authParams.success === false) {
        console.log("something went wrong while getting token");
        return;
      }

      console.log("authParams", authParams);

      if (!authParams.imageKit) {
        throw new Error("Auth Params not found");
      }
      console.log(authParams.imageKit);

      const { expire, token, signature, publicKey } = authParams.imageKit;
      if (authParams === undefined) {
        throw new Error("auth params not found");
      }

      const uploadPromises = images.map(async (image) => {
        const response = await imageUpload(
          expire,
          token,
          signature,
          publicKey,
          image,
          `listing-${crypto.randomUUID()}.jpg`,
          "listing"
        );

        if (!response?.url) throw new Error("URL not found");
        return response.url;
      });

      const urls = await Promise.all(uploadPromises);

      // upload all the images url in the database,
      console.log(imageUrl);

      setLoading(false);

      setImageUrl((prev) => [...prev, ...urls]);
    } catch (error) {
      console.error("Upload error:", error);
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

export default ListinImageForm;
