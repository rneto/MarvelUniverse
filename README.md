# About Marvel Universe

This is a multi project solution for exploring .NET Core 3.1 API, SQL Server, Angular 10, Angular Material and Marvel Comics REST API.

## AuthApi

AuthApi is the authentication and user management API based on .NET Core 3.1 API, Entity Framework and SQL Server.

## WebSpa

WebSpa is the user presentation layer based on Angular 10, Angular Material, Marvel Comics REST API and AuthApi.

## Usage

### Create SQL Server database

First you need to create the database for the AuthApi project.

``` sql
CREATE DATABASE MarvelConsole

GO

USE MarvelConsole

GO

CREATE TABLE Users
  (
     [Id] [uniqueidentifier] DEFAULT NEWID(),
     [Name] [nvarchar](100) NOT NULL,
     [Surname] [nvarchar](100) NOT NULL,
     [Email] [nvarchar](100) NOT NULL UNIQUE,
     [Password] [nvarchar](100) NOT NULL,
     [CreationDate] [datetimeoffset](7) DEFAULT GETUTCDATE(),
     [DeleteDate] [datetimeoffset](7),
     PRIMARY KEY (Id)
  )

GO
```

### Start AuthApi

1. Open _MarvelUniverse\src\AuthApi\AuthApi.sln_.
1. Open _appsettings.json_ file and review _ConnectionStrings > MarvelConsoleDatabase_ section with your created database info.
1. _Start_.

### Start WebSpa

1. Open _MarvelUniverse\src\WebSpa_.
1. Open _src/environments_ files and review _marvelApi > KEY_ section with your API key info.
   - **IMPORTANT!!** Be sure to add _localhost_ to your authorized referrers in Marvel Commics API account.
1. ```npm install```
1. ```npm start```