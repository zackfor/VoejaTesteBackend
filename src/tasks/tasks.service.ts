import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks = [];

    async create(createTaskDto: CreateTaskDto) {
        const newTask = {id: Date.now(), ...createTaskDto};
        this.tasks.push(newTask);
        return newTask;
    }

    async findAllTasks() {
        return this.tasks;
    }

    async findOneTask(id: string) {
        return this.tasks.find((task) => task.id === parseInt(id));
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(id));
        if (taskIndex === -1) return null;

        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
        return this.tasks[taskIndex];
    }

    async deleteTask(id: string) {
        const taskIndex = this.tasks.findIndex((task) => task.id === parseInt(id));
        if (taskIndex === -1) return null;

        const deletedTask = this.tasks.splice(taskIndex, 1);
        return deletedTask[0];
    }

}
