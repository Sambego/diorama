import React from "react";
import renderer from "react-test-renderer";
import MultistepSlide from ".";

it("renders correctly using render prop", () => {
	const rtr = renderer.create(
		<MultistepSlide
			stepsCount={2}
			render={(step, totalSteps) => {
				return <div>Show step {step + 1}</div>;
			}}
		/>
	);
	const tree = rtr.toJSON();
	expect(tree).toMatchSnapshot();
});
