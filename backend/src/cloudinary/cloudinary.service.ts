import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
const fs = require('fs');

@Injectable()
export class CloudinaryService {
  async uploadImage(file) {
    try {
      const response = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
      });

      console.log('File uploaded on cloudinary', response);

      fs.unlinkSync(file);

      return response.url;
    } catch (err) {
      fs.unlinkSync(file);

      return null;
    }
  }
}
