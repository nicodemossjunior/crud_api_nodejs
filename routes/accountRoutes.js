import express from 'express';
import { accountModel } from '../models/accountModel.js';

const app = express();

// CREATE
app.post('/account', async (req, res) => {
  try {
    const account = new accountModel(req.body);

    await account.save();

    res.send(account);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// RETRIEVE
app.get('/account', async (req, res) => {
  try {
    const accounts = await accountModel.find({});
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE
app.patch('/account/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    // quando não precisa retornar o documento após a atualização
    // accountModel.findByIdAndUpdate({_id: id}, req.body);

    // passando o parâmetro 'new: true' é retornado o documento atualizado
    const account = await accountModel.findByIdAndUpdate(
      { _id: id }, 
      req.body, 
      { new: true }
    );

    res.send(account);

  } catch (error) {
    res.status(500).send({"error": error.message});
  }
});

app.delete('/account/:id', async (req,res) => {
  try {
    const id = req.params.id;

    const account = await accountModel.findByIdAndDelete({_id: id});

    // Não funciona
    if (!account) {
      res.status(404).send('Documento não encontrado na coleção')
    }

    res.send();

  } catch (error) {
    res.status(500).send({"error": error.message});
  }
});

app.patch('/account-deposit', async (req,res) => {
  try {
    const data = req.body;

    const finded = await accountModel.findOne(
      {
        agencia: parseInt(data.agencia),
        conta: parseInt(data.conta)
      });

    if (!finded) {
      res.status(404).send('Conta não localizada');
    }
    
    const newBalance = finded.balance + parseFloat(data.deposit);
    
    const account = await accountModel.findByIdAndUpdate(
      { _id: finded.id }, 
      { balance: newBalance}, 
      { new: true }
    );
    
    res.send({"balance": account.balance});

  } catch (error) {
    res.status(500).send({"error": error.message});
  }
});

app.patch('/account-withdraw', async (req,res) => {
  try {
    const data = req.body;
    
    const finded = await accountModel.findOne(
      {
        agencia: parseInt(data.agencia),
        conta: parseInt(data.conta)
      });

    if (!finded) {
      throw new Error({'status': 404, 'message': 'Conta não localizada'});
    }
    
    const newBalance = finded.balance - parseFloat(data.saque) - 1;
    
    if (newBalance < 0) {
      throw new Error({'status': 404, 'message': 'Saldo insuficiente'});
    }
    
    const account = await accountModel.findByIdAndUpdate(
      { _id: finded.id }, 
      { balance: newBalance}, 
      { new: true }
    );
    
    res.send({"balance": account.balance});

  } catch (error) {
    console.log(error);
    res.status(error.status).send({"error": error.message});
  }
});

export { app as accountRouter };