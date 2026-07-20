import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CloudflareService {
  private readonly logger = new Logger(CloudflareService.name);

  async uploadImage(fileBuffer: Buffer, fileName: string): Promise<{ url: string }> {
    this.logger.log(`Uploading file ${fileName} to Cloudflare R2 / Images...`);
    return { url: `https://pub-r2.cloudflarestorage.com/${fileName}` };
  }
}
