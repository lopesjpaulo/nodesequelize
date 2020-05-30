# Rotas da API

## Users

-   GET
    -   /users
    -   /users/:id
-   POST
    -   /users
        -   name
        -   lastname
        -   email
        -   birthday - "1965-01-01"
        -   state
        -   city
        -   password
        -   pathImage
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
-   POST
    -   /teachers
        -   name
        -   email
        -   birthday - "1965-01-01"
        -   phone - +5511999991111
        -   cep
        -   state
        -   city
        -   cpf - string
        -   about - text
        -   userId
        -   type - string
        -   meta - inteiro
        -   valueOne - decimal
        -   valueFive - decimal
        -   valueTen - decimal

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
    -   /reviews/:id/teachers - busca todas as avaliações do professor de :id
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
        -   scheduleId - inteiro
        -   card_id - string
        -   customer_name - string
        -   customer_country - string "br"
        -   email - string
        -   cpf - string
        -   phone - string - +5511999991111
        -   birthday - string - "1965-01-01"
        -   billing_name - string
        -   billing_country - text "br"
        -   state - text "RN"
        -   city - text
        -   bairro - text
        -   street - text
        -   number - text
        -   zipcode - text
    -   /payments/saveCard
        -   card_id - string
        -   digits - string
        -   expiration - string 
        -   brand - string
        -   userId - inteiro
    -   /payments/saveAccount
        -   bank - string
            agency - string
            agency_dig - string
            account - string
            digit - string
            legal_name - string
            cpf - string
    -   /payments/saveReceiver
        -   bank_account_id - string
    -   /payments/saveCustomer
        -   id - string
        -   name - string
        -   country - string - 'br'
        -   email - string
        -   cpf - string
        -   phone - string - +5511999991111
        -   birthday - string - "1965-01-01"

## Certifieds

-   GET
    -   /certifieds
    -   /certifieds/:id
    -   /certifieds/:id/teachers - busca todos os certificados do professor de :id
-   POST
    -   /certifieds
        -   title - string
        -   path - string
        -   teacherId - inteiro
-   PUT
    -   /certifieds/:id
        -   title
        -   path
        -   teacherId
-   DELETE
    -   /certifieds/:id

## Databanks

-   GET
    -   /databanks
    -   /databanks/:id
    -   /databanks/:id/teachers - busca todas as contas cadastradas do professor de :id
-   POST
    -   /databanks
        -   bank - string
        -   agency - string
        -   account - string
        -   digit - string
        -   teacherId - inteiro
-   PUT
    -   /databanks/:id
        -   bank - string
        -   agency - string
        -   account - string
        -   digit - string
        -   teacherId - inteiro
-   DELETE
    -   /databanks/:id

## Datausers

-   GET
    -   /datausers
    -   /datausers/:id
    -   /datausers/:id/users - busca todas as contas cadastradas do usuário de :id 
-   POST
    -   /datausers
        -   birthday - string - "1965-01-01"
        -   cpf - string
        -   phone - string - +5511999991111
        -   cep - string
        -   street - string
        -   number - string
        -   bairro - string
        -   city - string
        -   state - string    
        -   country - string    
        -   userId - inteiro    
        -   customer_id - string    
-   DELETE
    -   /databanks/:id
