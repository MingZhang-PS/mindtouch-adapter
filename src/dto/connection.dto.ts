import { IsNotEmpty, IsJSON } from 'class-validator';
import { ConnectionCredential } from './connectionCredential';

export class ConnectionDTO {
    @IsJSON()
    @IsNotEmpty()
    connectionData: ConnectionCredential;
}
