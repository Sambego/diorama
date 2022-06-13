import React from "react";
import PropTypes from "prop-types";

import styles from "./Subtitle.module.css";

type SubtitleProps = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
}>;

function Subtitle({ children, style, className }: SubtitleProps) {
	return (
		<h2
			style={style}
			className={`${styles.subtitle} diorama-subtitle ${className}`}
		>
			{children}
		</h2>
	);
}

Subtitle.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.shape({}),
};

Subtitle.defaultProps = {
	className: "",
	style: {},
};

export default Subtitle;
