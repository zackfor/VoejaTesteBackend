import { IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum TaskStatus {
    PENDENTE = "pendente",
    EM_ANDAMENTO = "em andamento",
    CONCLUIDA = "concluida",
}

export class CreateTaskDto {
    @ApiProperty({
        description: "titulo da tarefa",
        example: "Titulo",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "descricao da tarefa",
        example: "Descricao",
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "status da tarefa",
        example: "pendente",
        enum: TaskStatus,
    })
    @IsEnum(TaskStatus)
    status: TaskStatus;

}