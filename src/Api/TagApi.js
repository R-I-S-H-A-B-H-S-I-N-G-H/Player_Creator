import axios from "axios";

const BASE_URL = "https://playerworkerservice.onrender.com";

export async function getTagByShortId(_shortId) {
	try {
		const resp = await axios.get(BASE_URL + "/tag/" + _shortId);
		const jsonResp = await resp.data;
		return jsonResp;
	} catch (error) {
		console.error(error);
		return;
	}
}

export async function createTag(props) {
	const { _id, playerConfig } = props;
	const payLoad = {
		id: _id,
		config: playerConfig,
	};
	try {
		const resp = await axios.post(BASE_URL + "/tag", payLoad);
		const jsonResp = await resp.data;
		return jsonResp;
	} catch (error) {
		console.error(error);
		return;
	}
}
