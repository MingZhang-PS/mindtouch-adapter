import { IsString, IsNotEmpty, IsJSON } from 'class-validator';
import { Transform, plainToClass, Type } from 'class-transformer';
import { ConnectionCredential } from './connectionCredential';

export class ConnectionDTO {
    @IsJSON()
    @IsNotEmpty()
    connectionData: ConnectionCredential;
}
