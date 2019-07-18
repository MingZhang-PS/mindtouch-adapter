import { Test, TestingModule } from '@nestjs/testing';
import { XMLMessageMappingHelper4Search } from './XMLMessageMappingHelper4Search';
import { XML2JsonHelper } from './XML2JsonHelper';
import xmldoc = require('xmldoc');
import fs = require('fs');

describe('XMLMessageMappingHelper4Search', () => {
  let transformer: XMLMessageMappingHelper4Search;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XMLMessageMappingHelper4Search],
    }).compile();

    transformer = module.get<XMLMessageMappingHelper4Search>(XMLMessageMappingHelper4Search);
  });

  test('page size should > 0', () => {
    fs.readFile('./sample.xml', function (err, xmldata) {
      if (err) {
        console.log("Error occurs in reading xml file: ", err);
      } else {
        const parser = new XML2JsonHelper();
        const xmldocument = new xmldoc.XmlDocument(xmldata.toString());
        const result = transformer.map(xmldocument);
        expect(result.pageSize).toBeGreaterThan(0);
      }
    });
  });

  test('the frist mock article ID should be 12346', () => {
    fs.readFile('./sample.xml', function (err, xmldata) {
      if (err) {
        console.log("Error occurs in reading xml file: ", err);
      } else {
        const parser = new XML2JsonHelper();
        const xmldocument = new xmldoc.XmlDocument(xmldata.toString());
        const result = transformer.map(xmldocument);
        console.log(result.data[0].id);
        expect(result.data[0].id).toBe("123464666");
      }
    });
  });

  it('should be defined', () => {
    expect(transformer).toBeDefined();
  });
});