import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
import PropTypes from "prop-types";

import styles from "./Quote.module.css";

interface QuoteProps {
	className?: string;
	style?: CSSProperties;
	quotee?: ReactNode;
}
function Quote({
	children,
	quotee,
	style,
	className,
}: PropsWithChildren<QuoteProps>) {
	return (
		<>
			<blockquote
				style={style}
				className={`${styles.quote} diorama-quote ${className}`}
			>
				{children}
			</blockquote>
			{quotee && (
				<cite className={`${styles.cite} diorama-cite`}>{quotee}</cite>
			)}
		</>
	);
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
