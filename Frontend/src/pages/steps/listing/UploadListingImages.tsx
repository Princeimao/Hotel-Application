import ListingForm from "@/components/forms/ListingForm";
import ProgressBar from "@/components/ProgressBar";
import { urlConstants } from "@/constants/listingUrlConstants";

const UploadListingImages = () => {
  return (
    <div className="w-full min-h-[89%] relative">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Provide accommodation images</h1>
        <ListingForm />
      </div>
      <ProgressBar
        progress={6.25 * 7}
        back={urlConstants["amenities"].url}
        front={urlConstants["photo"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
      />
    </div>
  );
};

export default UploadListingImages;
