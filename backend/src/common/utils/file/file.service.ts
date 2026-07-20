import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }
}
