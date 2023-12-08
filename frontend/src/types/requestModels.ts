import { z } from "zod";
import { requestSchema } from "../features/forms/schema/requestSchema";

export type RequestDto = z.infer<typeof requestSchema>;
export type RequestForm = Record<keyof RequestDto, string | File[] | null>;
