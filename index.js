//possibilita a incialização e configuração de rotas de forma mais fácil
//https://expressjs.com/pt-br/api.html
const express = require('express');
//biblioteca nativa do Node, serve para facilitar a indicação de caminho dentro da aplicação...
const path = require('path');

//o que possibilita passar as informações do formulário...
//https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');

//https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');
const app = express();

//conectando ao banco e criando o model que será salvo no banco...
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', {nome: String, sobrenome: String});

//definindo o template, ejs é uma forma de se ter um HTML dentro de um JS de certa forma
//pode pegar mais infos aqui https://github.com/tj/ejs
app.set('view engine', 'ejs');

//define o caminho de onde estarão as views, telas a serem renderizadas para exibição
app.set('views', path.join(__dirname, '/'));

//permite que o express use o body-parser para pegar as informações de requisição através de json
app.use(bodyParser.urlencoded());

//rota raiz que renderiza tela de formulário
app.get('/', (req, res) => {
    res.render('index');
});

//rota para onde o formulário irá encaminhar as informações
app.post('/save', (req, res) => {
    const saveUser = new User({nome: req.body.nome, sobrenome: req.body.sobrenome});
    saveUser.save().then(() => console.log('salvo com sucesso')).catch(err => console.log(err));
    res.send('salvo com sucesso!');
});

//rota para consulta das informações
app.get('/all', async (req, res) => {
    const allUsers = await User.find({});
    res.render('information', {users: allUsers});
});

app.listen(3000, () => {
    console.log('Rodando!');
});