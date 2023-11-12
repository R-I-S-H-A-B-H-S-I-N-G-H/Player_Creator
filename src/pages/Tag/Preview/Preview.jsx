import React, { useEffect, useRef } from "react";
import { getShortId } from "../../../../utils/shortidUtil";
import { getUrlParamVal } from "../../../../utils/utils";
import { getTagByShortId } from "../../../../utils/tagUtil";

function Preview(props) {
	function playTag() {
		const tagShortId = getUrlParamVal(window.location.href, "tagId");
		const tagUrl = getTagByShortId(tagShortId);

		const scrptTag = document.createElement("script");
		scrptTag.src = tagUrl;
		document.body.appendChild(scrptTag);
	}

	useEffect(() => {
		// playTag();
		loadScriptInIframe();
		setInterval(() => {
			const iframe = document.getElementById("myIframe");
			const height = iframe.contentDocument.body.scrollHeight;
			const width = iframe.contentDocument.body.scrollWidth;
			iframe.width = width;
			iframe.height = height;
		}, 1000);
	}, []);

	function loadScriptInIframe() {
		const tagShortId = getUrlParamVal(window.location.href, "tagId");
		const tagUrl = getTagByShortId(tagShortId);

		// Get the iframe element
		var iframe = document.getElementById("myIframe");

		// Check if the iframe is loaded
		if (iframe.contentDocument) {
			// Create a script element
			var script = iframe.contentDocument.createElement("script");

			// Set the source of the script
			script.src = tagUrl;

			// Append the script to the iframe's document
			iframe.contentDocument.body.appendChild(script);
		} else {
			console.error("Iframe not loaded.");
		}
	}

	function resizeIframe(obj) {
		obj.style.height =
			obj.contentWindow.document.documentElement.scrollHeight + "px";
	}

	return (
		<div
			style={{
				height: "3000px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<iframe id="myIframe" frameBorder="0" scrolling="no" />
		</div>
	);
}

export default Preview;
