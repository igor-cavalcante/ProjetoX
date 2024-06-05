const Task = require("../models/task");
const Subscription = require("../models/subscription");
const webPush = require("web-push");
const cron = require("node-cron");

// Chaves VAPID
const vapidKeys = {
  publicKey:
    "BPYmev-w_tDHqqG7XH_Cjk3CCGZCvgcH2qva7hlv2PhSsrq92Eyx-Zk3VSDg5tNddrGumlgFz_xaSyzZ-DbVoPA",
  privateKey: "r82BtVpyK7p0gTeQIK6M4cyfNNbnSWO_Z1wq-qsb-pg",
};

webPush.setVapidDetails(
  "mailto:igorcavalcantealbuquerque@gmail.com.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const sendNotification = (subscription, dataToSend) => {
  webPush.sendNotification(subscription, dataToSend).catch((error) => {
    console.error("Erro ao enviar notificação:", error);
  });
};

const checkAndSendNotifications = () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  Task.find({
    notifications: true,
    notified: false,
    date: { $lte: now },
    time: { $lte: currentTime },
  })
    .then((tasks) => {
      tasks.forEach((task) => {
        Subscription.find({ userId: task.userId })
          .then((subscriptions) => {
            subscriptions.forEach(({ subscription }) => {
              sendNotification(
                subscription,
                JSON.stringify({
                  title: "Lembrete de Tarefa",
                  body: `Sua tarefa "${task.task}" está agendada para agora.`,
                })
              );
            });

            // Marcar a tarefa como notificada
            task.notified = true;
            task.save();
          })
          .catch((error) => {
            console.error("Erro ao buscar assinaturas:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar tarefas:", error);
    });
};

// Outros controladores aqui, como getALLTask, createTask, etc.

module.exports = {
  checkAndSendNotifications,
  // Exporte também os outros controladores aqui
};
