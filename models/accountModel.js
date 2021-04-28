import mongoose from 'mongoose'

// Criação do modelo
const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  },
});

// Se fosse o caso de validar o 'balance'. colocaria abaixo de 'min'
// validate(balance) {
//   if (balance < 0) {
//     throw new Error('Não é permitido inserir balance negativo');
//   }
// }

// Definindo o modelo da coleção
const accountModel = mongoose.model('account', accountSchema, 'accounts');

export {accountModel};
