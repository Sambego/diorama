import { SlideProps, SlideInfo } from "@containers/Slide/Slide.types";
import React from "react";

const DeckContext = React.createContext<{
	currentSlideIndex: number;
	slides: React.ReactElement<SlideProps>[];
	navigate: (slideToNavigateIndex: number) => void;
}>({ currentSlideIndex: -1, slides: [], navigate: () => {} });

export type DeckContextInternalType = {
	setSlideNotes: (notes: SlideInfo["notes"] | null) => void;
	setMultiSlideInfo: (msi: SlideInfo["multiSlideInfo"] | null) => void;
	setSlideInfo: (slideInfo: SlideInfo | null) => void;
	getSlideInfo: () => SlideInfo | null;
};
export const DeckContextInternal = React.createContext<DeckContextInternalType>(
	{
		setSlideNotes() {},
		setMultiSlideInfo() {},
		setSlideInfo() {},
		getSlideInfo: () => null,
	}
);

export default DeckContext;
