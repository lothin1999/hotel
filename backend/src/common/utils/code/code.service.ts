import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeService {
  generateCode(prefix = 'REF', length = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${result}`;
  }
}
