import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        try {
            const user = await this.userService.findUserByUsername(username);
            if (user) {
                const isMatch = await bcrypt.compare(pass, user.password);
                if (isMatch) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...rest } = user;
                    return rest;
                }
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
