import { Test, TestingModule } from '@nestjs/testing';
import { XML2JsonHelper } from './XML2JsonHelper';

describe('XML2JsonHelper', () => {
    let parser: XML2JsonHelper;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [XML2JsonHelper],
      }).compile();
  
      parser = module.get<XML2JsonHelper>(XML2JsonHelper);
    });
  
    it('should be defined', () => {
      expect(parser).toBeDefined();
    });
  });