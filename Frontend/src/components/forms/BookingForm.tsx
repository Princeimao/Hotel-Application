import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "react-international-phone";
import countries from "../../constants/countries.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const BookingForm = ({ form }: any) => {
  return (
    <div className="w-full py-5 space-y-5">
      <Form {...form}>
        <div className="w-full flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    className="w-92 rounded-sm border-1 border-gray-500 focus-visible:border-ring focus-visible:ring-transparent"
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    className="w-92 rounded-sm border-1 border-gray-500 focus-visible:border-ring focus-visible:ring-transparent"
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="w-92 rounded-sm border-1 border-gray-500 focus-visible:border-ring focus-visible:ring-transparent"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-xs">
                Confirmation email sent to this address
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country/Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-92 rounded-sm border-1 border-gray-500 py-4.5">
                    <SelectValue placeholder="Select Country/Region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-80">
                  {countries === null ? null : (
                    <>
                      {countries.map((item) => (
                        <SelectItem key={item.country} value={item.country}>
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  inputClassName="text-base px-2 py-1 focus:outline-none w-77 border-1"
                  defaultCountry="in"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default BookingForm;
