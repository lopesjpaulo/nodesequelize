## Node Sequelize

Desenvolvimento de uma API REST construída em Node.js usando alguns conceitos de Typescript com foco no uso de Sequelize para conexão com banco de dados Mysql e o uso de migrations. O foco principal do desenvolvimento é o aprendizado de alguns conceitos e técnicas relativas ao Node.

Posteriormente essa API será consumida por uma aplicação front-end React e uma aplicação mobile em React Native, ambos também desenvolvidas para aprendizagem de conceitos e técnicas. 

# Tecnologias utilizadas

- Node.js
- Typescript
- Sequelize
- MySQL
- Npm
- Nodemon

# Procedimentos

1. Tenha o **Node.js** e o **npm** instalado
2. Atualize as dependências do projeto usando o comando **npm i**
3. Crie o banco de dados e caso seja necessário, mude os parâmentros de conexão ao banco de dados no arquivo **config.json** dentro da pasta **config**
4. Execute o comando **npx sequelize db:migrate** para rodas as migrations e criar as tabelas no banco de dados selecionado
5. Execute o comando **npx sequelize db:seed:all** para rodas as seeders e popular as tabelas com valores base

# DOCKER 

1. Instale o Docker na sua máquina
2. Execute o comando **docker-compose up phpmyadmin**
3. Modifique a senha de conexão ao banco de dados para **password**
4. Acesse o **phpmyadmin** usando **localhost:8080**
5. No campo host insira o valor **db**, no usuário insira **root** e no campo password insira **password**
6. Importe a tabela e ajuste o nome das tabelas (provisório)

# Autoria

- João Paulo Lopes [lopesjpaulo](https://github.com/lopesjpaulo)