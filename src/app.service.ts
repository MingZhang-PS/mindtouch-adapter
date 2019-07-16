import { Injectable } from '@nestjs/common';
import { SearchResultsDTO } from './dto/searchResults.dto';
import { SearchPayloadDTO } from './dto/searchPayload.dto';

@Injectable()
export class AppService {
  searchArticles(queries: SearchPayloadDTO): Promise<SearchResultsDTO> {
    
    return null;
  }
}
