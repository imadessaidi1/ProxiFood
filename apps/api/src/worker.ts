console.log('ProxiFood worker started: BullMQ dispatch + webhooks processor');
setInterval(() => {
  console.log('[worker] polling queues...');
}, 5000);
