/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";

import styles from "./Slide.module.css";

export type SlideProps = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
	notes?: string;
	// eslint-disable-next-line react/require-default-props
	index?: number;
	// eslint-disable-next-line react/require-default-props
	navigate?: (slideIndex: number) => void;
}>;

function Slide({ children, style, className }: SlideProps) {
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
