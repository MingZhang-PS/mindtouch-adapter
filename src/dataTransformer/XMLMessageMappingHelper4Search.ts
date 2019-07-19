import { XmlDocument } from 'xmldoc';
import { SearchResultsDTO } from '../dto/searchResults.dto';
import { XML2JsonHelper } from '../dataTransformer/XML2JsonHelper';
import { IArticle } from '../dto/interface/article.interface';
import { IArticleWrapper } from '../dto/interface/articleWrapper.interface';

export class XMLMessageMappingHelper4Search {
    map(source: XmlDocument): SearchResultsDTO {
        const mockAdapterSearchResults = require('../common/mockdata/adapterSearchResults.json');
        const jsonParser = new XML2JsonHelper();
        const sourceJson = jsonParser.transform(source);
        console.log(sourceJson);

        let resultJson = new SearchResultsDTO();
        resultJson.pageSize = sourceJson.search.count;
        resultJson.totalObjectCount = sourceJson.search.querycount;
        resultJson.lastPage = resultJson.totalObjectCount / resultJson.pageSize + 1;

        let articleWrapper = {} as IArticleWrapper;
        resultJson.data = articleWrapper;
        articleWrapper.knowledgeArticle = [];
        const countOfArticles = sourceJson.search.page.length;
        const provider = 'MINDTOUCH';
        const renderType = 'IFRAME';
        for (let i = 0; i < countOfArticles; i++) {
            const page = sourceJson.search.page[i];
            const article = {} as IArticle;
            article.id = page.id;
            article.title = page.title;
            article.lastUpdated = page["date.modified"];
            article.score = page.score;
            article.author = page["user.author"].fullname;
            article.provider = provider;
            article.renderType = renderType;
            article.views = page.metrics["metric.views"];
            //for (let j = 0; j < page.tags.tag.length; j++){
                //todo: populate tags
            //}
            article.link = page["uri.ui"];
            //To-do: fomulate right renderValue
            article.renderValue = page["uri.ui"];
            
            //To-do: convert score to float
            //To-do: calculate devotes and upvotes

            resultJson.data.knowledgeArticle.push(article);
        }
//        return mockAdapterSearchResults;
          return resultJson;
    }
}
