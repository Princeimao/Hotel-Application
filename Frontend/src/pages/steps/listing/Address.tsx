import { getUserLocation } from "@/api/mapsApi";
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
import type { UserLocation } from "@/types/maps.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { z } from "zod";
import countries from "../../../constants/countries.json";

interface Location {
  lat: number;
  lng: number;
}

const Address = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [position, setPosition] = useState<Location | null>(null);

  const FormSchema = z.object({
    flatNo: z.string(),
    street: z.string(),
    nearbyLandmark: z.string(),
    locality: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    pincode: z.string().min(5).max(10),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function LocationPicker({ onLocationSelected }) {
    useMapEvents({
      click(e) {
        onLocationSelected(e.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    async function getLocation() {
      const response = await getUserLocation();

      if (response === null) {
        throw new Error("something went wrong while getting the user location");
      }

      if (response === undefined) {
        throw new Error("something went wrong while getting the user location");
      }

      setUserLocation(response);
    }

    getLocation();
  }, []);

  return (
    <div className="w-full min-h-[89%] relative">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Confirm your address</h1>
        <p className="text-sm font-medium text-gray-400">
          Your address is only shared with guest after they've made a
          reservation.
        </p>
        <div className="w-200 mt-4 flex flex-wrap gap-2.5 justify-center">
          <div className="w-full flex justify-center min-h-102">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[70%] flex-col items-center space-y-2"
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

          <div className="seperator w-[70%] border-1 rounded-2xl" />

          <div className="w-full">
            <div className="mb-4 ml-30">
              <h1 className="text-base font-bold">
                Show your specific location
              </h1>
              <p className="text-xs text-gray-400">
                Make it clear to where your located. We'll only share your
                address after they're made a reservation.
              </p>
            </div>

            <div className="w-full h-[70%] flex justify-center items-center rounded-2xl mb-35">
              {userLocation?.longitude !== undefined &&
              userLocation?.latitude !== undefined ? (
                <MapContainer
                  center={[userLocation.latitude, userLocation.longitude]}
                  zoom={11}
                  scrollWheelZoom={true}
                  style={{
                    height: "500px",
                    width: "70%",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationPicker onLocationSelected={setPosition} />
                  {position && <Marker position={position} />}
                </MapContainer>
              ) : (
                <Loader className="animate-spin" />
              )}
            </div>
          </div>
        </div>
      </div>
      <ProgressBar
        progress={6.25 * 2}
        back={urlConstants["structure"].url}
        front={urlConstants["floorPlan"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
      />
    </div>
  );
};

export default Address;
