import React from "react";
import PropTypes from "prop-types";

import styles from "./Navigation.module.css";

interface NavigationProps {
	onPreviousSlide: () => void;
	onNextSlide: () => void;
	className?: string;
	style?: React.CSSProperties;
}
function Navigation({
	onPreviousSlide,
	onNextSlide,
	className,
	style,
}: NavigationProps) {
	return (
		<nav
			className={`${styles.navigation} diorama-navigation ${className}`}
			style={style}
		>
			<ul className={styles.list}>
				<li className={styles.item}>
					<button
						onClick={onPreviousSlide}
						className={`${styles.previous} diorama-previous`}
						type="button"
					>
						Previous
					</button>
				</li>
				<li className={styles.item}>
					<button
						onClick={onNextSlide}
						className={`${styles.next} diorama-next`}
						type="button"
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
}

Navigation.propTypes = {
	className: PropTypes.string,
	onPreviousSlide: PropTypes.func.isRequired,
	onNextSlide: PropTypes.func.isRequired,
	style: PropTypes.shape({}),
};

Navigation.defaultProps = {
	className: "",
	style: {},
};

export default Navigation;
