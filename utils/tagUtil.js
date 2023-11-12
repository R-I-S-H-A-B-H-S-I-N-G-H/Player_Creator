import { minify } from "terser";
import { upload } from "../src/Api/BucketRest";
import { insertExtension } from "./utils";
import { getShortId } from "./shortidUtil";

const S3BASEURL =
	"https://s3.us-east-005.backblazeb2.com/testb23/[TAG_SHORT_ID]/tag.js";
const TAG_SHORT_ID_MACRO = "[TAG_SHORT_ID]";

export async function generateTag(props) {
	const tagData = `(
        function TagData() {
        const Selector = "${props?.selector || ""}";
        const scriptTag = document.createElement("script");
        scriptTag.onload = loadPlayer;
        scriptTag.src = "${props.playerBuildUrl}/main.js";
        const adSlot = document.createElement("div");
        adSlot.id = "ADSLOT-" + Date.now();
        adSlot.className = "Adslot";
        if (!Selector || Selector === "") {
            document.body.appendChild(adSlot);
        } else {
            document.querySelectorAll(Selector)[0].parentNode.appendChild(adSlot);
        }

        adSlot.appendChild(scriptTag);
        function loadPlayer(params) {
            window.PLAYER_INFO.init(${JSON.stringify({
							...props.playerConfig,
						})}, adSlot.id, );
        }
})();`;
	const tagDataUglified = await minify(tagData, { module: true });
	return tagDataUglified.code;
}

export async function createTagURL(tagProps, _tagName = "tag.js") {
	const tagName = getShortId() + "/" + insertExtension(_tagName, ".js");
	const tagData = await generateTag(tagProps);
	const tagResp = await upload({
		fileBody: tagData,
		fileName: tagName,
	});

	return tagResp?.url;
}

export function getTagByShortId(_shortId) {
	return S3BASEURL.replace(TAG_SHORT_ID_MACRO, _shortId);
}
