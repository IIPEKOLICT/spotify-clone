import { Module } from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';
import { FirebaseStorageService } from './services/firebase-storage.service';

@Module({
  providers: [FirebaseService, FirebaseStorageService],
  exports: [FirebaseStorageService],
})
export class FirebaseModule {}
