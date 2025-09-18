import ProgressBar from "@/components/ProgressBar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { urlConstants } from "@/constants/listingUrlConstants";
import { zodResolver } from "@hookform/resolvers/zod";

import { address } from "@/api/hotelApi";
import { addressCheck, forwardGeoCode } from "@/api/mapsApi";
import { olaMaps } from "@/utils/olaMapsTile";
import { listingAddressValidation } from "@/validation";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import countries from "../../../constants/countries.json";

export interface Location {
  lat: number;
  lng: number;
}

const Address = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { roomId } = useParams();
  const mapContainerRef = useRef(null);

  const form = useForm<z.infer<typeof listingAddressValidation>>({
    resolver: zodResolver(listingAddressValidation),
    defaultValues: {
      flatNo: "",
      street: "",
      nearbyLandmark: "",
      locality: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof listingAddressValidation>) {
    setIsLoading(true);
    try {
      if (!roomId) throw new Error("Host ID missing");

      if (!location) {
        toast("Location is required");
        throw new Error("something went wrong");
      }

      const response = await address(roomId, data, location);

      if (!response?.success) throw new Error("Invalid response");

      return `${urlConstants["floorPlan"].url}/${roomId}`;
    } catch (error) {
      console.error("Error in handleSubmit", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const formData = useWatch({ control: form.control });
  const allFieldsFilled = Object.values(formData).every(
    (val) => val && val.trim() !== ""
  );

  const callAPI = useCallback(async () => {
    const addressVerify = await addressCheck(formData);

    if (addressVerify.vaidation?.result.validated === false) {
      toast("Incorrect Address", {
        description: "Please provide correct address",
      });
      return;
    }

    if (!addressVerify.vaidation) {
      throw new Error("something went wrong while getting address");
    }

    const forwardLocation = await forwardGeoCode(
      addressVerify.vaidation?.result.validated_address
    );

    if (forwardLocation.resut?.status !== "ok") {
      throw new Error("something went wrong");
    }

    const geometry =
      forwardLocation.resut?.geocodingResults[0].geometry.location;

    setLocation({
      lat: geometry?.lat,
      lng: geometry?.lng,
    });
  }, [formData]);

  const debouncedCallAPI = useCallback(
    debounce(() => {
      if (allFieldsFilled) {
        callAPI();
      }
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedCallAPI();

    return () => debouncedCallAPI.cancel();
  }, [formData, debouncedCallAPI]);

  useCallback(() => {
    const map = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: mapContainerRef.current,
      center: [location?.lng, location?.lat],
      zoom: 15,
    });

    return () => map.remove();
  }, [location?.lat, location?.lng]);

  return (
    <div className="w-full min-h-[89%] relative">
      <div className="w-full h-[100%] flex flex-col items-center justify-center px-6 ">
        <h1 className="text-xl font-bold">Confirm your address</h1>
        <p className="text-sm font-medium text-gray-400 text-center">
          Your address is only shared with guest after they've made a
          reservation.
        </p>
        <div className="w-auto max-w-200 mt-4 flex flex-wrap gap-2.5 justify-center ">
          <div className="w-92 flex justify-center min-h-102">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex-col items-center space-y-2"
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[100%] border-3 py-6">
                            <SelectValue placeholder="Select Country/Region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="h-80">
                          {countries === null ? null : (
                            <>
                              {countries.map((item) => (
                                <SelectItem
                                  key={item.country}
                                  value={item.country}
                                >
                                  {item.country}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full mt-1.5 border-2 border-zinc-300 rounded-lg">
                  <FormField
                    control={form.control}
                    name="flatNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 border-b-2 rounded-b-none h-12"
                            placeholder="Flat, House, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-12"
                            placeholder="Street Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nearbyLandmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-12"
                            placeholder="Nearby Landmark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locality"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-12"
                            placeholder="District/Locality (if applicable)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-12"
                            placeholder="City/Town"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-12"
                            placeholder="State/Union-Territory"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none h-12"
                            placeholder="Pincode"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          {location && (
            <>
              <div className="seperator w-full border-1 rounded-2xl" />

              <div className="w-full">
                <div className="mb-4">
                  <h1 className="text-base font-bold">
                    Show your specific location
                  </h1>
                  <p className="text-xs text-gray-400">
                    Make it clear to where your located. We'll only share your
                    address after they're made a reservation.
                  </p>
                </div>
                <div className="w-full flex justify-center items-center rounded-2xl mb-35">
                  <div
                    className="h-120 w-full border-2 overflow-hidden rounded-xl"
                    ref={mapContainerRef}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ProgressBar
        progress={6.25 * 3}
        back={urlConstants["structure"].url}
        front={urlConstants["floorPlan"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
        handleSubmit={form.handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </div>
  );
};

export default Address;
