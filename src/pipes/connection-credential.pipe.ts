import { ConnectionDTO } from '../dto/connection.dto';
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { transformAndValidate } from 'class-transformer-validator';
import { ConnectionCredential } from '../dto/connectionCredential';
import { SearchPayloadDTO } from '../dto/searchPayload.dto';

@Injectable()
export class ConnectionCredentialPipe implements PipeTransform {
  async transform(value: SearchPayloadDTO | ConnectionDTO, metadata: ArgumentMetadata) {
    let credential: ConnectionCredential;
    try {
      credential = await transformAndValidate(ConnectionCredential, value.connectionData );
    } catch (err) {
      throw new BadRequestException();
    }
    value.connectionData = credential;
    return value;
  }
}
