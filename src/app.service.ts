import { Injectable, HttpService } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AxiosRequestConfig } from 'axios';
import { ConnectionDataDTO } from './dto/connectionData.dto';
import { SearchPayloadDTO } from './dto/searchPayload.dto';

@Injectable()
export class AppService {
  private readonly searchEndpoint: string = '/@api/deki/site/search';
  private readonly getEndpoint: string = '/@api/deki/pages/${id}';
  private readonly searchConstraint: string = 'type:wiki AND +(+namespace:main)';

  constructor(private readonly httpService: HttpService) { }

  private generateSearchReqConfig(searchPayload: SearchPayloadDTO): AxiosRequestConfig {
    const reqConfig = {
      params: {
        'q': searchPayload.search,
        'limit': searchPayload.pageSize,
        'offset': searchPayload.page * searchPayload.pageSize,
        'constraint': this.searchConstraint,
        // 'sortBy:-rank': null,
        'origin:mt-web': null,
      },
      auth: {
        username: searchPayload.connectionData.username,
        password: searchPayload.connectionData.password,
      },
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

  private generateGetReqConfig(connectionData: ConnectionDataDTO): AxiosRequestConfig {
    return {
      auth: {
        username: connectionData.username,
        password: connectionData.password,
      },
    };
  }
  // TODO: 1. http request backoff 2. error handling
  // 3. http long-live connection pool (if it is tenant level, not user level, we may reuse http connection in giving tenant)
  searchArticles(searchPayload: SearchPayloadDTO): Promise<XmlDocument> {
    const reqConfig = this.generateSearchReqConfig(searchPayload);
    return new Promise((resolve, reject) => {
      this.httpService.get(searchPayload.connectionData.siteURL + this.searchEndpoint, reqConfig)
        .toPromise().then(
          res => {
            resolve(new XmlDocument(res.data));
          },
        );
    });
  }

  getArticle(id: string, connectionData: ConnectionDataDTO): Promise<XmlDocument> {
    const reqConfig = this.generateGetReqConfig(connectionData);
    return new Promise((resolve, reject) => {
      this.httpService.get(connectionData.siteURL + this.getEndpoint.replace('${id}', id), reqConfig)
        .toPromise().then(
          res => {
            resolve(new XmlDocument(res.data));
          },
        );
    });
  }
}
