import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsNumber, IsOptional, IsArray, IsEmpty, IsNotEmpty, IsDefined } from 'class-validator';
import { ConnectionDataDTO } from './connectionData.dto';
export class SearchPayloadDTO {

    search: string;

    connectionData: ConnectionDataDTO;

    page?: number;

    pageSize?: number;

    orderBy?: string;

    fields?: string[];
}
