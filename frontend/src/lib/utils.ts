import { clsx, type ClassValue } from "clsx";
import crypto from "crypto-js";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";
const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

import { StoreApi, UseBoundStore } from "zustand";

export {
	camelToTitleCase,
	cn,
	createSelectors,
	imageHoverEnd,
	imageHoverView,
	isObjOfType,
	isShallowEqual,
	mapIconUrl,
	textToTitleCase,
	toDataURLAsync,
};

export type WithSelectors<S> = S extends { getState: () => infer T }
	? S & { use: { [K in keyof T]: () => T[K] } }
	: never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
	_store: S
) => {
	const store = _store as WithSelectors<typeof _store>;
	store.use = {};
	for (const k of Object.keys(store.getState())) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
		(store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
	}

	return store;
};

const camelToTitleCase = (input: string): string => {
	return (
		input.charAt(0).toUpperCase() +
		input.slice(1).replace(/[A-Z]/g, (char) => " " + char)
	);
};

const textToTitleCase = (input: string): string => {
	return input
		.split(" ")
		.map((e) => {
			return e[0].toUpperCase() + e.substring(1);
		})
		.join(" ");
};

const toDataURLAsync = (file: File): Promise<string> => {
	if (!file.type.startsWith("image/")) throw new Error("Not an image");
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (err) => reject(err);
		reader.readAsDataURL(file);
	});
};

const isObjOfType = <T>(obj: unknown, key: keyof T): obj is T =>
	!!obj && !!(obj as T)[key];

const isShallowEqual = <T>(arg1: T, arg2: T): boolean => {
	if (arg1 === arg2) return true;
	return JSON.stringify(arg1) === JSON.stringify(arg2);
};

const imageHoverView: MouseEventHandler = (e) => {
	const img = e.target as HTMLElement;
	img.style.transform = "scale(4)";
	img.parentElement!.scrollLeft -= e.movementX * 6;
	img.parentElement!.scrollTop -= e.movementY * 6;
};

const imageHoverEnd: MouseEventHandler = (e) => {
	const img = e.target as HTMLElement;
	img.style.transform = "scale(1)";
};

export type IconType =
	| "mp"
	| "id"
	| "monsterrid"
	| "wavatat"
	| "retro"
	| "robohash"
	| "blank";

const mapIconUrl = (username: string, type?: IconType) => {
	const hashData = crypto.SHA256(`${username}@LinkMart.com`);
	return `https://gravatar.com/avatar/${crypto.enc.Base64.stringify(
		hashData
	)}?d=${type ?? "retro"}&f=y`;
};

export const toggleElement = (e: React.MouseEvent<HTMLElement>) => {
	(e.currentTarget as HTMLElement).classList.toggle("active");
};
