import React from "react";
import {
	FormFieldContextValue,
	FormItemContextValue,
} from "../../types/formModels";

export const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
);

export const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
);
