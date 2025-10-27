import dotenv from 'dotenv';
import * as z from 'zod/mini';

dotenv.config({
  quiet: true,
  path: [
    '.env.production',
    '.env.production.local',
    '.env.development',
    '.env.development.local',
    '.env.local',
    '.env'
  ]
});

const envSchema = z.object({
  VITE_SOCKET_URL: z.url(),
  VITE_SOCKET_PATH: z.string().check(z.startsWith('/')),
  VITE_EXIT_URL: z.url(),
  VITE_DATA_URL: z.url(),
  VITE_AUTHOR_URL: z.url(),
  VITE_STORAGE_PREFIX: z.string()
});

function verify() {
  const res = envSchema.safeParse(process.env);

  if (!res.success) {
    const issue = res.error.issues[0];
    return `${issue.path[0]}: ${issue.message}`;
  }
  return null;
}

export default verify;
