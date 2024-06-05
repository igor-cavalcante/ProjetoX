if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker Registered', registration);
  
        return registration.pushManager.getSubscription()
          .then(function(subscription) {
            if (subscription) {
              return subscription;
            }
  
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array('BPYmev-w_tDHqqG7XH_Cjk3CCGZCvgcH2qva7hlv2PhSsrq92Eyx-Zk3VSDg5tNddrGumlgFz_xaSyzZ-DbVoPA')
            });
          });
      })
      .then(function(subscription) {
        console.log('User is subscribed:', subscription);
  
        // Envie a assinatura para o servidor
        fetch('/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
  }
  
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }