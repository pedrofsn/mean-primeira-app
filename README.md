# Mongo

## Iniciando o Mongo

`mongod`

# Back end

Execute os comandos na pasta `backend`.

## Instalando dependências

`npm install`

## Executando em modo *dev*

`npm run dev`

## Executando um serviço

Abra o endereço `http://localhost:3003/api/billingSummary`, por exemplo, num navegador.

# Front End

Execute os comandos na pasta `angular1`.

## Instalando dependências

`npm install`

## Abrindo a aplicação web

Abra o endereço `http://localhost:4000` no navegador.

# Criando uma API

## Requisitos

* Node instalado.
* Mongo instalado e executando.

## Crie uma nova pasta e vá para ela

`mkdir myapi && cd myapi`

## Inicie um projeto Node

`npm init`

Com `enter`, aceite todas as opções padrão. Note que o arquivo `package.json` foi criado.

## Instale as dependências

`npm install express body-parser mongoose node-restful mongoose-paginate lodash express-query-int pm2 --save`

Essa operação baixa e instala, na pasta `node_modules` todas as dependências. Isso pode demorar alguns minutos. A pasta `node_modules` não deve ir para o controle de versão.

O parâmetro `--save` do comando `npm install` inclui as dependências no arquivo `package.json`.

## Instale as dependências de desenvolvimento

`npm i nodemon --save-dev`

Essa dependência será usada apenas durante o desenvolvimento.

## Defina os scripts de execução

Inclua os scripts `dev` e `production` da seguinte forma. 

```
...
"scripts": {
  "dev": "nodemon",
  "production": "pm2 start loader.js --name backend"
},
...
```
