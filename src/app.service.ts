import { Injectable, HttpService } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AxiosRequestConfig } from 'axios';
import { ConnectionCredential } from './dto/connectionCredential';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { TokenService } from './token/token.service';

@Injectable()
export class AppService {
  private readonly searchEndpoint: string = '/@api/deki/site/search';
  private readonly getEndpoint: string = '/@api/deki/pages/${id}';
  private readonly searchConstraint: string = 'type:wiki AND +(+namespace:main)';

  constructor(private readonly httpService: HttpService,
              private readonly tokenService: TokenService) { }

  private generateSearchReqConfig(searchPayload: SearchPayloadDTO, credential: ConnectionCredential): AxiosRequestConfig {
    const reqConfig = {
      params: {
        'q': searchPayload.search,
        'limit': searchPayload.pageSize,
        'offset': searchPayload.page * searchPayload.pageSize,
        'constraint': this.searchConstraint,
        // 'sortBy:-rank': null,
        'origin:mt-web': null,
      },
      headers: {'X-Deki-Token': this.tokenService.generateXDekiToken(credential)},
    };
    if (searchPayload.orderBy && searchPayload.orderBy.trim().length > 0) {
      const orderParams: string[] = searchPayload.orderBy.split(' ');
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

  private generateGetReqConfig(credential: ConnectionCredential): AxiosRequestConfig {
    return {
      headers: {'X-Deki-Token': this.tokenService.generateXDekiToken(credential)},
    };
  }

  // TODO: 1. http request backoff 2. error handling
  // 3. http long-live connection pool (if it is tenant level, not business user level, we may reuse http connection in giving tenant)
  searchArticles(searchPayload: SearchPayloadDTO, credential: ConnectionCredential): Promise<XmlDocument> {
    const reqConfig = this.generateSearchReqConfig(searchPayload, credential);
    return new Promise((resolve, reject) => {
      this.httpService.get(credential.siteURL + this.searchEndpoint, reqConfig)
        .toPromise().then(
          res => {
            resolve(new XmlDocument(res.data));
          },
        );
    });
  }

  getArticle(id: string, credential: ConnectionCredential): Promise<XmlDocument> {
    const reqConfig = this.generateGetReqConfig(credential);
    return new Promise((resolve, reject) => {
      this.httpService.get(credential.siteURL + this.getEndpoint.replace('${id}', id), reqConfig)
        .toPromise().then(
          res => {
            resolve(new XmlDocument(res.data));
          },
        );
    });
  }
}
