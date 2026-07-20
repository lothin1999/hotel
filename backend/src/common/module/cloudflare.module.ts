import { Module } from '@nestjs/common';
import { CloudflareService } from '../service/cloudflare.service';

@Module({
  providers: [CloudflareService],
  exports: [CloudflareService],
})
export class CloudflareModule {}
