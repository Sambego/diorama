import React from "react";

export const MultiSlideInnerContext = React.createContext<{
	setMultistepSlideHandler: (
		fn: ((direction: "next" | "prev") => boolean) | null
	) => void;
}>({
	setMultistepSlideHandler: () => {},
});

export type MultiSlideInfo = {
	isMultiSlide: boolean;
	currentSlide: number;
	totalSlides: number;
};
const MultiSlideContext = React.createContext<MultiSlideInfo>({
	currentSlide: -1,
	totalSlides: -1,
	isMultiSlide: false,
});

export default MultiSlideContext;
