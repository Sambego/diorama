import React from "react";
import PropTypes from "prop-types";

import styles from "./Browser.module.css";

interface BrowserProps {
	className?: string;
	style?: React.CSSProperties;
	url: string;
}

function Browser({ style, className, url }: BrowserProps) {
	return (
		<div
			style={style}
			className={`${styles.browser} diorama-browser ${className}`}
		>
			<header className={styles.header}>
				<div className={styles.traffic}>
					<span className={styles.red} />
					<span className={styles.yellow} />
					<span className={styles.green} />
				</div>
				<input className={styles.address} type="text" value={url} disabled />
			</header>
			<iframe
				src={url}
				frameBorder="0"
				title="preview browser"
				className={styles.iframe}
			/>
		</div>
	);
}

Browser.propTypes = {
	className: PropTypes.string,
	url: PropTypes.string.isRequired,
	style: PropTypes.shape({}),
};

Browser.defaultProps = {
	className: "",
	style: {},
};

export default Browser;
