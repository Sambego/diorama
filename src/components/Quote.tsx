import React from "react";
import PropTypes from "prop-types";

import styles from "./Quote.module.css";

function Quote({ children, quotee, style, className }) {
  return <>
		<blockquote
			style={style}
			className={`${styles.quote} diorama-quote ${className}`}
		>
			{children}
		</blockquote>
		{quotee && <cite className={`${styles.cite} diorama-cite`}>{quotee}</cite>}
	</>
}

Quote.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.shape({}),
	quotee: PropTypes.node,
};

Quote.defaultProps = {
	className: "",
	style: {},
	quotee: undefined,
};

export default Quote;
