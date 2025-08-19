import { BaseEntity } from '../abstracts/base.entity';

export interface IBaseRepository<T extends BaseEntity> {
  findOne(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}
