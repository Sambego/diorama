import React from "react";

const MultiSlideContext = React.createContext<{
	setMultistepSlideHandler: (
		fn: ((direction: "next" | "prev") => boolean) | null
	) => void;
}>({
	setMultistepSlideHandler: fn => {
		console.log("No handler declared");
	},
});

export const MultiSlideInnerContext = React.createContext<{
	isMultiSlide: boolean;
	currentSlide: number;
	totalSlides: number;
}>({ currentSlide: -1, totalSlides: -1, isMultiSlide: false });

export default MultiSlideContext;
