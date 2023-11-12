import ShortUniqueId from "short-unique-id";

export function getShortId() {
	const uid = new ShortUniqueId({ length: 10 });
	return uid.rnd();
}
