import { BaseEntity } from '../abstracts/base.entity';
import { IBaseRepository } from '../interfaces/base.repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

// export abstract class BaseService<T extends BaseEntity> {
//   constructor(private readonly repository: IBaseRepository<T>) {}

//   async findOne(id: number): Promise<T> {
//     return this.repository.findOne(id);
//   }

//   async findAll(): Promise<T[]> {
//     return this.repository.findAll();
//   }

//   async create(data: Partial<T>): Promise<T> {
//     return this.repository.create(data);
//   }

//   async update(id: number, data: Partial<T>): Promise<T> {
//     return this.repository.update(id, data);
//   }

//   async delete(id: number): Promise<void> {
//     return this.repository.delete(id);
//   }
// }


type StringKeys<T> = Extract<keyof T, string>;

type ModelName = {
  [K in StringKeys<PrismaClient>]: PrismaClient[K] extends { findMany: any }
  ? K
  : never;
}[StringKeys<PrismaClient>];

export abstract class BaseService<TModelName extends ModelName> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: TModelName,
  ) { }

  async findOne(where: any) {
    return (this.prisma[this.model as keyof PrismaService] as any).findUnique({ where });
  }

  async findAll() {
    return (this.prisma[this.model as keyof PrismaService] as any).findMany();
  }

  async create(data: any) {
    return (this.prisma[this.model as keyof PrismaService] as any).create({ data });
  }

  async update(where: any, data: any) {
    return (this.prisma[this.model as keyof PrismaService] as any).update({ where, data });
  }

  async delete(where: any) {
    return (this.prisma[this.model as keyof PrismaService] as any).delete({ where });
  }
}
