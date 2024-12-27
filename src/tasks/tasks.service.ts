import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@Inject("FIRESTORE") private readonly firestore: Firestore) {}

    private tasksCollection = this.firestore.collection("tasks");

    async create(createTaskDto: CreateTaskDto) {
        const newTask = await this.tasksCollection.add(createTaskDto);
        const createdTask = (await newTask.get()).data();
        return { id: newTask.id, ...createdTask};
    }

    async findAllTasks() {
        const allTasks = await this.tasksCollection.get();
        return allTasks.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async findOneTask(id: string) {
        const taskSearchedFor = await this.tasksCollection.doc(id).get();
        if (!taskSearchedFor.exists) {
            throw new NotFoundException(`Tarefa ${id} nao encontrado`);
        }
        return { id: taskSearchedFor.id, ...taskSearchedFor.data() };
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        const taskUpdate = this.tasksCollection.doc(id);
        await taskUpdate.update(updateTaskDto as { [key: string]: any });
        const updatedTask = (await taskUpdate.get()).data();
        return { id, ...updatedTask };
    }

    async deleteTask(id: string) {
        await this.tasksCollection.doc(id).delete();
        return { message: `Tarefa ${id} deletado com sucesso` };
    }

}
