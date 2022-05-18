import React from "react";
import { SlideProps } from "src/containers/Slide";

const DeckContext = React.createContext<{
	currentSlideIndex: number;
	slides: React.ReactElement<SlideProps>[];
	navigate: (slideToNavigateIndex: number) => void;
}>({ currentSlideIndex: -1, slides: [], navigate: () => {} });

export default DeckContext;
