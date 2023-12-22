import { z } from "zod";
import { requiredFile, requiredId } from "../../lib/schemaUtils";

export { applyProviderSchema };
export type { TApplyProviderForm };

type FileInputKeys = "addressDoc" | "identityDoc" | "bankDoc";

const applyProviderSchema = z.object({
	locationId: requiredId,
	addressDoc: requiredFile,
	identityDoc: requiredFile,
	bankDoc: requiredFile,
});

type TApplyProviderForm = Omit<
	Record<keyof z.infer<typeof applyProviderSchema>, string>,
	FileInputKeys
> & {
	[Key in FileInputKeys]: File | null;
};
