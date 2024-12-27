import { IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum TaskStatus {
    PENDENTE = "pendente",
    EM_ANDAMENTO = "em andamento",
    CONCLUIDA = "concluída",
}

export class CreateTaskDto {
    @ApiProperty({
        description: "Titulo da tarefa",
        example: "Titulo",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Descrição da tarefa",
        example: "Descrição",
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "Status da tarefa. Pode ser 'pendente', 'em andamento', ou 'conluída'.",
        example: "pendente",
        enum: TaskStatus,
    })
    @IsEnum(TaskStatus)
    status: TaskStatus;

}