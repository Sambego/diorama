import React, { useContext } from "react";
import PresenterNotes from "@components/PresenterNotes";
import DeckContext, { DeckContextInternal } from "@contexts/DeckContext";
import ReactDOM from "react-dom";

function PresenterPortal({
	rootDiv,
	talkTitle,
	onNextSlide,
	onPreviousSlide,

	showNavigationHUD,
}: {
	rootDiv: HTMLDivElement;
	talkTitle?: string;
	onPreviousSlide?: () => void;
	onNextSlide?: () => void;
	showNavigationHUD?: boolean;
}) {
	const ctx = useContext(DeckContext);
	const intCtx = useContext(DeckContextInternal);

	if (!ctx.slides[ctx.currentSlideIndex]) return null;

	const currentSlide = ctx.slides[ctx.currentSlideIndex];
	const nextSlide = ctx.slides[ctx.currentSlideIndex + 1];
	const totalSlides = ctx.slides.length;
	const mainStyles = document.querySelectorAll('link[type="text/css"], style');

	return ReactDOM.createPortal(
		<PresenterNotes
			talkTitle={talkTitle}
			slide={currentSlide}
			next={nextSlide}
			notes={currentSlide.props.notes || intCtx.getSlideInfo()?.notes}
			multiSlideInfo={intCtx.getSlideInfo()?.multiSlideInfo}
			current={ctx.currentSlideIndex + 1}
			total={totalSlides}
			parentStyles={mainStyles}
			origin={`${window.location.protocol}//${window.location.hostname}${
				window.location.port ? `:${window.location.port}` : ""
			}`}
			onPreviousSlide={onPreviousSlide}
			onNextSlide={onNextSlide}
			showNavigationHUD={showNavigationHUD}
		/>,
		rootDiv
	);
}

export default PresenterPortal;
