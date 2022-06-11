import MultiSlideContext from "@contexts/MultiSlideContext";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Slide from "../Slide";

export default function MultistepSlide({
	render,
	getTotalSteps,
	...props
}: React.ComponentProps<typeof Slide> & {
	render: (step: number, totalSteps: number) => React.ReactNode;
	getTotalSteps: () => number;
}) {
	const multislideCxt = useContext(MultiSlideContext);

	const [currentStep, setCurrentStep] = useState(0);

	const listener = useCallback(
		(direction: "next" | "prev") => {
			const totalSteps = getTotalSteps();
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
		[getTotalSteps, currentStep, setCurrentStep]
	);

	useEffect(() => {
		multislideCxt.setMultistepSlideHandler(direction => listener(direction));
		return () => {
			multislideCxt.setMultistepSlideHandler(null);
		};
	}, [listener]);

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Slide {...props}>{render(currentStep, getTotalSteps())}</Slide>;
}
