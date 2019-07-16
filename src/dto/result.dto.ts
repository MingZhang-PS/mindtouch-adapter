import { ApiResponseModelProperty } from '@nestjs/swagger';
import { IArticleWrapper } from './interface/articleWrapper.interface';

export class ResultDTO {
  data: IArticleWrapper;
}
