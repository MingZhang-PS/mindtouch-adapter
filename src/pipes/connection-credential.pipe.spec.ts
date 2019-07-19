import { BadRequestException } from '@nestjs/common';
import { ConnectionCredentialPipe } from './connection-credential.pipe';
import { SearchPayloadDTO } from 'src/dto/searchPayload.dto';


describe('ConnectionCredentialPipe', () => {
  let testedPipe: ConnectionCredentialPipe;

  beforeEach(() => {
    testedPipe = new ConnectionCredentialPipe();
  });

  describe('tranform SearchPayloadDTO', () => {
    it('should empty search string throw bad request', async () => {
      const payload: SearchPayloadDTO = {
        search: '',
        connectionData: {
          siteURL: 'https://sapdemo-responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
        },
      };

      try {
        await testedPipe.transform(payload, null);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should invalid siteURL connectionData throw bad request', async () => {
      const payload: SearchPayloadDTO = {
        search: 'coffee',
        connectionData: {
          siteURL: 'https://sapdemo -responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
        },
      };

      try {
        await testedPipe.transform(payload, null);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should empty secret connectionData throw bad request', async () => {
      const payload: SearchPayloadDTO = {
        search: 'coffee',
        connectionData: {
          siteURL: 'https://sapdemo-responsive.mindtouch.us',
          user: 'admin',
          key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
          secret: '',
        },
      };

      try {
        await testedPipe.transform(payload, null);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
