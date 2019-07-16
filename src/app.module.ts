import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenService } from './token/token.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}
