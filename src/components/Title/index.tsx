import React from "react";
import PropTypes from "prop-types";

import styles from "./Title.module.css";

type TitleProps = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
}>;

function Title({ children, style, className }: TitleProps) {
	return (
		<h1 style={style} className={`${styles.title} diorama-title ${className}`}>
			{children}
		</h1>
	);
}

Title.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.shape({}),
};

Title.defaultProps = {
	className: "",
	style: {},
};

export default Title;
