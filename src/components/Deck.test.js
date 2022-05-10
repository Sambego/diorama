import React from "react";
import renderer from "react-test-renderer";
import Deck from "./Deck";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<Deck>
				<div>Slide 1</div>
				<div>Slide 2</div>
			</Deck>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
