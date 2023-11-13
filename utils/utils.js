export function insertExtension(filename, extension) {
	if (typeof filename !== "string" || filename.endsWith(extension))
		return filename;
	return filename + extension;
}

export function getUrlParamVal(_url, key) {
	const url = new URL(_url);
	return url.searchParams.get(key);
}

export function getCurUrl() {
	return window.location.href;
}

export function mapToQueryParams(params) {
	return Object.keys(params)
		.map(
			(key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
		)
		.join("&");
}
