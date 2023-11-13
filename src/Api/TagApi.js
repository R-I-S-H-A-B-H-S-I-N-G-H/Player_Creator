import axios from "axios";
import { mapToQueryParams } from "../../utils/utils";

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

export async function getTagList(queryMap = {}) {
	try {
		const resp = await axios.get(
			BASE_URL + "/tag/list" + "?" + mapToQueryParams(queryMap),
		);
		const jsonResp = await resp.data;
		return jsonResp;
	} catch (error) {
		console.error(error);
		return;
	}
}

export async function createTag(props) {
	const { _id, playerConfig } = { ...props };
	delete props._id;
	delete props.playerConfig;
	const payLoad = {
		...props,
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
