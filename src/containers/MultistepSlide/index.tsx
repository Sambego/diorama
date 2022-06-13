import DeckContext, { DeckContextInternal } from "@contexts/DeckContext";
import MultiSlideContext, {
	MultiSlideInnerContext,
} from "@contexts/MultiSlideContext";
import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import Slide from "../Slide";

export default function MultistepSlide({
	render,
	stepsCount,
	...props
}: React.ComponentProps<typeof Slide> & {
	render?: (step: number, totalSteps: number) => React.ReactNode;
	stepsCount: (() => number) | number;
}) {
	const multislideCxt = useContext(MultiSlideInnerContext);
	const ctx = useContext(DeckContext);
	const intDeckCtx = useContext(DeckContextInternal);

	const [currentStep, setCurrentStep] = useState(0);
	const totalSteps = useMemo(() => {
		if (typeof stepsCount === "function") {
			return stepsCount();
		}
		return stepsCount;
	}, [stepsCount]);

	useEffect(() => {
		setCurrentStep(0);
	}, [ctx.currentSlideIndex]);

	const listener = useCallback(
		(direction: "next" | "prev") => {
			if (direction === "prev") {
				if (currentStep > 0) {
					setCurrentStep(c => c - 1);
					return true;
				}
			} else if (currentStep < totalSteps - 1) {
				setCurrentStep(c => c + 1);
				return true;
			}
			return false;
		},
		[totalSteps, currentStep, setCurrentStep]
	);

	useEffect(() => {
		multislideCxt.setMultistepSlideHandler(direction => listener(direction));
		return () => {
			multislideCxt.setMultistepSlideHandler(null);
		};
	}, [listener]);

	const innerCtxValue = useMemo(
		() => ({
			currentSlide: currentStep,
			totalSlides: totalSteps,
			isMultiSlide: true,
		}),
		[totalSteps, currentStep]
	);

	useEffect(() => {
		intDeckCtx.setMultiSlideInfo(innerCtxValue);
		return () => {
			intDeckCtx.setMultiSlideInfo(null);
		};
	}, [innerCtxValue]);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Slide {...props}>
			<MultiSlideContext.Provider value={innerCtxValue}>
				{render && render(currentStep, totalSteps)}
				{props.children}
			</MultiSlideContext.Provider>
		</Slide>
	);
}
