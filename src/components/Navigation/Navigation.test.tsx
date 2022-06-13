import React from "react";
import renderer from "react-test-renderer";
import Navigation from ".";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<Navigation onPreviousSlide={() => true} onNextSlide={() => true} />
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
