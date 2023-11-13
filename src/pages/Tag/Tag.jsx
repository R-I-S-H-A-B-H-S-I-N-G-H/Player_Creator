import { useEffect } from "react";
import style from "./Tag.module.css";
import DefaultTagConfig from "./DefaultTagConfig";
import { signal } from "@preact/signals-react";
import { createTag, getTagByShortId } from "../../Api/TagApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const tag = signal({ playerConfig: DefaultTagConfig });
const isOutStream = signal(true);
function Tag() {
	const navigate = useNavigate();

	const { shortId } = useParams();
	const { adSetting, mainVideoSetting } = tag.value.playerConfig.playerConfig;

	useEffect(() => {
		if (shortId)
			getTagByShortId(shortId).then((res) => {
				if (!res) {
					goToTagCreate();
					return;
				}
				tag.value = { ...res };
			});
	}, []);

	function updatePreroll(key, val) {
		const newVal = tag.value;
		newVal.playerConfig.playerConfig.adSetting.preRoll =
			newVal.playerConfig.playerConfig.adSetting.preRoll || {};
		newVal.playerConfig.playerConfig.adSetting.preRoll[key] = val;
		tag.value = { ...newVal };
	}
	function updateMidroll(key, val) {
		const newVal = tag.value;
		newVal.playerConfig.playerConfig.adSetting.midRoll =
			newVal.playerConfig.playerConfig.adSetting.midRoll || {};
		newVal.playerConfig.playerConfig.adSetting.midRoll[key] = val;
		tag.value = { ...newVal };
	}
	function updatePostroll(key, val) {
		const newVal = tag.value;
		newVal.playerConfig.playerConfig.adSetting.postRoll =
			newVal.playerConfig.playerConfig.adSetting.postRoll || {};
		newVal.playerConfig.playerConfig.adSetting.postRoll[key] = val;
		tag.value = { ...newVal };
	}
	function updateBaseVideo(key, val) {
		const newVal = tag.value;
		newVal.playerConfig.playerConfig.mainVideoSetting =
			newVal.playerConfig.playerConfig.mainVideoSetting || {};
		newVal.playerConfig.playerConfig.mainVideoSetting[key] = val;
		tag.value = { ...newVal };
	}

	async function _createTag(tagPayload) {
		const tagRes = await createTag(tagPayload);
		if (tagRes) tag.value = { ...tagRes };
		console.log("TAG :: ", tagRes);
	}

	function goToPreview() {
		navigate(`/tag/preview/${shortId}`);
	}
	function goToTagCreate() {
		navigate(`/tag/create`);
	}

	return (
		<>
			<button onClick={() => (isOutStream.value = !isOutStream.value)}>
				CHANGE TO {isOutStream ? "INSTREAM" : "OUTSTREAM"}
			</button>
			<div className={style.rollContainer}>
				{!isOutStream.value && (
					<input
						value={mainVideoSetting?.url || ""}
						onChange={(e) => updateBaseVideo("url", e.target.value)}
						placeholder="BASE VIDEO URL"
					></input>
				)}
				<input
					value={adSetting?.preRoll?.url || ""}
					placeholder="PREROLL URL"
					onChange={(e) => updatePreroll("url", e.target.value)}
				></input>
				{!isOutStream.value && (
					<input
						value={adSetting?.midRoll?.url || ""}
						onChange={(e) => updateMidroll("url", e.target.value)}
						placeholder="MID ROLL URL"
					></input>
				)}
				{!isOutStream.value && (
					<input
						value={adSetting?.postRoll?.url || ""}
						onChange={(e) => updatePostroll("url", e.target.value)}
						placeholder="POST ROLL URL"
					></input>
				)}

				<button onClick={() => _createTag(tag.value)}>CREATE TAG</button>
			</div>

			{tag.value._id && <button onClick={goToPreview}>GO TO PREVIEW</button>}
		</>
	);
}

export default Tag;
