import { useRef } from "react";
import { createTagURL } from "../../../utils/tagUtil";
import style from "./Tag.module.css";
import { signal } from "@preact/signals-react";
import DefaultTagConfig from "./DefaultTagConfig";

const tagUrl = signal("");
const isOutStream = signal(true);

function Tag() {
	const tagConfig = useRef(DefaultTagConfig);
	async function generateTagUrl(_tagProps) {
		const _tagUrlResp = await createTagURL(_tagProps);
		tagUrl.value = _tagUrlResp;
	}

	function updateMainVideoSetting(key, val) {
		tagConfig.current.playerConfig.mainVideoSetting = {
			...tagConfig.current.playerConfig.mainVideoSetting,
			[key]: val,
		};
		console.log(tagConfig.current);
	}

	function updatePreRoll(key, val) {
		if (isOutStream.value) {
			delete tagConfig.current.playerConfig.mainVideoSetting;
		}
		tagConfig.current.playerConfig.adSetting.preRoll = {
			...tagConfig.current.playerConfig.adSetting.preRoll,
			[key]: val,
		};
		console.log(tagConfig.current);
	}
	function updateMidRoll(key, val) {
		tagConfig.current.playerConfig.adSetting.preRoll = {
			...tagConfig.current.playerConfig.adSetting.preRoll,
			[key]: val,
		};
		console.log(tagConfig.current);
	}
	function updatePostRoll(key, val) {
		tagConfig.current.playerConfig.adSetting.preRoll = {
			...tagConfig.current.playerConfig.adSetting.preRoll,
			[key]: val,
		};
		console.log(tagConfig.current);
	}

	return (
		<div className={style.container}>
			<div>
				<button
					className={style.outstreamBtn}
					onClick={() => (isOutStream.value = !isOutStream.value)}
				>
					CHANGE TO {isOutStream.value ? "INSTREAM" : "OUTSTREAM"}
				</button>
			</div>

			{!isOutStream.value && (
				<div>
					<div>MAIN VIDEO SETTINGS</div>
					<label>URL</label>
					<input
						onInput={(e) => updateMainVideoSetting("url", e.target.value)}
					></input>
				</div>
			)}

			<div>
				<div>AD VIDEO SETTINGS</div>
				<label>PREROLL-URL</label>
				<input onInput={(e) => updatePreRoll("url", e.target.value)}></input>
				{!isOutStream.value && (
					<>
						<label>MIDROLL-URL</label>
						<input
							onInput={(e) => updateMidRoll("url", e.target.value)}
						></input>
						<label>POSTROLL-URL</label>
						<input
							onInput={(e) => updatePostRoll("url", e.target.value)}
						></input>
					</>
				)}
			</div>

			<button onClick={() => generateTagUrl(tagConfig.current)}>
				GENERATE TAG URL
			</button>
			<a href={tagUrl.value} target="_blank" rel="noreferrer">
				{tagUrl.value}
			</a>
		</div>
	);
}

export default Tag;
