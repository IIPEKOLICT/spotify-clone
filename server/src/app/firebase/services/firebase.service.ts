import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EnvironmentService } from '../../global/environment/environment.service';

@Injectable()
export class FirebaseService {
  private readonly application: admin.app.App;

  constructor(private readonly environmentService: EnvironmentService) {
    this.application = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: environmentService.GOOGLE_PROJECT_ID,
        privateKey: environmentService.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        clientEmail: environmentService.GOOGLE_CLIENT_EMAIL,
      }),
      storageBucket: environmentService.GOOGLE_BUCKET_NAME,
    });
  }

  get app(): admin.app.App {
    return this.application;
  }
}
