# VoejaTesteBackend

API para gerenciar tarefas

# Instruções Detalhadas de Como Executar o Projeto Localmente

Para executar este projeto localmente, siga os passos abaixo:

1. Pré-requisitos
Antes de começar, verifique se você tem as seguintes ferramentas instaladas na sua máquina:

-> Node.js (versão 22 ou superior)

Você pode verificar a versão do Node.js com o comando:

node -v

Se não tiver o Node.js instalado, baixe e instale: https://nodejs.org/en

-> Firebase:

Crie uma conta no Firebase.
Crie um novo projeto no Firebase Console.
Gere um arquivo de chave do serviço no Firebase (JSON) para autenticação do Firestore.
Acesse a seção "Configurações do projeto" e depois "Contas de Serviço".
Gere uma nova chave e baixe o arquivo JSON. Este arquivo será utilizado para conectar o seu projeto ao Firestore.

2. Clone o Repositório
Primeiro, clone este repositório em sua máquina local:

git clone https://github.com/zackfor/VoejaTesteBackend.git



3. Instalar as Dependências
Após clonar o repositório, entre na pasta voeja-teste-backend usando o comando: 

cd voeja-teste-backend


Depois, instale as dependências necessárias com o seguinte comando:

npm install


Este comando irá baixar e instalar todas as bibliotecas necessárias.



4. Configurar o Firebase
Coloque o arquivo JSON da chave do serviço do Firebase na pasta src/config/ do seu projeto. Este arquivo é necessário para que a aplicação se conecte ao Firestore.

O arquivo service-account.json é utilizado para autenticação.


Certifique-se de que o código para inicializar o Firebase Admin SDK no NestJS esteja configurado corretamente para carregar este arquivo (crie uma pasta "firebase" na pasta "src" e nessa pasta (firebase) crie um arquivo "firebase.module.ts" para conter o codigo seguinte):


import * as admin from 'firebase-admin';
import * as serviceAccount from './config/service-account.json';  // Caminho para o arquivo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'  // Substitua pelo URL do seu Firebase
});



5. Ignorar Arquivo de Chave no Git
O arquivo service-account.json contém informações sensíveis e deve ser ignorado no seu repositório. Certifique-se de adicionar esse arquivo ao .gitignore para que ele não seja versionado.

Exemplo de entrada no .gitignore:

\# Ignorar arquivo de chave do Firebase
src/config/service-account.json


6. Rodar o Projeto
Após a configuração, você pode iniciar o servidor local com o seguinte comando:

npm run start


Esse comando inicia o servidor, e a aplicação estará acessível em http://localhost:3000.


7. Acessar a Documentação da API (Swagger)
Uma vez que o servidor esteja rodando, você pode acessar a documentação interativa da API via Swagger. Abra o navegador e acesse:

http://localhost:3000/api

Lá você poderá visualizar todos os endpoints da API e fazer requisições diretamente pela interface do Swagger.




# Descrição das funcionalidades da API

Esta API permite a criação, listagem, consulta, atualização e deleção de tarefas. Abaixo estão os principais endpoints disponíveis:

1. Criar Tarefa - POST /tasks
    Cria uma nova tarefa.

2. Listar Tarefas - GET /tasks
    Retorna todas as tarefas cadastradas.

3. Consultar Tarefa por ID - GET /tasks/:id
    Retorna os detalhes de uma tarefa específica.

4. Atualizar Tarefa - PUT /tasks/:id
    Atualiza os dados de uma tarefa.

5. Deletar Tarefa - DELETE /tasks/:id
    Exclui uma tarefa específica.




# Descrição das tecnologias utilizadas com links para a documentação oficial

1. NestJS
Framework Node.js para construção de aplicações backend escaláveis e de fácil manutenção.
Documentação oficial: https://nestjs.com/

2. Firebase Firestore
Banco de dados NoSQL em tempo real, oferecido pela Google Firebase. Utilizado para armazenar e gerenciar as tarefas da aplicação.
Documentação oficial: https://firebase.google.com/docs/firestore

3. Swagger
Ferramenta para documentação de APIs RESTful. Utilizada para gerar a documentação automática da API.
Site: https://swagger.io/

