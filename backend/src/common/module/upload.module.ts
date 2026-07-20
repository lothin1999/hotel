import { Module } from '@nestjs/common';
import { UploadService } from '../service/upload.service';
import { CloudflareModule } from './cloudflare.module';

@Module({
  imports: [CloudflareModule],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
