self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
      return;
    }
    const { sender } = event.data.json(),
    options = {
      body: `Olá, passei para dar um alo!`,
    },
    title =  `${sender} quer dizer algo!`;

    event.waitUntil(self.registration.showNotification(title, options));    
})