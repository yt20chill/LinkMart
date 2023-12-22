import { z } from "zod";
import { ulid } from "../../lib/schemaUtils";

export { postProviderDtoSchema };
export type { ApplyProviderDto };

const postProviderDtoSchema = z.object({
	providerId: ulid,
});

type ApplyProviderDto = z.infer<typeof postProviderDtoSchema>;
