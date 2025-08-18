import * as z from 'zod/mini';

const VolumeSchema = z.literal([0, 1, 2, 3]);

type VolumeT = z.infer<typeof VolumeSchema>;

export { VolumeSchema, type VolumeT };
