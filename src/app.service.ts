import { Injectable, HttpService } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AxiosRequestConfig } from 'axios';
import { SearchResultsDTO } from './dto/searchResults.dto';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { IsLowercase } from 'class-validator';

@Injectable()
export class AppService {
  private readonly searchEndpoint: string = '/@api/deki/site/search';
  private readonly searchConstraint: string = 'type:wiki AND +(+namespace:main)';

  constructor(private readonly httpService: HttpService) { }

  private generateReqConfig(queries: SearchPayloadDTO): AxiosRequestConfig {
    const reqConfig = {
      params: {
        'q': queries.search,
        'limit': queries.pageSize,
        'offset': queries.page * queries.pageSize,
        'constraint': this.searchConstraint,
        // 'sortBy:-rank': null,
        'origin:mt-web': null,
      },
      auth: {
        username: queries.connectionData.username,
        password: queries.connectionData.password,
      },
    };
    if (queries.orderBy && queries.orderBy.trim().length > 0) {
      const orderParams: string[] = queries.orderBy.split(' ');
      if (orderParams[1]) {
        if (orderParams[1].toLowerCase() === 'asc') {
          reqConfig.params['sortBy:' + '+' + orderParams[0]] = null;
        } else if (orderParams[1].toLowerCase() === 'desc') {
          reqConfig.params['sortBy:' + '-' + orderParams[0]] = null;
        }
      }
    }
    // TODO: how to handle queries.fields? to drop the unneccessary fields in transformer?
    return reqConfig;
  }

  searchArticles(queries: SearchPayloadDTO): Promise<XmlDocument> {
    const reqConfig = this.generateReqConfig(queries);
    // TODO: 1. http request backoff 2. error handling
    // 3. http long-live connection pool (if it is tenant level, not user level, we may reuse http connection in giving tenant)
    return new Promise((resolve, reject) => {
      this.httpService.get(queries.connectionData.siteURL + this.searchEndpoint, reqConfig)
        .toPromise().then(
          res => {
            resolve(new XmlDocument(res.data));
          },
        );
    });
  }
}
