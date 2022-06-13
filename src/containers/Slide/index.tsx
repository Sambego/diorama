/* eslint-disable react/no-unused-prop-types */
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { DeckContextInternal } from "@contexts/DeckContext";
import styles from "./Slide.module.css";
import { SlideProps } from "./Slide.types";

function Slide({ children, style, className, notes }: SlideProps) {
	const intDeckCtx = useContext(DeckContextInternal);
	useEffect(() => {
		intDeckCtx.setSlideNotes(notes);
		return () => {
			intDeckCtx.setSlideNotes(null);
		};
	}, [notes]);
	return (
		<div style={style} className={`${styles.slide} diorama-slide ${className}`}>
			<div className={`diorama-content ${styles.content}`}>{children}</div>
		</div>
	);
}

Slide.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	notes: PropTypes.string,
	style: PropTypes.shape({}),
};

Slide.defaultProps = {
	className: "",
	notes: undefined,
	style: {},
};

export default Slide;
