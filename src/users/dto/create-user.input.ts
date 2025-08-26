import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;
}
