import { Injectable } from '@nestjs/common';
import { dirname, extname } from 'path';
import { writeFile, rm, mkdir } from 'fs/promises';
import { STATIC_ROOT } from '../../constants/configuration';
import { EnvironmentService } from '../global/environment/environment.service';
import { ObjectId } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(private readonly environmentService: EnvironmentService) {}

  async saveProfilePicture(userId: ObjectId | string, file: Express.Multer.File): Promise<string> {
    const path = `/users/${userId}/profile-picture/image${extname(file.originalname)}`;
    const staticPath: string = STATIC_ROOT + path;
    const directory: string = dirname(staticPath);

    try {
      await writeFile(staticPath, file.buffer);
    } catch (e) {
      await mkdir(directory, { recursive: true });
      await writeFile(staticPath, file.buffer);
    }

    return `http://localhost:${this.environmentService.PORT + path}`;
  }

  async removeProfilePicture(userId: ObjectId | string) {
    await rm(`${STATIC_ROOT}/users/${userId}/profile-picture`, { recursive: true, force: true });
  }
}
