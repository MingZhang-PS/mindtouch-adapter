import { ConnectionDataDTO } from './dto/connectionData.dto';
import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchResultsDTO } from './dto/searchResults.dto';
import { ResultDTO } from './dto/result.dto';
import { SearchPayloadDTO } from './dto/searchPayload.dto';

@Controller('portal/mindtouch')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  search(@Query() queries: SearchPayloadDTO): Promise<SearchResultsDTO> {
    // return this.appService.getHello();
    // 1. get response from mindtouch
    // 2. data tranform flow
    return null;
  }

  @Get(':id')
  getById(@Param('id') id, @Query() connectionData: ConnectionDataDTO): Promise<ResultDTO> {
    // return this.appService.getHello();
    console.log(id)
    console.log(connectionData)
    return null;
  }
}
