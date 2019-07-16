import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  searchArticles(): string {
    return 'Hello World!';
  }
}
