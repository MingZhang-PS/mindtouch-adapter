import { IsUrl, IsNotEmpty, IsString } from 'class-validator';

export class ConnectionCredential {
    @IsUrl()
    @IsNotEmpty()
    siteURL: string;
    @IsString()
    @IsNotEmpty()
    user: string;
    @IsString()
    @IsNotEmpty()
    key: string;
    @IsString()
    @IsNotEmpty()
    secret: string;
}
