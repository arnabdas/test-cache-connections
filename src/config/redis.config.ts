import Redis, { Cluster } from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_NAMESPACE, REDIS_CLUSTER_HOST, REDIS_CLUSTER_PORT } = process.env;

const redis = REDIS_CLUSTER_HOST
  ? new Cluster(
      [
        {
          host: REDIS_CLUSTER_HOST,
          port: REDIS_CLUSTER_PORT ? parseInt(REDIS_CLUSTER_PORT, 10) : 6379,
        },
      ],
      {
        slotsRefreshTimeout: 2000,
        redisOptions: {
          tls: {
            rejectUnauthorized: false,
          },
          keyPrefix: REDIS_NAMESPACE || 'coderuse-',
        },
      },
    )
  : new Redis({
      host: REDIS_HOST || '127.0.0.1',
      port: REDIS_PORT ? parseInt(REDIS_PORT, 10) : 6379,
      keyPrefix: REDIS_NAMESPACE || 'coderuse-',
    });

export default redis;
