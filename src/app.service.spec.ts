import { HttpService, HttpModule } from '@nestjs/common';
import { empty } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';
import { SearchPayloadDTO } from './dto/searchPayload.dto';
import { TokenService } from './token/token.service';
import { AppService } from './app.service';
import { ConnectionCredential } from './dto/connectionCredential';

describe('AppService', () => {
    let testService: AppService;
    let httpService: HttpService;
    let tokenService: TokenService;
    const fakeObservable = empty();
    const fakeToken = 'fake token';
    const fakeSearchTerm = 'i do not want to search anything';
    let httpGetSpy;
    let tokengeneratorSpy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AppService, TokenService],
        }).compile();

        testService = module.get<AppService>(AppService);
        httpService = module.get<HttpService>(HttpService);
        tokenService = module.get<TokenService>(TokenService);
        httpGetSpy = jest.spyOn(httpService, 'get');
        httpGetSpy.mockImplementation(() => fakeObservable);
        tokengeneratorSpy = jest.spyOn(tokenService, 'generateXDekiToken');
        tokengeneratorSpy.mockImplementation(() => fakeToken);
    });

    it('should mindtouch search endpoint called properly', (done) => {
        const searchPayload: SearchPayloadDTO = {
            search: fakeSearchTerm,
            connectionData: {
                siteURL: 'https://www.baidu.com',
                user: 'x-man',
                key: 'invalid key',
                secret: 'invalid secret',
            },
            page: 0,
            pageSize: 10,
        };

        const fakeXMLString = '<some>xml</some>';

        jest.spyOn(fakeObservable, 'toPromise').mockImplementationOnce(() => Promise.resolve({ data: fakeXMLString }));
        testService.searchArticles(searchPayload).then((xml) => {
            expect(httpService.get).toHaveBeenCalledTimes(1);
            expect(httpService.get).toHaveBeenCalledWith(searchPayload.connectionData.siteURL + testService.searchEndpoint,
                {
                    headers: { 'X-Deki-Token': fakeToken },
                    params: {
                        'constraint': testService.searchConstraint,
                        'limit': 10,
                        'offset': 0,
                        'origin:mt-web': null,
                        'q': fakeSearchTerm,
                    },
                });
            expect(xml.toString()).toBe(fakeXMLString);
            done();
        });
    });

    it('should mindtouch get endpoint called properly', (done) => {
        const credential: ConnectionCredential = {
                siteURL: 'https://www.baidu.com',
                user: 'x-man',
                key: 'invalid key',
                secret: 'invalid secret',
        };

        const fakeXMLString = '<some>xml</some>';

        jest.spyOn(fakeObservable, 'toPromise').mockImplementationOnce(() => Promise.resolve({ data: fakeXMLString }));
        testService.getArticle('123', credential).then((xml) => {
            expect(httpService.get).toHaveBeenCalledTimes(1);
            expect(httpService.get).toHaveBeenCalledWith(credential.siteURL + testService.getEndpoint.replace('${id}', '123'),
                {
                    headers: { 'X-Deki-Token': fakeToken },
                });
            expect(xml.toString()).toBe(fakeXMLString);
            done();
        });
    });

});
