import React from "react";
import renderer from "react-test-renderer";
import List from ".";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<List>
				<li>one</li>
				<li>two</li>
			</List>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
