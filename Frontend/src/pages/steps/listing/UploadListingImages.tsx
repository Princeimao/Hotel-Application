import { uploadImage } from "@/api/hotelApi";
import ListinImageForm from "@/components/forms/ListinImageForm";
import ProgressBar from "@/components/ProgressBar";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UploadListingImages = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [images, setImages] = useState<File[]>([]);
  const { roomId } = useParams();

  const handleUpload = async () => {
    setLoading(true);

    if (images.length === 0) {
      throw new Error("images not found");
    }

    if (!roomId) {
      throw new Error("roomId not not define");
    }

    try {
      const response = await uploadImage(roomId, images);

      if (!response?.success) throw new Error("Invalid response");
      
      return `${urlConstants["basicDetails"].url}/${roomId}`;
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[89%] relative">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Provide accommodation images</h1>
        <ListinImageForm images={images} setImages={setImages} />
      </div>
      <ProgressBar
        progress={6.25 * 7}
        back={urlConstants["amenities"].url}
        isBackDisable={false}
        isFrontDisable={images.length === 0 ? true : false}
        pathname={urlConstants["photo"].url}
        loading={loading}
        handleSubmit={handleUpload}
      />
    </div>
  );
};

export default UploadListingImages;
