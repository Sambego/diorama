import { MultiSlideInfo } from "@contexts/MultiSlideContext";
import React from "react";

export type SlideProps = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
	notes?: string;
	// eslint-disable-next-line react/require-default-props
	index?: number;
	// eslint-disable-next-line react/require-default-props
	navigate?: (slideIndex: number) => void;
}>;
export type SlideInfo = {
	notes?: SlideProps["notes"];
	multiSlideInfo?: MultiSlideInfo;
};
