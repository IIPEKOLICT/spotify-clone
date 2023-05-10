import { Controller } from '@nestjs/common';
import { ENDPOINT } from '../../../constants/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(ENDPOINT.ROLES)
@Controller(ENDPOINT.ROLES)
export class RoleController {}
