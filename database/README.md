# Documentação do Banco de Dados

Este diretório contém os arquivos necessários para gerenciar o banco de dados da aplicação de saúde. Abaixo está uma breve visão geral do conteúdo:

## Migrações

    migrations/createUsersTable.js: Este arquivo contém o script de migração para criar a tabela de usuários no banco de dados. Ele define o esquema para dados de usuários, incluindo campos para condições de saúde, idade, nome e e-mail.

## Seeders

    seeders/seedUsers.js: Este arquivo contém o script seeder para preencher a tabela de usuários com dados iniciais. Ele ajuda na configuração do banco de dados com registros de usuários de exemplo para fins de teste.

## Configuração

    config.js: Este arquivo exporta as configurações do banco de dados, incluindo detalhes de conexão e quaisquer outras configurações relevantes necessárias para operações do banco de dados.

## Uso

Para executar migrações e preencher o banco de dados, certifique-se de que você tenha a configuração necessária do banco de dados e execute os respectivos scripts de acordo com as diretrizes do seu sistema de gerenciamento de banco de dados.

Esta documentação ajudará você a entender a estrutura e o propósito dos arquivos relacionados ao banco de dados neste projeto.
