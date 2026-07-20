import { Injectable } from '@nestjs/common';
import { CloudflareService } from './cloudflare.service';

@Injectable()
export class UploadService {
  constructor(private cloudflareService: CloudflareService) {}

  async handleFileUpload(file: { buffer: Buffer; originalname: string }) {
    return this.cloudflareService.uploadImage(file.buffer, file.originalname);
  }
}
