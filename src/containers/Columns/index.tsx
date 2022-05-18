import React, { cloneElement, Children } from "react";
import PropTypes from "prop-types";

import styles from "./Columns.module.css";

type ColumnsProps = {
	className?: string;
	children: React.ReactNode;
};

function Columns({ children, className }: ColumnsProps) {
	const renderColumns = () =>
		Children.map(children, (child, index) => {
			// TODO: Not sure of what this style is supposed to do with children
			if (React.isValidElement(child)) {
				return cloneElement(child, {
					className: `${styles.column} diorama-column ${className} `,
					// eslint-disable-next-line react/no-array-index-key
					key: index,
					// @ts-ignore
					style: { maxWidth: `${100 / children}%` },
				});
			}
			return null;
		});

	return (
		<div className={`${styles.columns} diorama-columns`}>{renderColumns()}</div>
	);
}

Columns.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

Columns.defaultProps = {
	className: "",
};

export default Columns;
