import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function camelToTitleCase(input: string): string {
	return (
		input.charAt(0).toUpperCase() +
		input.slice(1).replace(/[A-Z]/g, (char) => " " + char)
	);
}
