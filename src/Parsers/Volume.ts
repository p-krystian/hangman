import * as z from 'zod/mini';

const VolumeSchema = z.literal([0, 1, 2, 3]);

type VolumeT = z.infer<typeof VolumeSchema>;

const parseVolume = VolumeSchema.parse;

export { parseVolume, type VolumeT };
