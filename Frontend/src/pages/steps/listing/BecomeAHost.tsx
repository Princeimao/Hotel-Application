import ProgressBar from "@/components/ProgressBar";
import { urlConstants } from "@/constants/listingUrlConstants";

const BecomeAHost = () => {
  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex">
        <div className="w-[50%] flex justify-center items-center">
          <h1 className="text-4xl font-bold">
            It's easy to get <br /> started on RoamInn
          </h1>
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <div className="w-120 h-26 border-b-2 flex">
              <div>
                <h3 className="font-semibold text-sm">Tell About Your Place</h3>
                <p className="text-xs font-black text-gray-500">
                  Share some basic info, such as where it is and how many guest
                  can stay
                </p>
              </div>
              <div className="w-30">
                <img src="../../../../Bed.jpg" alt="Bed" />
              </div>
            </div>
            <div className="w-120 h-26 border-b-2 flex">
              <div>
                <h3 className="font-semibold text-sm">Make it stand out</h3>
                <p className="text-xs font-black text-gray-500">
                  Add 5 or more photos plus a title and description - we'll help
                  you out.
                </p>
              </div>
              <div className="w-30">
                <img src="../../../../Bed.jpg" alt="Bed" />
              </div>
            </div>
            <div className="w-120 h-26 flex">
              <div>
                <h3 className="font-semibold text-sm">
                  Finish up and publish{" "}
                </h3>
                <p className="text-xs font-black text-gray-500">
                  Choose if you'd like to start with an experienced guest, set a
                  starting price and publish your listing
                </p>
              </div>
              <div className="w-30">
                <img src="../../../../Bed.jpg" alt="Bed" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProgressBar
        progress={0 / 16}
        back=""
        front={urlConstants["structure"].url}
        isBackDisable={true}
        isFrontDisable={false}
        pathname={urlConstants["becomeAHost"].url}
      />
    </div>
  );
};

export default BecomeAHost;
