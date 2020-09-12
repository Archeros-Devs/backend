import app from './app';

import pacote from '../package.json';

const { NOME_SERVICO, PORT } = process.env;

app.listen(PORT, () => {
  console.info(
    `** ${NOME_SERVICO} v${pacote.version} executando na porta ${PORT} **`
  );
});
