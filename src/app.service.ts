import { Injectable, HttpService } from '@nestjs/common';
import { XmlDocument } from 'xmldoc';
import { AxiosRequestConfig } from 'axios';
import { IConnectionCredential } from './dto/interface/connectionCredetial.interface';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import crypto = require('crypto');

@Injectable()
export class AppService {
  private readonly searchEndpoint: string = '/@api/deki/site/search';
  private readonly getEndpoint: string = '/@api/deki/pages/${id}';
  private readonly searchConstraint: string = 'type:wiki AND +(+namespace:main)';

  constructor(private readonly httpService: HttpService) { }

  private generateSearchReqConfig(searchPayload: SearchPayloadDTO, credential: IConnectionCredential): AxiosRequestConfig {
    const reqConfig = {
      params: {
        'q': searchPayload.search,
        'limit': searchPayload.pageSize,
        'offset': searchPayload.page * searchPayload.pageSize,
        'constraint': this.searchConstraint,
        // 'sortBy:-rank': null,
        'origin:mt-web': null,
      },
     // headers: {'X-Deki-Token': this.generateToken(credential)},
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

  private generateGetReqConfig(credential: IConnectionCredential): AxiosRequestConfig {
    return {
     // headers: {'X-Deki-Token': this.generateToken(credential)},
    };
  }

  private generateToken(credential: IConnectionCredential): string {
    // API Token key and secret are available from API token management dashboard when API token is generated
    const {user, key, secret} = credential;

    // hash time, key, user with secret
    const hmac = crypto.createHmac('sha256', secret);
    const epoch = Math.floor(Date.now() / 1000);
    hmac.update(`${key}_${epoch}_${user}`);
    const hash = hmac.digest('hex');
    const token = `tkn_${key}_${epoch}_${user}_${hash}`;
    return token;
  }
  // TODO: 1. http request backoff 2. error handling
  // 3. http long-live connection pool (if it is tenant level, not user level, we may reuse http connection in giving tenant)
  searchArticles(searchPayload: SearchPayloadDTO, credential: IConnectionCredential): Promise<XmlDocument> {
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

  getArticle(id: string, credential: IConnectionCredential): Promise<XmlDocument> {
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