4. Swagger UI Express
Middleware que serve a interface gráfica do Swagger em uma aplicação Express (e no NestJS). Ele é utilizado para exibir a documentação da API.
Documentação oficial: https://www.npmjs.com/package/swagger-ui-express

5. class-validator
Biblioteca para validação de dados no lado do servidor. Utilizada para validar os dados das requisições, como o título e a descrição das tarefas.
Documentação oficial: https://github.com/typestack/class-validator

6. firebase-admin
SDK para interação com o Firebase, utilizado para configurar e acessar o Firestore no servidor.
Documentação oficial: https://firebase.google.com/docs/admin/setup

7. @google-cloud/firestore
Cliente oficial do Firestore para Node.js, utilizado para acessar e interagir com o banco de dados Firestore.
Documentação oficial: https://googleapis.dev/nodejs/firestore/latest/

8. @nestjs/config
Módulo para carregar e gerenciar configurações de ambiente no NestJS.
Documentação oficial: https://docs.nestjs.com/techniques/configuration




# Exemplos de Requisições e Respostas dos Endpoints

Abaixo estão exemplos de como fazer requisições para os endpoints da API e os tipos de respostas que você pode esperar.


1. Criar Tarefa - POST /tasks
Requisição:

URL: http://localhost:3000/tasks

Método: POST

Body (JSON):

{
  "title": "Ir no mercado",
  "description": "Ir no mercado e comprar o que falta para fazer a sopa",
  "status": "pendente"
}


Resposta (sucesso):

Código HTTP: 201 Tarefa criada com sucesso!

Body:

{
  "id": "unique-task-id",
  "title": "Ir no mercado",
  "description": "Ir no mercado e comprar o que falta para fazer a sopa",
  "status": "pendente"
}


2. Listar Tarefas - GET /tasks

Requisição:

URL: http://localhost:3000/tasks

Método: GET

Resposta (sucesso):

Código HTTP: 200 Lista com todas as tarefas.

Body:

[
  {
    "id": "unique-task-id-1",
    "title": "Ir no mercado",
    "description": "Ir no mercado e comprar o que falta para fazer a sopa",
    "status": "pendente"
  },
  {
    "id": "unique-task-id-2",
    "title": "Praticar violão",
    "description": "Praticar para o próximo ensaio em grupo",
    "status": "concluída"
  }
]


3. Consultar Tarefa por ID - GET /tasks/:id
Requisição:

URL: http://localhost:3000/tasks/unique-task-id

Método: GET

Resposta (sucesso):

Código HTTP: 200 Tarefa encontrada com sucesso!

Body:

{
  "id": "unique-task-id",
  "title": "Ir no mercado",
  "description": "Ir no mercado e comprar o que falta para fazer a sopa",
  "status": "pendente"
}

Resposta (erro, caso a tarefa não seja encontrada):

Código HTTP: 404 Tarefa não encontrada.

Body:

{
  "message": "Tarefa ${id} não encontrada",
  "error": "Not Found",
  "statusCode": 404
}


4. Atualizar Tarefa - PUT /tasks/:id

Requisição:

URL: http://localhost:3000/tasks/unique-task-id

Método: PUT

Body (JSON):


{
  "title": "Ir no mercado",
  "description": "Ir no mercado e comprar o que falta para fazer a sopa",
  "status": "concluída"
}

Resposta (sucesso):

Código HTTP: 200 OK

Body:

{
  "id": "unique-task-id",
  "description": "Ir no mercado e comprar o que falta para fazer a sopa",
  "title": "Ir no mercado"
  "status": "concluída",
}


5. Deletar Tarefa - DELETE /tasks/:id

Requisição:

URL: http://localhost:3000/tasks/unique-task-id

Método: DELETE

Resposta (sucesso):

Código HTTP: 200 OK

Body:

{
  "message": "Tarefa ${id} deletada com sucesso!"
}

Resposta (erro, caso a tarefa não seja encontrada):

Código HTTP: 404 Not Found

Body:

{
  "message": "Tarefa ${id} não encontrada"
}
