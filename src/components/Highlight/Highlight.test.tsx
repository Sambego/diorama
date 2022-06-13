import React from "react";
import renderer from "react-test-renderer";
import Highlight from ".";

it("renders correctly", () => {
	const tree = renderer
		.create(<Highlight>Highlighted text</Highlight>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
