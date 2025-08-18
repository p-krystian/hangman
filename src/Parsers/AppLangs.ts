import * as z from 'zod/mini';
import { availableLangs } from '@/Assets/Langs';

const AppLangsSchema = z.literal(availableLangs);

type AppLangsT = z.infer<typeof AppLangsSchema>;

const parseAppLangs = AppLangsSchema.parse;

export { parseAppLangs, type AppLangsT };
