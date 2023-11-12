import axios from "axios";

const SHORT_URL_BASE = "https://shorturl-332f.onrender.com";

export async function generateShortUrl(_redirectUrl) {
	console.log(_redirectUrl);
	const postBody = {
		redirectURL: _redirectUrl,
	};
	const resp = await axios.post(SHORT_URL_BASE, postBody);
	return SHORT_URL_BASE + "/" + resp?.data?.url?.shortId;
}
