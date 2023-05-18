import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async findAll(): Promise<TagEntity[]> {
        return await this.tagService.findAll();
    }

    @Post()
    async addTag(@Body() tag: TagDto) {
        await this.tagService.addTag(tag);
    }

    @Delete()
    async deleteTag(@Body() tag: TagDto) {
        console.log('delete in ctrl', tag);
        await this.tagService.deleteTag(tag);
    }

}