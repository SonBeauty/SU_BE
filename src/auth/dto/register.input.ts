import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;

    @Field({ nullable: true })
    @IsString()
    name?: string;
}
