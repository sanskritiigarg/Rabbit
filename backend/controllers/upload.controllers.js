import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: 'No File Uploaded' });
    }

    // function to handle stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        // Use  streamifier to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Call the streamUpload function
    const result = await streamUpload(req.file.buffer);

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { uploadFile };
