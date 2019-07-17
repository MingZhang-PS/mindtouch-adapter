import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SearchPayloadDTO } from 'src/dto/searchPayload.dto';

@Injectable()
export class SearchPayloadDefaultValuePipe implements PipeTransform {
  transform(value: SearchPayloadDTO, metadata: ArgumentMetadata) {
    if (!value.page) {
      value.page = 0;
    }
    if (!value.pageSize) {
      value.pageSize = 10;
    }
    return value;
  }
}
