import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from 'src/core/abstracts/base.entity';

@ObjectType()
export class User extends BaseEntity {
    @Field()
    email: string;

    @Field({ nullable: true })
    name: string | null;
}
