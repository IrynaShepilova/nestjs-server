import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) {}

    async findAll(): Promise<TagEntity[]> {
        console.log('tags requested');
        return await this.tagRepository.find();
    }

    addTag(tag) {
        console.log('add tag', tag);
        return this.tagRepository.save(tag);
    }

    async deleteTag(tag) {
        await this.tagRepository.delete(tag);
    }

}