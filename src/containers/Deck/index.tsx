import Navigation from "@components/Navigation";
import { SlideInfo, SlideProps } from "@containers/Slide/Slide.types";
import DeckContext, {
	DeckContextInternal,
	DeckContextInternalType,
} from "@contexts/DeckContext";
import MultiSlideContext, {
	MultiSlideInnerContext,
} from "@contexts/MultiSlideContext";
import Keyboard from "@services/Keyboard";
import PropTypes from "prop-types";
import React, {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Swipe from "react-easy-swipe";
import "../../styles/styles.module.css";
import styles from "./Deck.module.css";
import PresenterPortal from "./PresenterPortal";

type DeckProps = {
	className?: string;
	footer?: React.ReactNode;
	navigation?: boolean;
	swipeToChange?: boolean;
	presenterNotes?: boolean;
	presenterNotesOptions?: { showNavigationHUD?: boolean };
	children?: React.ReactElement<SlideProps>[];
	talkTitle?: string;
	showNavigationHUD?: boolean;
	onActiveSlideChange?: (oldSlideIndex: number, newSlideIndex: number) => void;
	automaticHistoryTrack?: boolean;
	initialPageIndex?: number;
};

const MULTI_SLIDE_CONTEXT_VALUE = {
	currentSlide: 1,
	totalSlides: 1,
	isMultiSlide: false,
};

function Deck({
	children,
	className,
	footer,
	onActiveSlideChange,
	showNavigationHUD,
	navigation,
	presenterNotes = false,
	swipeToChange = false,
	talkTitle = "",
	presenterNotesOptions,
	automaticHistoryTrack = true,
	initialPageIndex = 0,
}: DeckProps) {
	const [deckState, setDeckState] = useState<{
		slide: number;
		presenterNotesOpen: boolean;
	}>(() => {
		if (automaticHistoryTrack)
			window.history.pushState(undefined, "", initialPageIndex.toString());
		return {
			slide: initialPageIndex,
			multislideHandler: null,
			presenterNotesOpen: false,
		};
	});

	const [multiSlideHandler, setMultiSlideHandler] = useState<
		((direction: "next" | "prev") => boolean) | null
	>(null);

	const showOnScreenNavButtons = navigation || showNavigationHUD;

	const presenterWindowRef = useRef<Window | null>(null);
	const presenterNotePopupDiv = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (presenterNotes) {
			if (!presenterWindowRef.current)
				presenterWindowRef.current = window.open(
					"",
					"Presenter notes",
					"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,width=1000,height=600"
				);

			if (!presenterWindowRef.current || presenterWindowRef.current.closed) {
				/* eslint-disable no-alert */
				window.alert("Please allow popups to open the presenter window.");
			} else {
				let presenterNotesContainer: HTMLDivElement | null =
					presenterWindowRef.current.document.getElementById(
						"rootPresenterDiv"
					) as HTMLDivElement | null;
				if (!presenterNotesContainer) {
					presenterNotesContainer =
						presenterWindowRef.current.document.createElement("div");
					presenterNotesContainer.setAttribute("id", "rootPresenterDiv");
				}

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
		if (multiSlideHandler) {
			const prevented = multiSlideHandler("prev");
			if (prevented) return;
		}
		if (deckState.slide === 0) return;
		onActiveSlideChange?.(deckState.slide, deckState.slide - 1);
		setDeckState(state => ({ ...state, slide: state.slide - 1 }));
		if (automaticHistoryTrack)
			window.history.pushState(undefined, "", (deckState.slide - 1).toString());
	}, [
		multiSlideHandler,
		onActiveSlideChange,
		deckState.slide,
		automaticHistoryTrack,
	]);

	const showNextSlide = useCallback(() => {
		if (multiSlideHandler) {
			const prevented = multiSlideHandler("next");
			if (prevented) return;
		}
		if (deckState.slide === Children.count(children) - 1) return;
		onActiveSlideChange?.(deckState.slide, deckState.slide + 1);
		setDeckState(state => ({ ...state, slide: state.slide + 1 }));
		if (automaticHistoryTrack)
			window.history.pushState(undefined, "", (deckState.slide + 1).toString());
	}, [
		multiSlideHandler,
		onActiveSlideChange,
		deckState.slide,
		automaticHistoryTrack,
	]);

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

	const slideInfo = useRef<SlideInfo | null>(null);
	const deckContextInternalValue = useMemo<DeckContextInternalType>(
		() => ({
			setMultiSlideInfo: multiSlideInfo => {
				if (!slideInfo.current) {
					slideInfo.current = {};
				}
				slideInfo.current = {
					...slideInfo.current,
					multiSlideInfo: multiSlideInfo || undefined,
				};
			},
			setSlideNotes(notes) {
				if (!slideInfo.current) {
					slideInfo.current = {};
				}
				slideInfo.current.notes = notes || undefined;
			},
			setSlideInfo(si) {
				slideInfo.current = si;
			},
			getSlideInfo: () => slideInfo.current,
		}),
		[]
	);

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
			<MultiSlideInnerContext.Provider
				// eslint-disable-next-line react/jsx-no-constructed-context-values
				value={{
					setMultistepSlideHandler: fn => {
						setMultiSlideHandler(() => fn);
					},
				}}
			>
				<DeckContext.Provider value={deckContextValue}>
					<DeckContextInternal.Provider value={deckContextInternalValue}>
						<MultiSlideContext.Provider value={MULTI_SLIDE_CONTEXT_VALUE}>
							<div
								className={`diorama diorama-deck ${styles.deck} ${className}`}
							>
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
								<PresenterPortal
									rootDiv={presenterNotePopupDiv.current}
									talkTitle={talkTitle}
									onPreviousSlide={showPreviousSlide}
									onNextSlide={showNextSlide}
									showNavigationHUD={presenterNotesOptions?.showNavigationHUD}
								/>
							) : null}
						</MultiSlideContext.Provider>
					</DeckContextInternal.Provider>
				</DeckContext.Provider>
			</MultiSlideInnerContext.Provider>
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
	talkTitle: PropTypes.string,
	presenterNotesOptions: PropTypes.shape({
		showNavigationHUD: PropTypes.bool,
	}),
	automaticHistoryTrack: PropTypes.bool,
	initialPageIndex: PropTypes.number,
};

export default Deck;
