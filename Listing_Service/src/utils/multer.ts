import fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

const location = path.join(process.cwd(), "Listing_Service");
const storagePath = path.join(location, "temp-file-store");

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}
const storage = multer.diskStorage({
  destination(req, file, callback) {
    const folderName = req.params.roomId;
    if (!fs.existsSync(path.join(storagePath, folderName))) {
      fs.mkdirSync(path.join(storagePath, folderName), { recursive: true });
    }

    callback(null, path.join(storagePath, folderName));
  },

  filename(req, file, callback) {
    callback(null, `${nanoid()}.jpg`);
  },
});

export const upload = multer({ storage: storage });
