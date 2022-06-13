import React from "react";
import PropTypes from "prop-types";

import styles from "./Footer.module.css";

type FooterProps = {
	className?: string;
	style?: React.CSSProperties;
	left?: React.ReactNode;
	right?: React.ReactNode;
};

function Footer({ left, right, style, className }: FooterProps) {
	return (
		<footer
			style={style}
			className={`${styles.footer} diorama-footer ${className}`}
		>
			{left && (
				<div className={`${styles.left} diorama-footer-left`}>{left}</div>
			)}
			{right && (
				<div className={`${styles.right} diorama-footer-right`}>{right}</div>
			)}
		</footer>
	);
}

Footer.propTypes = {
	left: PropTypes.node,
	right: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.shape({}),
};

Footer.defaultProps = {
	left: undefined,
	right: undefined,
	className: "",
	style: {},
};

export default Footer;
