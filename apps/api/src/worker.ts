import { Queue, Worker } from 'bullmq';

const redis = { connection: { host: process.env.REDIS_HOST || 'redis', port: Number(process.env.REDIS_PORT || 6379) } };

const dispatchQueue = new Queue('dispatch-offers', redis);

new Worker(
  'dispatch-offers',
  async (job) => {
    console.log('[worker] dispatch job', job.id, job.data);
    return { status: 'processed' };
  },
  redis,
);

async function bootstrap() {
  console.log('ProxiFood worker started: BullMQ dispatch + webhooks processor');
  await dispatchQueue.add('heartbeat', { ts: Date.now() }, { repeat: { every: 30_000 } });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
