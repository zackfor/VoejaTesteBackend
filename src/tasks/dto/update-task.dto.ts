import { IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum TaskStatus {
    PENDENTE = "pendente",
    EM_ANDAMENTO = "em andamento",
    CONCLUIDA = "concluída",
}

export class UpdateTaskDto {
    @ApiProperty({
        description: "Novo titulo da tarefa",
        example: "Novo Titulo",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Nova descrição da tarefa",
        example: "Nova Descrição",
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "Novo status da tarefa. Pode ser 'pendente', 'em andamento', ou 'conluída'.",
        example: "concluída",
        enum: TaskStatus,
    })
    @IsEnum(TaskStatus)
    status: TaskStatus;

}