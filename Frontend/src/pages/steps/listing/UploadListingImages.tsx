import ListinImageForm from "@/components/forms/ListinImageForm";
import ProgressBar from "@/components/ProgressBar";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";

const UploadListingImages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="w-full min-h-[89%] relative">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Provide accommodation images</h1>
        <ListinImageForm setLoading={setLoading} />
      </div>
      <ProgressBar
        progress={6.25 * 7}
        back={urlConstants["amenities"].url}
        front={urlConstants["photo"].url}
        isBackDisable={false}
        isFrontDisable={loading === false ? true : false}
        pathname={urlConstants["structure"].url}
        loading={loading}
      />
    </div>
  );
};

export default UploadListingImages;
