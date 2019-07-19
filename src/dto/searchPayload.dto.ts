import { IsString, IsNumber, IsOptional, IsArray, IsNotEmpty, IsJSON } from 'class-validator';
import { ConnectionCredential } from './connectionCredential';

export class SearchPayloadDTO {
    @IsNotEmpty()
    readonly search: string;
    @IsOptional()
    @IsNumber()
    page?: number;
    @IsOptional()
    @IsNumber()
    pageSize?: number;
    @IsOptional()
    @IsString()
    readonly orderBy?: string;
    @IsOptional()
    @IsArray()
    readonly fields?: string[];
    @IsJSON()
    @IsNotEmpty()
    connectionData: ConnectionCredential;
}
