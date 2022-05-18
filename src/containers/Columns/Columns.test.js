import React from "react";
import renderer from "react-test-renderer";
import Columns from "./index";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<Columns>
				<div>Column 1</div>
				<div>Column 2</div>
			</Columns>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
