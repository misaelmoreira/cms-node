[Estudos de API] Criando API-CMS

# Como iniciar aplicação
npm start

# Como validar o código
node node_modules/jshint/bin/jshint app/*/*.js spec/app/*/*.js

# usuario
npx sequelize-cli model:generate --name Usuario --attributes nome:string,email:string,login:string,senha:string

# rodar o migrate
npx sequelize-cli db:migrate