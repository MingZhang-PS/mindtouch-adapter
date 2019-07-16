import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AppService } from './app.service';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { ConnectionDTO } from './dto/connection.dto';
import { IConnectionCredential } from './dto/interface/connectionCredential.interface';

@Controller('portal/mindtouch')
export class AppController {
  constructor(private readonly appService: AppService) { }

  private parseConnectionData(connectionData: string): IConnectionCredential {
    return JSON.parse(connectionData) as IConnectionCredential;
  }

  @Post('search')
  async search(@Body() searchPayload: SearchPayloadDTO) {
    // return this.appService.getHello();
    // 1. get response from mindtouch
    // 2. data tranform flow
    console.log(searchPayload);
    const searchResultsInXML: XmlDocument = await this.appService.searchArticles(searchPayload,
      this.parseConnectionData(searchPayload.connectionData));
    console.log(searchResultsInXML);
    return null;
  }

  @Post('view/:id')
  async getById(@Param('id') id, @Body() connection: ConnectionDTO) {
    console.log(id)
    console.log(connection)
    const pageDetailXML: XmlDocument = await this.appService.getArticle(id,
      this.parseConnectionData(connection.connectionData));
    console.log(pageDetailXML);
    return null;
  }
}
