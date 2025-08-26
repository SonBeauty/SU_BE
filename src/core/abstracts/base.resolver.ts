import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function BaseResolver<
    T extends { id: number },
    CreateInput,
    UpdateInput extends { id: number }
>(
    classRef: Type<T>, //classRef: tham chiếu tới entity GraphQL 
    createInput: Type<CreateInput>,
    updateInput: Type<UpdateInput>,
) {
    @Resolver(() => classRef)
    abstract class BaseResolverHost {
        public abstract service: {
            findAll(): Promise<T[]>;
            findOne(id: number): Promise<T | null>;
            create(input: CreateInput): Promise<T>;
            update(id: number, input: UpdateInput): Promise<T>;
            delete(id: number): Promise<boolean>;
        };

        // Returns array of entities (classRef Example: User,product)
        @Query(() => [classRef], { name: `${classRef.name.toLowerCase()}s` })
        async findAll(): Promise<T[]> {
            return this.service.findAll();
        }

        // Returns a single entity by ID(Object type: classRef)
        @Query(() => classRef, { name: classRef.name.toLowerCase() })
        async findOne(@Args('id', { type: () => Int }) id: number): Promise<T | null> {
            return this.service.findOne(id);
        }

        @Mutation(() => classRef, { name: `create${classRef.name}` })
        async create(@Args('createInput') input: CreateInput): Promise<T> {
            return this.service.create(input);
        }

        @Mutation(() => classRef, { name: `update${classRef.name}` })
        async update(@Args('updateInput') input: UpdateInput): Promise<T> {
            return this.service.update(input.id, input);
        }

        @Mutation(() => Boolean, { name: `remove${classRef.name}` })
        async remove(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
            return this.service.delete(id);
        }
    }

    return BaseResolverHost;
}