import React from "react";
import PropTypes from "prop-types";
import Prism from "prismjs";

import "prismjs/themes/prism.css";
import styles from "./Code.module.css";

type CodeProps = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
	code: string;
	lang?: string;
}>;

/* eslint-disable react/no-danger */
function Code({ code, lang, style, className }: CodeProps) {
	return (
		<div className={`${styles.code} diorama-code ${className}`} style={style}>
			<header className={`${styles.header} diorama-code-header`}>
				<span className={styles.red} />
				<span className={styles.yellow} />
				<span className={styles.green} />
				<span className={styles.lang}>{lang}</span>
			</header>
			<div className={`${styles.snippet} diorama-code-snippet`}>
				<pre>
					<code
						dangerouslySetInnerHTML={{
							__html: lang
								? Prism.highlight(
										code,
										Prism.languages[lang],
										// Prism.languages[lang]
										lang
								  )
								: "",
						}}
					>
						{!lang ? code : ""}
					</code>
				</pre>
			</div>
		</div>
	);
}
/* eslint-enable react/no-danger */

Code.propTypes = {
	className: PropTypes.string,
	code: PropTypes.string.isRequired,
	lang: PropTypes.string,
	style: PropTypes.shape({}),
};

Code.defaultProps = {
	className: "",
	lang: "javascript",
	style: {},
};

export default Code;
