import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from './types/userResponse.interface';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOneBy({
            email: createUserDto.email,
        });

        if (userByEmail){
            throw new HttpException(
                'Email already taken',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        console.log('create new user, email: ', newUser.email );
        return await this.userRepository.save(newUser);
    }

    generateJwt(user: UserEntity):string {
        return sign({
            id: user.id,
            email: user.email
        }, JWT_SECRET);
    }

    buildUserResponse(user: UserEntity): UserResponseInterface{
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }

    async login(loginUserDto: LoginUserDto ): Promise<UserEntity>{
        const user = await this.userRepository.findOneBy({email: loginUserDto.email} );

        if (!user) {
            throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordCorrect = await compare(loginUserDto.password, user.password );

        if (!isPasswordCorrect) {
            throw new HttpException('Credentials are incorrect', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({ id });
    }
}
