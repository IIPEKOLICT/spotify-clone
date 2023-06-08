import { RoutePath } from '../constants/enums';

export class DynamicRoute {
  static profile(id: string): string {
    return RoutePath.USER.valueOf().replace(/:id/g, id);
  }
}
