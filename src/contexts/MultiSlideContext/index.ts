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

export default MultiSlideContext;
