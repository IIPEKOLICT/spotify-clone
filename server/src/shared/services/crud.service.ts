import { DataSource, DeepPartial, FindOptionsWhere, MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';
import { TimestampEntity } from '../entities/timestamp.entity';

export abstract class CrudService<Entity extends TimestampEntity> {
  protected readonly repository: MongoRepository<Entity>;

  protected constructor(protected readonly dataSource: DataSource, protected readonly entityName: string) {
    this.repository = dataSource.getMongoRepository<Entity>(entityName);
  }

  protected parseId(id: ObjectId | string): ObjectId {
    return typeof id === 'string' ? ObjectId.createFromHexString(id) : id;
  }

  async isExists(filter?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<boolean> {
    return this.repository.exist({ where: filter });
  }

  async count(filter?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<number> {
    return this.repository.count({ where: filter });
  }

  async getAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async getPaginated(
    filter: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] = {},
    limit?: number,
    skip?: number,
  ): Promise<Entity[]> {
    return this.repository.find({ where: filter, skip, take: limit });
  }

  async getById(id: ObjectId | string): Promise<Entity> {
    return this.getOne({ _id: this.parseId(id) } as FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]);
  }

  async getByIdOrNull(id: ObjectId | string): Promise<Entity | null> {
    return this.getOneOrNull({ _id: this.parseId(id) } as FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]);
  }

  async getOne(filter?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity> {
    const entity: Entity | undefined = await this.repository.findOneBy(filter);

    if (!entity) {
      throw new EntityNotFoundError(this.entityName);
    }

    return entity;
  }

  async getOneOrNull(filter: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] = {}): Promise<Entity | null> {
    return (await this.repository.findOneBy(filter)) ?? null;
  }

  async create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async createMany(entities: DeepPartial<Entity>[]): Promise<Entity[]> {
    return this.repository.save(entities);
  }

  async updateById(id: ObjectId | string, dto: DeepPartial<Entity>): Promise<Entity> {
    const entityId: ObjectId = this.parseId(id);
    await this.repository.update(entityId, dto as any);
    return this.getById(entityId);
  }

  async updateByIdOrNull(id: ObjectId | string, dto: DeepPartial<Entity>): Promise<Entity | null> {
    const entityId: ObjectId = this.parseId(id);
    await this.repository.update(entityId, dto as any);
    return this.getByIdOrNull(entityId);
  }

  async updateMany(filter: FindOptionsWhere<Entity>, dto: Partial<Entity>) {
    await this.repository.update(filter, dto as any);
  }

  async deleteById(id: ObjectId | string): Promise<void> {
    await this.repository.softDelete(this.parseId(id));
  }
}
