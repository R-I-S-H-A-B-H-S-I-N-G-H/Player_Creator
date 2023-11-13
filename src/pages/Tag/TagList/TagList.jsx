import React, { useEffect } from "react";
import { getTagList } from "../../../Api/TagApi";
import { getUrlParamVal } from "../../../../utils/utils";
import { signal } from "@preact/signals-react";
import style from "./TagList.module.css";
import { useNavigate } from "react-router-dom";
import {
	getDateInCalendar,
	getDateRelativeToNow,
} from "../../../../utils/timeUtil";

const tagList = signal([]);
function TagList(props) {
	const navigate = useNavigate();
	const pageURL = window.location.href;
	const filterMap = {
		size: getUrlParamVal(pageURL, "size") || 10,
		page: getUrlParamVal(pageURL, "page") || 0,
	};
	useEffect(() => {
		getTagList(filterMap).then((res) => {
			tagList.value = res || [];
			console.log(tagList.value[0]);
		});
	}, []);

	function goToPreview(_shortId) {
		navigate(`/tag/preview/${_shortId}`);
	}

	function goToTagId(_shortId) {
		navigate(`/tag/${_shortId}`);
	}

	function goToTagCreate() {
		navigate(`/tag/create`);
	}

	return (
		<div>
			<button onClick={goToTagCreate}>CREATE NEW TAG</button>
			<div className={style.itemContainer}>
				<div className={style.nameH}>NAME</div>
				<div className={style.shortIdH}>SHORT ID</div>
				<div className={style.createdAtH}>CREATED AT</div>

				<div className={style.updatedAtH}>UPDATED</div>

				<div className={style.previewH}>PREVIEW</div>
			</div>
			{tagList.value.map((ele) => (
				<div className={style.itemContainer} key={ele._id}>
					<div onClick={() => goToTagId(ele.shortId)} className={style.name}>
						{ele.name}
					</div>
					<div onClick={() => goToTagId(ele.shortId)} className={style.shortId}>
						{ele.shortId}
					</div>
					<div className={style.createdAt}>
						{getDateInCalendar(ele.createdAt)}
					</div>

					<div className={style.updatedAt}>
						{getDateRelativeToNow(ele.updatedAt)}
					</div>

					<div
						onClick={() => goToPreview(ele.shortId)}
						className={style.preview}
					>
						PREVIEW
					</div>
				</div>
			))}
		</div>
	);
}

export default TagList;
