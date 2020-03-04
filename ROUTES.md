# Rotas da API

## Users

-   GET
    -   /users
    -   /users/:id
-   POST
    -   /users
        -   name
        -   email
        -   birthday
        -   state
        -   city
        -   password
    -   /users/login
        -   email
        -   password
-   PUT
    -   /users
    -   /users/:id/instruments - :id do usuário
        -   instruments[id] - id de cada instrumento a ser atribuído ao usuário
-   DELETE
    -   /users/:id

## Teachers

-   GET
    -   /teachers
    -   /teachers/:id

## Instruments

-   GET
    -   /instruments
    -   /instruments/:id
    -   /instruments/:id/teachers - busca professores associados com o instrumento de :id

## Avaliabilities

-   GET
    -   /avaliabilities
    -   /avaliabilities/:id
-   POST
    -   /avaliabilities
        -   date - formato: 2019-09-26 14:00:00
        -   teacherId - inteiro
    -   /avaliabilities/available - busca horários que não estão agendados e acima da data de hoje
        -   id e/ou teacherId
-   PUT
    -   /avaliabilities/:id
        -   date
        -   teacherId
        -   busy - 0 / livre - 1 / ocupado - **A função de agendamento no ScheduleController já seta busy como 1 ao marcar uma aula.**
-   DELETE
    -   /avaliabilities/:id

## Schedules

-   GET
    -   /schedules
    -   /schedules/:id
-   POST
    -   /schedules
        -   avaliabilityId
        -   userId
-   PUT
    -   /schedules/:id
        -   avaliabilityId
        -   userId
-   DELETE
    -   /schedules/:id

## Reviews

-   GET
    -   /reviews
    -   /reviews/:id
    -   /reviews/:id/getTeacher - busca todas as avaliações do professor de :id
-   POST
    -   /reviews
        -   scheduleId
        -   rating - inteiro de 1 a 5
        -   comment - text
-   PUT
    -   /reviews/:id
        -   scheduleId
        -   rating - inteiro de 1 a 5
        -   comment - text
-   DELETE
    -   /reviews/:id

## Payments

-   GET
    -   /payments
    -   /payments/:id
-   POST
    -   /payments
        -   paidAt - formato: 2019-09-26 14:00:00
        -   scheduleId - inteiro
        -   typeDocument - "rg", "cpf"
        -   numberDocument - text
        -   country - text "br"
        -   state - text "RN"
        -   city - text
        -   bairro - text
        -   street - text
        -   number - text
        -   zipcode - text
