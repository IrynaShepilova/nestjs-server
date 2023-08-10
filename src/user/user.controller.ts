import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { ExpressRequest } from './types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto ): Promise<UserResponseInterface>{
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto);
        delete user.password;
        return this.userService.buildUserResponse(user);
    }

    @Get()
    @UseGuards(AuthGuard)
    async currentUser(
        @User() user: UserEntity,
    ): Promise<UserResponseInterface> {
        console.log('user decorator user', user);
        return this.userService.buildUserResponse(user);
    }
}
