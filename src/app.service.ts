import { Injectable, HttpService } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { pipe, range, timer, zip } from 'rxjs';
import { retryWhen, map, mergeMap } from 'rxjs/operators';
import { ConnectionCredential } from './dto/connectionCredential';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { TokenService } from './token/token.service';

@Injectable()
export class AppService {
  readonly searchEndpoint: string = '/@api/deki/site/search';
  readonly getEndpoint: string = '/@api/deki/pages/${id}';
  readonly searchConstraint: string = 'type:wiki AND +(+namespace:main)';

  constructor(private readonly httpService: HttpService,
              private readonly tokenService: TokenService) { }

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
      headers: { 'X-Deki-Token': this.tokenService.generateXDekiToken(searchPayload.connectionData) },
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
      headers: { 'X-Deki-Token': this.tokenService.generateXDekiToken(credential) },
    };
  }

  private backoff(maxTries, ms) {
    return pipe(
      retryWhen(attempts => zip(range(1, maxTries), attempts)
        .pipe(
          map(([i]) => i * i),
          mergeMap(i => timer(i * ms)),
        ),
      ),
    );
  }

  // TODO: 1. error handling
  // 2. http long-live connection pool (if it is tenant level, not business user level, we may reuse http connection in giving tenant)
  searchArticles(searchPayload: SearchPayloadDTO): Promise<XmlDocument> {
    const reqConfig = this.generateSearchReqConfig(searchPayload);
    return new Promise((resolve, reject) => {
      this.httpService.get(searchPayload.connectionData.siteURL + this.searchEndpoint, reqConfig)
        .pipe(this.backoff(3, 250))
        .toPromise().then(
          res => {
            resolve(new XmlDocument((res as AxiosResponse).data));
          },
        );
    });
  }

  getArticle(id: string, credential: ConnectionCredential): Promise<XmlDocument> {
    const reqConfig = this.generateGetReqConfig(credential);
    return new Promise((resolve, reject) => {
      this.httpService.get(credential.siteURL + this.getEndpoint.replace('${id}', id), reqConfig)
        .pipe(this.backoff(3, 250))
        .toPromise().then(
          res => {
            resolve(new XmlDocument((res as AxiosResponse).data));
          },
        );
    });
  }
}
