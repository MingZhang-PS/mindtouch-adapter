import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class ConnectionDataDTO {
    siteURL: string;
    user: string;
    key: string;
    secret: string;
}
