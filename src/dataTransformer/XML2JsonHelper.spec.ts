import { Test, TestingModule } from '@nestjs/testing';
import { XML2JsonHelper } from './XML2JsonHelper';
import xmldoc = require('xmldoc');
import fs = require('fs');

describe('XML2JsonHelper', () => {
  let parser: XML2JsonHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XML2JsonHelper],
    }).compile();

    parser = module.get<XML2JsonHelper>(XML2JsonHelper);
  });

  test('xml string to json', () => {
    const xmldocument = new xmldoc.XmlDocument("<data>search result is here</data>");
    const parser = new XML2JsonHelper();
    const json_result = parser.transform(xmldocument);
    const result = JSON.parse(json_result);
    expect(result.data).toBe("search result is here");
  });

  test('xml file to json', () => {
    fs.readFile('./sample.xml', function (err, xmldata) {
      if (err) {
        console.log("Error occurs in reading xml file: ", err);
      } else {
        const parser = new XML2JsonHelper();
        const xmldocument = new xmldoc.XmlDocument(xmldata.toString());
        const json_result = parser.transform(xmldocument);
        const result = JSON.parse(json_result);
        expect(result.search.page[0].title).toBe("Turning On Your Phone");
      }
    });
  });

  it('should be defined', () => {
    expect(parser).toBeDefined();
  });
});