import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

export function BaseResolver<T>(
    classRef: any, // GraphQL object type
    createInput: any,
    updateInput: any,
) {
    @Resolver(() => classRef)
    abstract class BaseResolverHost {
        public service: any;

        @Query(() => [classRef], { name: `${classRef.name.toLowerCase()}s` })
        async findAll() {
            return this.service.findAll();
        }

        @Query(() => classRef, { name: classRef.name.toLowerCase() })
        async findOne(@Args('id', { type: () => Int }) id: number) {
            return this.service.findOne(id);
        }

        @Mutation(() => classRef, { name: `create${classRef.name}` })
        async create(@Args('createInput') input: typeof createInput) {
            return this.service.create(input);
        }

        @Mutation(() => classRef, { name: `update${classRef.name}` })
        async update(@Args('updateInput') input: typeof updateInput) {
            return this.service.update(input.id, input);
        }

        @Mutation(() => Boolean, { name: `remove${classRef.name}` })
        async remove(@Args('id', { type: () => Int }) id: number) {
            return this.service.delete(id);
        }
    }

    return BaseResolverHost;
}