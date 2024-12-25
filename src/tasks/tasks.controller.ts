import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from './dto/update-task.dto';
import { StringifyOptions } from 'querystring';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return await this.tasksService.create(createTaskDto);
    }

    @Get()
    async findAllTasks() {
        return this.tasksService.findAllTasks();
    }

    @Get(":id")
    async findOneTask(@Param("id") id: string) {
        return this.tasksService.findOneTask(id);
    }

    @Put(":id")
    async updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @Delete(":id")
    async deleteTask(@Param("id") id: string) {
        return this.tasksService.deleteTask(id);
    }
}
