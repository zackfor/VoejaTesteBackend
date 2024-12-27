import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Tarefas")
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @ApiOperation({ summary: "Criar uma nova tarefa" })
    @ApiBody({ description: "Payload para criar uma nova tarefa", type: CreateTaskDto })
    @ApiResponse({ status: 201, description: "Tarefa criada com sucesso!" })
    @ApiResponse({ status: 400, description: "Validação falhou." })
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return await this.tasksService.create(createTaskDto);
    }

    @ApiOperation({ summary: "Mostrar todas as tarefas" })
    @ApiResponse({ status: 200, description: "Lista com todas as tarefas." })
    @ApiResponse({ status: 500, description: "Erro no servidor." })
    @Get()
    async findAllTasks() {
        return this.tasksService.findAllTasks();
    }

    @ApiOperation({ summary: "Buscar tarefa por ID" })
    @ApiResponse({ status: 200, description: "Tarefa encontrada com sucesso!" })
    @ApiResponse({ status: 404, description: "Tarefa não encontrada." })
    @ApiResponse({ status: 500, description: "Erro no servidor." })
    @Get(":id")
    async findOneTask(@Param("id") id: string) {
        return this.tasksService.findOneTask(id);
    }

    @ApiOperation({ summary: "Atualizar tarefa por ID" })
    @ApiResponse({ status: 200, description: "Tarefa atualizada com sucesso!" })
    @ApiResponse({ status: 400, description: "Dados inválidos fornecidos." })
    @ApiResponse({ status: 404, description: "Tarefa não encontrada." })
    @ApiResponse({ status: 500, description: "Erro no servidor." })
    @Put(":id")
    async updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @ApiOperation({ summary: "Deletar uma tarefa por ID" })
    @ApiResponse({ status: 200, description: "Tarefa deletada com sucesso!" })
    @ApiResponse({ status: 404, description: "Tarefa não encontrada." })
    @ApiResponse({ status: 500, description: "Erro no servidor." })
    @Delete(":id")
    async deleteTask(@Param("id") id: string) {
        return this.tasksService.deleteTask(id);
    }
}
