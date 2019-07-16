import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class ConnectionDataDTO {
    readonly siteURL: string;
    readonly username: string;
    readonly password: string;
    // secret: string;
}
