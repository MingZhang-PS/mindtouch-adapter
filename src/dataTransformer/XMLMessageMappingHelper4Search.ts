import { XmlDocument } from 'xmldoc';
import { SearchResultsDTO } from '../dto/searchResults.dto';

export class XMLMessageMappingHelper4Search {
    map(source: XmlDocument): SearchResultsDTO {
        const mockAdapterSearchResults = require('../common/mockdata/adapterSearchResults.json');
        return mockAdapterSearchResults;
    }
}
