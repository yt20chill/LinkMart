import { z } from "zod";
import { requiredFile, requiredId } from "../../lib/schemaUtils";

export { applyProviderSchema, editProviderProfileSchema };
export type { EditProviderProfileForm, TApplyProviderForm };

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

const editProviderProfileSchema = z.object({
	biography: z.string().min(1).max(500).nullish(),
});

type EditProviderProfileForm = z.infer<typeof editProviderProfileSchema>;
