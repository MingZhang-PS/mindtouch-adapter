import { SearchPayloadDefaultValuePipe } from './search-payload-default-value.pipe';
import { SearchPayloadDTO } from 'src/dto/searchPayload.dto';

describe('SearchPayloadDefaultValuePipe', () => {
  let testedPipe: SearchPayloadDefaultValuePipe;

  beforeEach(() => {
    testedPipe = new SearchPayloadDefaultValuePipe();
  });

  describe('handle the field page', () => {
    it('should missing page be set as default', () => {
      const payload: SearchPayloadDTO = {
        search: 'coffee',
        connectionData: {
          siteURL: 'https://sapdemo-responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
        },
      };
      expect(testedPipe.transform(payload, null).page).toEqual(testedPipe.DEFAULT_PAGE);
    });

    it('should page already set not be changed', () => {
      const payload: SearchPayloadDTO = {
        search: 'coffee',
        connectionData: {
          siteURL: 'https://sapdemo-responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
        },
        page: 1,
      };
      expect(testedPipe.transform(payload, null).page).toEqual(1);
    });
  });

  describe('handle the field pageSize', () => {
    it('should missing pageSize be set as default', () => {
      const payload: SearchPayloadDTO = {
        search: 'coffee',
        connectionData: {
          siteURL: 'https://sapdemo-responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
        },
      };
      expect(testedPipe.transform(payload, null).pageSize).toEqual(testedPipe.DEFAULT_PAGESIZE);
    });

    it('should pageSize already set not be changed', () => {
      const payload: SearchPayloadDTO = {
        search: 'coffee',
        connectionData: {
          siteURL: 'https://sapdemo-responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
        },
        pageSize: 17,
      };
      expect(testedPipe.transform(payload, null).pageSize).toEqual(17);
    });
  });
});
