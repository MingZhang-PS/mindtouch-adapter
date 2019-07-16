import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsNumber, IsOptional, IsArray, IsEmpty, IsNotEmpty, IsDefined } from 'class-validator';
export class SearchPayloadDTO {
    readonly search: string;
    readonly page?: number;
    readonly pageSize?: number;
    readonly orderBy?: string;
    readonly fields?: string[];
    readonly connectionData: string;
}
