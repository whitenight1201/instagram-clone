import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as shortId from 'shortId';

@Injectable()
export class FileService {
  createFile(file: any): string {
    try {
      let filePath = '';
      const fileExtension = file.originalname.split('.').pop();
      const fileName = shortId.generate() + '.' + fileExtension;
      const fileType = file.mimetype.split('/')[0];
      const contentType = fileType == 'image' ? 'IMAGE' : 'VIDEO';
      if (contentType == 'IMAGE') {
        filePath = path.resolve(__dirname, '..', '../static/image');
      } else if (contentType == 'VIDEO') {
        filePath = path.resolve(__dirname, '..', '../static/video');
      }
      // const filePath = path.resolve(__dirname, '..', '../static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
