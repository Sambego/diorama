import React, { Component, cloneElement, Children, createRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Swipe from "react-easy-swipe";
import Keyboard, { Listener } from "../services/Keyboard";
import Navigation from "./Navigation";
import PresenterNotes from "./PresenterNotes";

import styles from "./Deck.module.css";
import "../styles/styles.module.css";
import { SlideProps } from "./Slide";

export type DeckProps = {
	className?: string;
	footer?: React.ReactNode;
	navigation?: boolean;
	swipeToChange?: boolean;
	presenterNotes?: boolean;
	children?: React.ReactElement<SlideProps>[];
};

export default class Deck extends Component<DeckProps, { slide: number }> {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
		footer: PropTypes.node,
		navigation: PropTypes.bool,
		swipeToChange: PropTypes.bool,
		presenterNotes: PropTypes.bool,
	};

	static defaultProps = {
		className: "",
		footer: undefined,
		navigation: false,
		swipeToChange: true,
		presenterNotes: false,
	};

	presenterElementRef = createRef<PresenterNotes>();

	KeyboardLeftListener: Listener | undefined;

	KeyboardRightListener: Listener | undefined;

	KeyboardUpListener: Listener | undefined;

	KeyboardDownListener: Listener | undefined;

	presenterWindow: Window | null | undefined;

	constructor(props: DeckProps) {
		super(props);

		this.state = {
			slide: Number(window.location.pathname.split("/")[1]) || 0,
		};

		this.getPreviousSlide = this.getPreviousSlide.bind(this);
		this.getNextSlide = this.getNextSlide.bind(this);
		this.getSlide = this.getSlide.bind(this);
		this.openPresenterNotes = this.openPresenterNotes.bind(this);
	}

	// componentWillMount() {
	// 	this.KeyboardLeftListener = Keyboard.on("left", this.getPreviousSlide);
	// 	this.KeyboardRightListener = Keyboard.on("right", this.getNextSlide);
	// 	this.KeyboardUpListener = Keyboard.on("page up", this.getPreviousSlide);
	// 	this.KeyboardDownListener = Keyboard.on("page down", this.getNextSlide);
	// }

	componentDidMount() {
		this.KeyboardLeftListener = Keyboard.on("left", this.getPreviousSlide);
		this.KeyboardRightListener = Keyboard.on("right", this.getNextSlide);
		this.KeyboardUpListener = Keyboard.on("page up", this.getPreviousSlide);
		this.KeyboardDownListener = Keyboard.on("page down", this.getNextSlide);

		const { presenterNotes } = this.props;

		if (presenterNotes) {
			this.openPresenterNotes();
		}
	}

	componentWillUnmount() {
		Keyboard.off(this.KeyboardLeftListener);
		Keyboard.off(this.KeyboardRightListener);
		Keyboard.off(this.KeyboardUpListener);
		Keyboard.off(this.KeyboardDownListener);
	}

	getPreviousSlide() {
		const { slide } = this.state;

		if (slide === 0) return;

		this.setState(state => ({ ...state, slide: slide - 1 }));
		window.history.pushState(undefined, "", (slide - 1).toString());
		this.updatePresenterNotes();
	}

	getNextSlide() {
		const { slide } = this.state;
		const { children } = this.props;

		if (slide === Children.count(children) - 1) {
			return;
		}
		this.setState(state => ({ ...state, slide: slide + 1 }));
		window.history.pushState(undefined, "", (slide + 1).toString());
	}

	getSlide(slideNumber: number) {
		this.setState(state => ({ ...state, slide: slideNumber }));
		window.history.pushState(undefined, "", slideNumber.toString());
	}

	openPresenterNotes() {
		const { slide } = this.state;
		const { children } = this.props;

		this.presenterWindow = window.open(
			"",
			"Presenter notes",
			"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,width=1000,height=600"
		);

		if (!this.presenterWindow || this.presenterWindow.closed) {
			/* eslint-disable no-alert */
			window.alert("Please allow popups to open the presenter window.");
			/* eslint-enable no-alert */
		} else if (children)
			this.renderPresenterNotes(
				children[slide],
				slide,
				children[slide + 1],
				Children.count(children)
			);
	}

	updatePresenterNotes() {
		const { slide } = this.state;
		const { children } = this.props;

		if (
			this.presenterElementRef &&
			this.presenterElementRef.current &&
			children
		) {
			this.presenterElementRef.current.setState(state => ({
				...state,
				slide: children[slide],
				current: slide + 1,
				notes: children[slide].props.notes,
				next: children[slide + 1],
			}));
		}

		if (this.presenterWindow) {
			this.presenterWindow.document.title = `[ Presenter notes - slide ${
				slide + 1
			}/${Children.count(children)} ] - ${document.title}`;
		}
	}

	renderPresenterNotes(
		currentSlide: React.ReactElement<SlideProps>,
		currentSlideIndex: number,
		nextSlide: React.ReactElement<SlideProps> | undefined,
		totalSlides: number
	) {
		if (this.presenterWindow) {
			const presenterNotesContainer =
				this.presenterWindow.document.createElement("div");
			const mainStyles = document.querySelectorAll(
				'link[type="text/css"], style'
			);

			ReactDOM.render(
				<PresenterNotes
					slide={currentSlide}
					next={nextSlide}
					notes={currentSlide.props.notes}
					current={currentSlideIndex + 1}
					total={totalSlides}
					ref={this.presenterElementRef}
					parentStyles={mainStyles}
					origin={`${window.location.protocol}//${window.location.hostname}${
						window.location.port ? `:${window.location.port}` : ""
					}`}
				/>,
				presenterNotesContainer
			);

			this.presenterWindow.document.title = `[ Presenter notes - slide ${
				currentSlideIndex + 1
			}/${totalSlides} ] - ${document.title}`;

			(mainStyles || []).forEach(style => {
				if (this.presenterWindow)
					this.presenterWindow.document.head.innerHTML += style.outerHTML;
			});

			this.presenterWindow.document.body.append(presenterNotesContainer);
		}
	}

	renderSlide() {
		const { slide } = this.state;
		const { children } = this.props;

		if (!children) return null;

		return cloneElement(children[slide], {
			index: slide,
			navigate: this.getSlide,
		});
	}

	render() {
		const { className, footer, navigation, swipeToChange } = this.props;

		return (
			<Swipe
				className={`diorama-swipe-container ${styles.swipe}`}
				onSwipeLeft={swipeToChange ? this.getNextSlide : undefined}
				onSwipeRight={swipeToChange ? this.getPreviousSlide : undefined}
				allowMouseEvents
			>
				<div className={`diorama diorama-deck ${styles.deck} ${className}`}>
					{footer && footer}
					{navigation && (
						<Navigation
							onPreviousSlide={this.getPreviousSlide}
							onNextSlide={this.getNextSlide}
						/>
					)}
					{this.renderSlide()}
				</div>
			</Swipe>
		);
	}
}
