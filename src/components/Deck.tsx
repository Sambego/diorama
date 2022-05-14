import React, {
	cloneElement,
	Children,
	useState,
	useEffect,
	useRef,
	useMemo,
	useContext,
	useCallback,
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Swipe from "react-easy-swipe";
import Keyboard from "../services/Keyboard";
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

const DeckContext = React.createContext<{
	currentSlideIndex: number;
	slides: React.ReactElement<SlideProps>[];
	navigate: (slideToNavigateIndex: number) => void;
}>({ currentSlideIndex: -1, slides: [], navigate: () => {} });

function PresenterPortal({ rootDiv }: { rootDiv: HTMLDivElement }) {
	const ctx = useContext(DeckContext);
	if (!ctx.slides[ctx.currentSlideIndex]) return null;
	const currentSlide = ctx.slides[ctx.currentSlideIndex];
	const nextSlide = ctx.slides[ctx.currentSlideIndex + 1];
	const totalSlides = ctx.slides.length;
	const mainStyles = document.querySelectorAll('link[type="text/css"], style');

	return ReactDOM.createPortal(
		<PresenterNotes
			slide={currentSlide}
			next={nextSlide}
			notes={currentSlide.props.notes}
			current={ctx.currentSlideIndex + 1}
			total={totalSlides}
			parentStyles={mainStyles}
			origin={`${window.location.protocol}//${window.location.hostname}${
				window.location.port ? `:${window.location.port}` : ""
			}`}
		/>,
		rootDiv
	);
}

type NewDeckProps = DeckProps & {
	showNavigationHUD?: boolean;
	onActiveSlideChange?: (oldSlideIndex: number, newSlideIndex: number) => void;
};

function Deck({
	children,
	className,
	footer,
	onActiveSlideChange,
	showNavigationHUD,
	navigation = false,
	presenterNotes = false,
	swipeToChange = false,
}: NewDeckProps) {
	const [deckState, setDeckState] = useState<{
		slide: number;
		presenterNotesOpen: boolean;
	}>(() => ({
		slide: 0,
		presenterNotesOpen: false,
	}));

	const showOnScreenNavButtons = navigation || showNavigationHUD;

	const presenterWindowRef = useRef<Window | null>(null);
	const presenterNotePopupDiv = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (presenterNotes) {
			presenterWindowRef.current = window.open(
				"",
				"Presenter notes",
				"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,width=1000,height=600"
			);

			if (!presenterWindowRef.current || presenterWindowRef.current.closed) {
				/* eslint-disable no-alert */
				window.alert("Please allow popups to open the presenter window.");
			} else {
				const presenterNotesContainer =
					presenterWindowRef.current.document.createElement("div");
				const mainStyles = document.querySelectorAll(
					'link[type="text/css"], style'
				);
				// presenterWindowRef.current.document.title = `[ Presenter notes - slide ${
				// 	currentSlideIndex + 1
				// }/${totalSlides} ] - ${document.title}`;

				(mainStyles || []).forEach(style => {
					if (presenterWindowRef.current)
						presenterWindowRef.current.document.head.innerHTML +=
							style.outerHTML;
				});

				presenterWindowRef.current.document.body.append(
					presenterNotesContainer
				);
				presenterNotePopupDiv.current = presenterNotesContainer;
				setDeckState(s => ({ ...s, presenterNotesOpen: true }));
			}
		} else {
			setDeckState(s => ({ ...s, presenterNotesOpen: false }));
			presenterNotePopupDiv.current = null;
		}
	}, [presenterNotes]);

	const showPreviousSlide = useCallback(() => {
		if (deckState.slide === 0) return;
		onActiveSlideChange?.(deckState.slide, deckState.slide - 1);
		setDeckState(state => ({ ...state, slide: state.slide - 1 }));
		window.history.pushState(undefined, "", (deckState.slide - 1).toString());
		// this.updatePresenterNotes();
	}, [onActiveSlideChange, deckState.slide]);

	const showNextSlide = useCallback(() => {
		if (deckState.slide === Children.count(children) - 1) return;
		onActiveSlideChange?.(deckState.slide, deckState.slide + 1);
		setDeckState(state => ({ ...state, slide: state.slide + 1 }));
		window.history.pushState(undefined, "", (deckState.slide + 1).toString());
		// this.updatePresenterNotes();
	}, [onActiveSlideChange, deckState.slide]);

	useEffect(() => {
		const KeyboardLeftListener = Keyboard.on("left", showPreviousSlide);
		const KeyboardRightListener = Keyboard.on("right", showNextSlide);
		const KeyboardUpListener = Keyboard.on("page up", showPreviousSlide);
		const KeyboardDownListener = Keyboard.on("page down", showNextSlide);
		return () => {
			Keyboard.off(KeyboardLeftListener);
			Keyboard.off(KeyboardRightListener);
			Keyboard.off(KeyboardUpListener);
			Keyboard.off(KeyboardDownListener);
		};
	}, [showPreviousSlide, showNextSlide]);

	const slideToRender = React.useMemo(() => {
		if (!children) return null;
		const slideIndex = deckState.slide;
		if (React.isValidElement(children[slideIndex])) {
			return cloneElement(children[slideIndex], {
				index: slideIndex,
			});
		}
		return null;
	}, [children, deckState.slide]);

	const deckContextValue = useMemo(
		() => ({
			slides: children || [],
			currentSlideIndex: deckState.slide,
			navigate: (index: number) => {
				if (
					index >= 0 &&
					index < React.Children.count(children) &&
					deckState.slide !== index
				)
					setDeckState(s => ({ ...s, slide: index }));
			},
		}),
		[children, deckState.slide]
	);

	return (
		<Swipe
			className={`diorama-swipe-container ${styles.swipe}`}
			onSwipeLeft={swipeToChange ? showPreviousSlide : undefined}
			onSwipeRight={swipeToChange ? showNextSlide : undefined}
			allowMouseEvents
		>
			<DeckContext.Provider value={deckContextValue}>
				<div className={`diorama diorama-deck ${styles.deck} ${className}`}>
					{footer && footer}
					{showOnScreenNavButtons && (
						<Navigation
							onPreviousSlide={showPreviousSlide}
							onNextSlide={showNextSlide}
						/>
					)}
					{slideToRender}
				</div>
				{presenterNotePopupDiv.current && deckState.presenterNotesOpen ? (
					<PresenterPortal rootDiv={presenterNotePopupDiv.current} />
				) : null}
			</DeckContext.Provider>
		</Swipe>
	);
}

Deck.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	footer: PropTypes.node,
	navigation: PropTypes.bool,
	showNavigationHUD: PropTypes.bool,
	swipeToChange: PropTypes.bool,
	presenterNotes: PropTypes.bool,
	onActiveSlideChange: PropTypes.func,
};

export default Deck;
