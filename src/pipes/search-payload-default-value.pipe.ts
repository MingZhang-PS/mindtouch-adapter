import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SearchPayloadDTO } from 'src/dto/searchPayload.dto';

@Injectable()
export class SearchPayloadDefaultValuePipe implements PipeTransform {
  readonly DEFAULT_PAGE = 0;
  readonly DEFAULT_PAGESIZE = 10;
  transform(value: SearchPayloadDTO, metadata: ArgumentMetadata) {
    if (!value.page) {
      value.page = this.DEFAULT_PAGE;
    }
    if (!value.pageSize) {
      value.pageSize = this.DEFAULT_PAGESIZE;
    }
    return value;
  }
}
