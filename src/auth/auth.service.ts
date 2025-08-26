import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { AuthPayload } from './entities/auth.entity';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(loginInput: LoginInput): Promise<AuthPayload> {
        const user = await this.usersService.findOneByEmail(loginInput.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const isPasswordMatching = await bcrypt.compare(
            loginInput.password,
            user.password,
        );

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        const { password, ...userResult } = user;

        return {
            accessToken,
            user: userResult as any,
        };
    }

    async register(registerInput: RegisterInput): Promise<AuthPayload> {
        const existingUser = await this.usersService.findOneByEmail(registerInput.email);
        if (existingUser) {
            throw new UnauthorizedException('Email is already in use.');
        }

        const user = await this.usersService.create(registerInput);
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        const { password, ...userResult } = user;

        return {
            accessToken,
            user: userResult as any,
        };
    }


}
