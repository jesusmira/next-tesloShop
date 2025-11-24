# Descripción



## Correr en dev


1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Primsa ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Limpiar el local storage del navegador
8. Correr el proyecto ```npm run dev```




## Correr en prod



## Tips
- Por si tienes problemas con las siguientes reglas de tailwindcss en vscode
<pre>
    Unknown at rule @plugin css(unknownAtRules)
    Unknown at rule @custom-variant css(unknownAtRules)
    Unknown at rule @theme css(unknownAtRules)
    Unknown at rule @utility css(unknownAtRules)
    Unknown at rule @variant css(unknownAtRules)
    Unknown at rule @apply css(unknownAtRules)
    Unknown at rule @source css(unknownAtRules)
    Unknown at rule @reference css(unknownAtRules)
</pre>


- Instalar la extensión de VSCode [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

- Agregar la siguiente configuración a ```.vscode/settings.json```
<pre>
    "files.associations": {
        "*.css": "tailwindcss",
        "*.scss": "tailwindcss",
    },
</pre>