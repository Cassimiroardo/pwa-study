self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
      return;
    }
    // const { sender, recipient } = event.data.json(),
    options = {
        // body: `Olá ${recipient}, estou feliz em te mandar mensagem!`,
        body: `Olá, estou feliz em te mandar mensagem!`,
      },
    // title =  `${sender} quer dizer algo!`;
    title =  `nós queremos dizer algo!`;

    event.waitUntil(self.registration.showNotification(title, options));    
})