import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";

import styles from "./List.module.css";

type ListProps = {
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
	ordered?: boolean;
};

function List({ children, ordered, style, className }: ListProps) {
	const renderItems = () => {
		if (Array.isArray(children)) {
			return Children.map(children, (child, index) =>
				cloneElement(child, {
					className: `${styles.item} diorama-list-item`,
					// eslint-disable-next-line react/no-array-index-key
					key: index,
				})
			);
		}
		if (React.isValidElement(children)) {
			return cloneElement(children, {
				className: `${styles.item} diorama-list-item`,
			});
		}
		return null;
	};

	if (ordered) {
		return (
			<ol
				className={`${styles.ol} diorama-list diorama-list-unordered ${className}`}
				style={style}
			>
				{renderItems()}
			</ol>
		);
	}

	return (
		<ul
			className={`${styles.list} diorama-list diorama-list-unordered ${className}`}
			style={style}
		>
			{renderItems()}
		</ul>
	);
}

List.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	ordered: PropTypes.bool,
	style: PropTypes.shape({}),
};

List.defaultProps = {
	className: "",
	ordered: false,
	style: {},
};

export default List;
