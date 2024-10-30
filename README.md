# Teste Licitem

## Author
Para que não me conhece me chamo João Vitor, tenho 24 anos e amo desenvolver. Alem da tecnologia tenho como hobbies são passar tempo com minha esposa, jogar jogos eletronicos alem de estar com o meu cachorrinho. Sou uma pessoa que gosta muito de aprender, estudar e compartilhar conhecimentos.

No desenvolvimento deste projeto, me esforcei ao máximo para dar o meu melhor. Tive que aprender como utilizar o `socket` no back-end e como integrar ele ao front-end para realizar os envios de mensagem em tempo real.

## Introduction
Para o desenvolvimento da API, foi utilizado o framework **NestJS** na versão `10.4.6`, uma estrutura baseada em Express que facilita a criação de APIs escaláveis e modulares. No front-end, optou-se pela biblioteca JavaScript **React**, na versão `18.2.0`, utilizando o template de TypeScript para garantir uma tipagem mais robusta e segurança no desenvolvimento. Além disso, a aplicação está rodando com a versão `20.13.1` do Node.js, assegurando compatibilidade e desempenho otimizados.

### Project execution
Para executar o projeto, siga os passos abaixo.

### Clone repository
Para inciar é necessário clonar o repositório do Git. Use o seguinte comando no terminal, dentro da pasta onde deseja clonar o repositório:

```bash
  git clone https://github.com/JoaoVASSoares/teste-licitem.git
```

Após a conclusão do clone, você verá duas pastas: 
- `chat-backend`, que será nosso "servidor" (backend)
- `chat-frontend`, que será nosso front (interface do usuário).

### Server

#### Start server project
Para iniciar o projeto pelo lado do back-end (server), abra o terminal na pasta onde foi realizado o clone e execute o seguinte comando:
```bash
 cd chat-backend
```
Após isso, instale as dependências:
```bash
 npm install
```
Garanta que voce tenha instalado o nodejs na versao do projeto, caso utilize `nvm` basta executar:
```bash
  nvm use
```
Depois de instalar as dependências, inicie o projeto com:
```bash
  npm run start:dev
```

Após esses passos, o servidor estará em execução.

### Front-end

#### Start front project
Para iniciar o projeto pelo lado do front-end (interface), abra o terminal na pasta onde foi realizado o clone e execute o seguinte comando:
```bash
 cd chat-frontend
```
Em seguida, instale as dependências:
```bash
 npm install
```
Depois de instalar as dependências, inicie o projeto com:
```bash
  npm start
```
Ao finalizar a inicialização, o front-end será aberto automaticamente no seu navegador. Caso isso não ocorra, acesse o seguinte link: <a href="http://localhost:3000">http://localhost:3000</a>
