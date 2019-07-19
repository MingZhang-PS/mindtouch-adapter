import { IArticleWrapper } from './interface/articleWrapper.interface';

export class SearchResultsDTO {

  data: IArticleWrapper;

  pageSize: number;

  currentPage: number;

  lastPage: number;

  totalObjectCount: number;
}
