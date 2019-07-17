import { Injectable } from '@nestjs/common';
import crypto = require('crypto');
import { IConnectionCredential } from 'src/dto/interface/connectionCredential.interface';

@Injectable()
export class TokenService {
    generateXDekiToken(credential: IConnectionCredential): string {
        const { key, secret } = credential;
        // Assume the user is username, not userid. According to Mindtouch API guide
        // https://success.mindtouch.com/Integrations/API/API_Tokens/Server_API_Tokens/Use_a_server_API_token_with_an_integration
        // A MindTouch username prefixed with `=` (e.g. =admin). The API request will be handled in the context of this user identity.
        // hash time, key, user with secret
        const user = '=' + credential.user;
        const hmac = crypto.createHmac('sha256', secret);
        const epoch = Math.floor(Date.now() / 1000);
        hmac.update(`${key}_${epoch}_${user}`);
        const hash = hmac.digest('hex');
        const token = `tkn_${key}_${epoch}_${user}_${hash}`;
        return token;
    }
}
