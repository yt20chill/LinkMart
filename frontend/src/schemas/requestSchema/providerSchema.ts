import { z } from "zod";
import { requiredFile, requiredId } from "../../lib/schemaUtils";

export { applyProviderSchema };
export type { TApplyProviderForm };

type FileInputKeys = "addressDocument" | "idDocument" | "bankDocument";

const applyProviderSchema = z.object({
	locationId: requiredId,
	addressDocument: requiredFile,
	idDocument: requiredFile,
	bankDocument: requiredFile,
});

type TApplyProviderForm = Omit<
	Record<keyof z.infer<typeof applyProviderSchema>, string>,
	FileInputKeys
> & {
	[Key in FileInputKeys]: File | null;
};
