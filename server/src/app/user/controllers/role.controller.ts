import { Controller } from '@nestjs/common';
import { Endpoint } from '../../../constants/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(Endpoint.ROLES)
@Controller(Endpoint.ROLES)
export class RoleController {}
