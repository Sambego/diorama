import { SlideProps } from "@containers/Slide/Slide.types";
import { MultiSlideInfo } from "@contexts/MultiSlideContext";
import PropTypes from "prop-types";
import React, { cloneElement, Component, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import style from "./PresenterNotes.module.css";

interface PresenterNotesProps {
	slide: React.ReactElement<SlideProps>;
	origin: string;
	current: number;
	multiSlideInfo?: MultiSlideInfo;
	total: number;
	notes?: string;
	next?: React.ReactElement<SlideProps>;
	parentStyles?: NodeListOf<Element>;
	talkTitle?: string;

	onPreviousSlide?: () => void;
	onNextSlide?: () => void;
	showNavigationHUD?: boolean;
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

function SpecialNavigation({
	onNextSlide,
	onPreviousSlide,
}: {
	onPreviousSlide?: () => void;
	onNextSlide?: () => void;
}) {
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<button onClick={onPreviousSlide} type="button">
				Previous
			</button>
			<button onClick={onNextSlide} type="button">
				Next
			</button>
		</div>
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
		talkTitle: PropTypes.string,
		onPreviousSlide: PropTypes.func,
		onNextSlide: PropTypes.func,
		showNavigationHUD: PropTypes.bool,
		// eslint-disable-next-line react/forbid-prop-types
		multiSlideInfo: PropTypes.objectOf(PropTypes.any),
	};
	/* eslint-enable react/no-unused-prop-types */

	static defaultProps = {
		notes: undefined,
		next: undefined,
		parentStyles: PropTypes.shape({}),
		talkTitle: "",
		onPreviousSlide: () => {},
		onNextSlide: () => {},
		showNavigationHUD: false,
		multiSlideInfo: undefined,
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
		const {
			slide,
			next,
			notes,
			current,
			total,
			talkTitle,
			onNextSlide,
			onPreviousSlide,
			showNavigationHUD,
			multiSlideInfo,
		} = this.props;

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
				<title>{`[ Presenter notes - slide ${current}/${total} ]${
					talkTitle ? ` - ${talkTitle}` : ""
				}`}</title>

				<div className={style.slides}>
					{currentSlide}
					{next && nextSlide}
				</div>
				<div className={style.notes}>
					{notes && <ReactMarkdown>{notes}</ReactMarkdown>}
				</div>
				<div className={style.meta}>
					<Timer />
					<span>
						{current}/{total}{" "}
						{multiSlideInfo?.isMultiSlide
							? `(MULTI ${multiSlideInfo.currentSlide + 1} / ${
									multiSlideInfo.totalSlides
							  })`
							: ""}
					</span>
					{showNavigationHUD ? (
						<div>
							<SpecialNavigation
								onPreviousSlide={() => {
									onPreviousSlide?.();
								}}
								onNextSlide={() => {
									onNextSlide?.();
								}}
							/>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
