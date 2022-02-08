require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(process.env.PORT, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
