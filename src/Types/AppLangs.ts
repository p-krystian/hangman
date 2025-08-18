import * as z from 'zod/mini';
import langs from '@/Assets/Langs';

const AppLangsSchema = z.literal([...Object.keys(langs)]);

type AppLangsT = keyof typeof langs;

export { AppLangsSchema, type AppLangsT };
