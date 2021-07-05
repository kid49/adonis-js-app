import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: "docs", // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: "/swagger.json",

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Open API Bootcamp Adonis",
        version: "1.0.0",
        description: "Rest Full API dibuat menggunakan Adonis",
      },
      components: {
        securityScheme: {
          bearerAuth: {
            type: "http",
            schema: "bearer",
          },
        },
      },
    },

    apis: [
      "app/**/*.ts",
      "docs/swagger/**/*.yml",
      "start/routes.ts",
      "**/*.yml",
    ],
    basePath: "/api/v1/",
  },
  mode: process.env.NODE_ENV === "production" ? "PRODUCTION" : "RUNTIME",
  specFilePath: "docs/swagger.json",
} as SwaggerConfig;
