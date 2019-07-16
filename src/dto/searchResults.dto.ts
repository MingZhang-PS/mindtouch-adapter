import { IArticleWrapper } from './interface/articleWrapper.interface';
import { Type } from 'class-transformer';
import { ApiResponseModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SearchResultsDTO {

  data: IArticleWrapper;

  pageSize: number;

  currentPage: number;

  lastPage: number;

  totalObjectCount: number;
}
