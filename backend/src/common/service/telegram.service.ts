import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  async sendMessage(chatId: string, text: string): Promise<boolean> {
    this.logger.log(`Sending Telegram alert to chatId ${chatId}: ${text}`);
    return true;
  }
}
