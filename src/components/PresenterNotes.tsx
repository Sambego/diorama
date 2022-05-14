import React, { Component, cloneElement } from "react";
import { renderToString } from "react-dom/server";
import PropTypes from "prop-types";

import style from "./PresenterNotes.module.css";
import { SlideProps } from "./Slide";

interface PresenterNotesProps {
	slide: React.ReactElement<SlideProps>;
	origin: string;
	current: number;
	total: number;
	notes?: string;
	next?: React.ReactElement<SlideProps>;
	parentStyles?: NodeListOf<Element>;
}

type PresenterNotesState = PresenterNotesProps & {
	timerTotal: number;
	timer: string;
};

const pad = (toPad: string | number) =>
	`${toPad}`.length > 1 ? `${toPad}` : `0${toPad}`;

export default class PresenterNotes extends Component<
	PresenterNotesProps,
	PresenterNotesState
> {
	/* eslint-disable react/no-unused-prop-types */
	static propTypes = {
		notes: PropTypes.string,
		slide: PropTypes.node.isRequired,
		next: PropTypes.node,
		// eslint-disable-next-line react/forbid-prop-types
		parentStyles: PropTypes.objectOf(PropTypes.any),
		origin: PropTypes.string.isRequired,
		current: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
	};
	/* eslint-enable react/no-unused-prop-types */

	static defaultProps = {
		notes: undefined,
		next: undefined,
		parentStyles: PropTypes.shape({}),
	};

	private timerInterval: number = 0;

	constructor(props: PresenterNotesProps) {
		super(props);

		this.state = { timerTotal: 0, timer: "00:00:00", ...this.props };
		this.updateTimer = this.updateTimer.bind(this);
	}

	componentDidMount() {
		this.timerInterval = window.setInterval(this.updateTimer, 1000);
	}

	componentWillUnmount() {
		window.clearInterval(this.timerInterval);
	}

	injectOrigin(htmlString: string) {
		const { origin } = this.props;
		return htmlString.replace(
			/src="([^"]*)"/gi,
			(match, media) => `src="${origin}${media}"`
		);
	}

	updateTimer() {
		const { timerTotal } = this.state;

		this.setState(state => ({
			...state,
			timerTotal: timerTotal + 1,
			timer: `${pad(parseInt((timerTotal / 3600).toString(), 10))}:${pad(
				parseInt((timerTotal / 60).toString(), 10)
			)}:${pad(timerTotal % 60)}`,
		}));
	}

	renderIframe(title: string, content: string) {
		const { parentStyles } = this.props;

		return (
			<iframe
				title={title}
				srcDoc={this.injectOrigin(
					[
						...[...(parentStyles || [])].map(
							parentStyle => parentStyle.outerHTML
						),
						content,
					].join("")
				)}
				className={style.slide}
			/>
		);
	}

	render() {
		const { timer } = this.state;
		const { slide, next, notes, current, total } = this.props;
		const currentSlide = this.renderIframe(
			"current slide",
			renderToString(
				cloneElement(slide, {
					className: "diorama-presenter-preview",
				})
			)
		);
		const nextSlide = next
			? this.renderIframe(
					"next slide",
					renderToString(
						cloneElement(next, {
							className: "diorama-presenter-preview",
						})
					)
			  )
			: null;

		return (
			<div className={`${style.presenter} diorama-presenter`}>
				<div className={style.slides}>
					{currentSlide}
					{next && nextSlide}
				</div>
				<div className={style.notes}>{notes && notes}</div>
				<div className={style.meta}>
					<span>{timer}</span>
					<span>
						{current}/{total}
					</span>
				</div>
			</div>
		);
	}
}
