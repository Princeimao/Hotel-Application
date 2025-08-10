import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  type UploadResponse,
} from "@imagekit/react";

const controller = new AbortController();

export const imageUpload = async (
  expire: number,
  token: string,
  signature: string,
  publicKey: string,
  file: File,
  fileName: string,
  folder: string
): Promise<UploadResponse | undefined> => {
  try {
    console.log("inside image kit upload");
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

    console.log("response", uploadResponse);

    return uploadResponse;
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted:", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request:", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error:", error.message);
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error:", error.message);
    } else {
      console.error("Upload error:", error);
    }
  }
};
