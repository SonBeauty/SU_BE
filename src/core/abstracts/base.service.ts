import { BaseEntity } from '../abstracts/base.entity';
import { IBaseRepository } from '../interfaces/base.repository.interface';

export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: IBaseRepository<T>) {}

  async findOne(id: number): Promise<T> {
    return this.repository.findOne(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
