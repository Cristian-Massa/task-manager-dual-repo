# Proyecto de prueba tecnica para Coally

<p align="center">
  <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGT6RAYLDTltg/company-logo_200_200/company-logo_200_200/0/1666032192176/coally_logo?e=2147483647&v=beta&t=wLCQGyYZx-WJUwyTzS394WOKP2AGsLlKMHuQgrPtesM" alt="Coally logo">
</p>

# Variables de entorno

Para correr este proyecto necesitaras varias variables de entorno para el backend y frontend

## Backend

`PORT` = Tu puerto (opcional ya viene configurado por defecto)

`DATABASE_URL` = La url de la base de datos de tu mongoDB deberia ser algo asi: mongodb://localhost:27017/prueba-tecnica

`FRONTEND_URL` = La url de tu frontend al levantar el proyecto tendras la url

`JSON_WEB_TOKEN_SECRET` = Clave secreta para el token de jwt puedes usar cualquiera

`NODE_ENV` = viene por defecto en production es importante que lo cambies a development

## Frontend

`VITE_BACKEND_ENDPOINT`= Debes usar el url de tu backend deberia ser http://localhost:3000 si no lo has cambiado

# Instalación

El proyecto globalmente usa npm para su instalación

haz click derecho en la carpeta que contiene cada parte del proyecto (server y web) y abre la consola para escribir lo siguiente

## Server

```bash
  npm install
```

## Client

```bash
  npm install
```

# Optimizaciones

El backend desplegado en render esta en su prueba gratuita asi que implemente renderización optimista al apretar Task done, para que no sea tan tosca de usar la aplicación.

## Tech Stack

**General:** Typescript

**Client:** React, Context api, TailwindCSS

**Server:** Node, Express, Express-validator, Swagger

# Documentación

Abre tu proyecto en local y usa esta url:

http://localhost:3000/api-docs/ <- puedes cambiar el puerto por el que seleccionaste

https://task-manager-dual-repo-3.onrender.com/api-docs/ <- o usa este pero es muy lento por render

## 🔗 Enlaces

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://kris-dev-five.vercel.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kris19920)
