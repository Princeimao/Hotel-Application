import { upload, type UploadResponse } from "@imagekit/react";

const controller = new AbortController();

export const imageUpload = async (
  expire: number,
  token: string,
  signature: string,
  publicKey: string,
  file: File,
  fileName: string,
  folder: string
): Promise<UploadResponse> => {
  const uploadResponse = await upload({
    expire,
    token,
    signature,
    publicKey,
    file,
    fileName,
    folder,
    abortSignal: controller.signal,
  });

  return uploadResponse;
};
