import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { EntityNotFoundError } from '../../errors/entity-not-found.error';

export abstract class CrudService<Entity extends { id: number }> {
  protected constructor(protected readonly repository: Repository<Entity>, protected readonly entityName: string) {}

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
    filter: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
    limit?: number,
    skip?: number,
  ): Promise<Entity[]> {
    return this.repository.find({ where: filter, skip, take: limit });
  }

  async getById(id: number): Promise<Entity> {
    return this.getOne({ id } as FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]);
  }

  async getByIdOrNull(id: number): Promise<Entity | null> {
    return this.getOneOrNull({ id } as FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]);
  }

  async getOne(filter: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity> {
    const entity: Entity | undefined = await this.repository.findOneBy(filter);

    if (!entity) {
      throw new EntityNotFoundError(this.entityName);
    }

    return entity;
  }

  async getOneOrNull(filter: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity | null> {
    return (await this.repository.findOneBy(filter)) ?? null;
  }

  async create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async createMany(entities: DeepPartial<Entity>[]): Promise<Entity[]> {
    return this.repository.save(entities);
  }

  async updateById(id: number, dto: DeepPartial<Entity>): Promise<Entity> {
    await this.repository.update(id, dto as any);
    return this.getById(id);
  }

  async updateByIdOrNull(id: number, dto: DeepPartial<Entity>): Promise<Entity | null> {
    await this.repository.update(id, dto as any);
    return this.getByIdOrNull(id);
  }

  async updateMany(filter: FindOptionsWhere<Entity>, dto: Partial<Entity>) {
    await this.repository.update(filter, dto as any);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
