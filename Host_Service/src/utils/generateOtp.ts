export const generateOTP = (): number => {
  const otp = Math.floor(Math.random() * 1000000);

  const length = getLength(otp);

  if (length !== 6) {
    return generateOTP();
  }

  return otp;
};

const getLength = (otp: number) => {
  return otp.toString().length;
};
