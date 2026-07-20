import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  async sendNotification(token: string, title: string, body: string): Promise<boolean> {
    this.logger.log(`Sending FCM notification to token: ${token} - Title: ${title}`);
    return true;
  }
}
