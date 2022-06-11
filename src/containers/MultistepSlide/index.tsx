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
	const multislideCxt = useContext(MultiSlideContext);

	const [currentStep, setCurrentStep] = useState(0);
	const totalSteps = useMemo(() => {
		if (typeof stepsCount === "function") {
			return stepsCount();
		}
		return stepsCount;
	}, [stepsCount]);

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

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Slide {...props}>
			<MultiSlideInnerContext.Provider value={innerCtxValue}>
				{render && render(currentStep, totalSteps)}
				{props.children}
			</MultiSlideInnerContext.Provider>
		</Slide>
	);
}
