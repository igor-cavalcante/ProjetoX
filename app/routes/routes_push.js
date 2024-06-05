const express = require('express');
const routes_push = express.Router();
const TaskController = require('../controller/push');
const Subscription = require('../models/subscription');

// Outras rotas
routes_push.post('/subscribe', async (req, res) => {
    const subscription = req.body;
    const userId = req.user._id;
  
    try {
      let existingSubscription = await Subscription.findOne({ userId });
  
      if (!existingSubscription) {
        await Subscription.create({ userId, subscription });
        res.status(201).json({ message: 'Subscription created successfully.' });
      } else {
        existingSubscription.subscription = subscription;
        await existingSubscription.save();
        res.status(200).json({ message: 'Subscription updated successfully.' });
      }
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
      res.status(500).json({ message: 'Erro ao salvar assinatura' });
    }
  });

module.exports = routes_push;
