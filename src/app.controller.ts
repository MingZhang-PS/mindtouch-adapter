import { ConnectionDataDTO } from './dto/connectionData.dto';
import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchResultsDTO } from './dto/searchResults.dto';
import { ResultDTO } from './dto/result.dto';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { XmlDocument } from 'xmldoc';

@Controller('portal/mindtouch')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('search')
  async search(@Body() searchPayload: SearchPayloadDTO) {
    // return this.appService.getHello();
    // 1. get response from mindtouch
    // 2. data tranform flow
    console.log(searchPayload);
    const searchResultsInXML: XmlDocument = await this.appService.searchArticles(searchPayload);
    console.log(searchResultsInXML);
    return null;
  }

  @Get(':id')
  async getById(@Param('id') id, @Query() connectionData: ConnectionDataDTO) {
    // return this.appService.getHello();
    console.log(id)
    console.log(connectionData)
    return null;
  }
}
