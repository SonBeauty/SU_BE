import { BaseEntity } from '../abstracts/base.entity';
import { IBaseRepository } from '../interfaces/base.repository.interface';
// import { PrismaService } from '../prisma/prisma.service';
// import { PrismaClient } from '@prisma/client';

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

// import { PrismaService } from '../prisma/prisma.service';
// import { PrismaClient } from '@prisma/client';

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


import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

type StringKeys<T> = Extract<keyof T, string>;

type ModelName = {
  [K in StringKeys<PrismaClient>]: PrismaClient[K] extends { findMany: (...args: any[]) => any }
  ? K
  : never;
}[StringKeys<PrismaClient>];

type DelegateOf<K extends ModelName> = PrismaClient[K];

export abstract class BaseService<TModelName extends StringKeys<PrismaService>> {
  protected readonly delegate: DelegateOf<TModelName>;

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: TModelName,
  ) {
    this.delegate = prisma[model] as DelegateOf<TModelName>;
  }

  async findOne(where: Parameters<DelegateOf<TModelName>['findUnique']>[0]) {
    return this.delegate.findUnique(where);
  }

  async findAll(where?: Parameters<DelegateOf<TModelName>['findMany']>[0]) {
    return this.delegate.findMany(where);
  }

  async create(data: Parameters<DelegateOf<TModelName>['create']>[0]) {
    return this.delegate.create(data);
  }

  async update(data: Parameters<DelegateOf<TModelName>['update']>[0]) {
    return this.delegate.update(data);
  }

  async delete(where: Parameters<DelegateOf<TModelName>['delete']>[0]) {
    return this.delegate.delete(where);
  }
}

