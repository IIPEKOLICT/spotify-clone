import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';

export abstract class CrudService<Entity extends { id: number }> {
  protected constructor(protected readonly repository: Repository<Entity>, protected readonly entityName: string) {}

  async count(filter?: Partial<Entity>): Promise<number> {
    return this.repository.count(filter as FindManyOptions<Entity>);
  }

  async getAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<Entity> {
    return this.getOne({ id } as Partial<Entity>);
  }

  async getByIdOrNull(id: number): Promise<Entity | null> {
    return this.getOneOrNull({ id } as Partial<Entity>);
  }

  async getOne(filter: Partial<Entity>): Promise<Entity> {
    const entity: Entity | undefined = await this.repository.findOneBy(filter as FindOptionsWhere<Entity>);

    if (!entity) {
      throw new EntityNotFoundError(this.entityName);
    }

    return entity;
  }

  async getOneOrNull(filter: Partial<Entity>): Promise<Entity | null> {
    return (await this.repository.findOneBy(filter as FindOptionsWhere<Entity>)) ?? null;
  }

  async create(entity: Partial<Entity>): Promise<Entity> {
    return this.repository.save(entity as DeepPartial<Entity>);
  }

  async createMany(entities: Partial<Entity>[]): Promise<Entity[]> {
    return this.repository.save(entities as Entity[]);
  }

  async updateById(id: number, dto: DeepPartial<Entity>): Promise<Entity> {
    await this.repository.update(id, dto as any);
    return this.getById(id);
  }

  async updateByIdOrNull(id: number, dto: DeepPartial<Entity>): Promise<Entity | null> {
    await this.repository.update(id, dto as any);
    return this.getByIdOrNull(id);
  }

  async updateMany(filter: Partial<Entity>, dto: Partial<Entity>) {
    await this.repository.update(filter as FindOptionsWhere<Entity>, dto as any);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
