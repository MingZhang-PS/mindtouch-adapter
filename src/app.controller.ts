import { Controller, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AppService } from './app.service';
import { ConnectionDTO } from './dto/connection.dto';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { ConnectionCredentialPipe } from './pipes/connection-credential.pipe';

@Controller('portal/mindtouch')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('search')
  async search(@Body(ConnectionCredentialPipe) searchPayload: SearchPayloadDTO) {
    // 1. get response from mindtouch
    // 2. data tranform flow
    console.log(searchPayload);
    const searchResultsInXML: XmlDocument = await this.appService.searchArticles(searchPayload,
      searchPayload.connectionData);
    console.log(searchResultsInXML);
    return null;
  }

  @Post('view/:id')
  async getById(@Param('id') id, @Body(ConnectionCredentialPipe) connection: ConnectionDTO) {
    console.log(id)
    console.log(connection)
    const pageDetailXML: XmlDocument = await this.appService.getArticle(id, connection.connectionData);
    console.log(pageDetailXML);
    return null;
  }
}
