import Navigation from "@components/Navigation";
import { SlideProps } from "@containers/Slide";
import PropTypes from "prop-types";
import React, { cloneElement, Component, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import style from "./PresenterNotes.module.css";

interface PresenterNotesProps {
	slide: React.ReactElement<SlideProps>;
	origin: string;
	current: number;
	total: number;
	notes?: string;
	next?: React.ReactElement<SlideProps>;
	parentStyles?: NodeListOf<Element>;
}

const pad = (toPad: string | number) =>
	`${toPad}`.length > 1 ? `${toPad}` : `0${toPad}`;

function Timer() {
	const [timerTotalSeconds, setTimerSeconds] = useState(0);
	useEffect(() => {
		const timerInterval = window.setInterval(() => {
			setTimerSeconds(s => s + 1);
		}, 1000);
		return () => {
			clearInterval(timerInterval);
		};
	}, []);
	return (
		<span>{`${pad(parseInt((timerTotalSeconds / 3600).toString(), 10))}:${pad(
			parseInt((timerTotalSeconds / 60).toString(), 10)
		)}:${pad(timerTotalSeconds % 60)}`}</span>
	);
}
export default class PresenterNotes extends Component<PresenterNotesProps> {
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

	injectOrigin(htmlString: string) {
		const { origin } = this.props;
		return htmlString.replace(
			/src="([^"]*)"/gi,
			(match, media) => `src="${origin}${media}"`
		);
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
					<Timer />
					<span>
						{current}/{total}
					</span>
					<Navigation onPreviousSlide={() => {}} onNextSlide={() => {}} />
				</div>
			</div>
		);
	}
}
