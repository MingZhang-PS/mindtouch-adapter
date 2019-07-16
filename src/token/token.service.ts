import { Injectable } from '@nestjs/common';
import crypto = require('crypto');
import { IConnectionCredential } from 'src/dto/interface/connectionCredential.interface';

@Injectable()
export class TokenService {
    generateXDekiToken(credential: IConnectionCredential): string {
        // API Token key and secret are available from API token management dashboard when API token is generated
        const { user, key, secret } = credential;

        // hash time, key, user with secret
        const hmac = crypto.createHmac('sha256', secret);
        const epoch = Math.floor(Date.now() / 1000);
        hmac.update(`${key}_${epoch}_${user}`);
        const hash = hmac.digest('hex');
        const token = `tkn_${key}_${epoch}_${user}_${hash}`;
        return token;
    }
}
