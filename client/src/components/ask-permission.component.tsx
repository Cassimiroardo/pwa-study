import React from 'react';
import { saveUserSubscription } from '../service/api';

import '../styles/ask-permission.css'
import { urlBase64ToUint8Array } from '../util';

const AskPermissionComponent: React.FC = () => {
  const askPermission = async () => {
    if (!('PushManager' in window)) return;

    const permissionResult = await Notification.requestPermission();
    if (permissionResult !== 'granted') return;
    
    
    const registration = await navigator.serviceWorker.ready;
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(''),
    });
    
    await saveUserSubscription(String(localStorage.getItem('user')),subscription)

    window.location.reload()
  }

  return (
            <span className="permission-container">
              <p className="permission-text">
                O site precisa de sua permissão para enviar notificações para você
              </p>
              <button className="permission-button" onClick={async () => await askPermission()}>clique aqui</button>
            </span>
          );
}

export default AskPermissionComponent;