import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const location = path.join(process.cwd());
const storagePath = path.join(location, "temp-file-store");

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}
const storage = multer.diskStorage({
  destination(req, file, callback) {
    console.log("in multer");
    const folderName = req.params.roomId;
    if (!fs.existsSync(path.join(storagePath, folderName))) {
      fs.mkdirSync(path.join(storagePath, folderName), { recursive: true });
    }

    callback(null, path.join(storagePath, folderName));
  },

  filename(req, file, callback) {
    callback(null, `${uuidv4()}.jpg`);
  },
});

export const upload = multer({ storage: storage });
