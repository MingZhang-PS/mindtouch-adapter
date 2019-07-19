import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { ConnectionCredential } from 'src/dto/connectionCredential';

describe('TokenService', () => {
  let service: TokenService;
  let dateNowSpy;

  beforeAll(() => {
      // Lock Time
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should DEKI token generated properly', () => {
    let credential: ConnectionCredential = {
      siteURL: 'https://sapdemo-responsive.mindtouch.us',
      user: 'admin',
      key: '5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11',
      secret: 'f6d3306b11dd361c165ca981280bcdaa0c56a6d5bd9b36c8497a99b2ab4c16b9',
    };

    expect(service.generateXDekiToken(credential)).
    toBe(`tkn_5cd197ff89096ce78a1e27b28bf371e2d3bb065e51e3b607fdf13f7c7630bf11_1487076708_=admin_22a360e9375c44eabe68b82f620f12c14da264ccd78eac6a0163ace698c8cf4e`);
  });

  afterAll(() => {
    // Unlock Time
    dateNowSpy.mockRestore();
});
});
