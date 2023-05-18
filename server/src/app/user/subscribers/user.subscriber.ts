import {
  DataSource,
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  SoftRemoveEvent,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { PostEntity } from '../../post/post.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  private async removeUserPosts(entityManager: EntityManager, user?: UserEntity) {
    if (!user) {
      return;
    }

    await entityManager.transaction(async (manager: EntityManager) => {
      await manager.delete(PostEntity, { user });
    });
  }

  async beforeRemove(event: RemoveEvent<UserEntity>) {
    await this.removeUserPosts(event.manager, event.entity);
  }

  async beforeSoftRemove(event: SoftRemoveEvent<UserEntity>) {
    await this.removeUserPosts(event.manager, event.entity);
  }
}
