import { instance } from "./axios";

export const createPayment = async (
  amount: number
): Promise<{
  success: boolean;
  message: string;
  redirectUrl?: string;
}> => {
  try {
    const response = await instance.post(`booking/payment/create-payment`, {
      amount,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while creating payment", error);
    return {
      success: false,
      message: "something went wrong while creating payment",
    };
  }
};
