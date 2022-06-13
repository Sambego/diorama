import React from "react";
import renderer from "react-test-renderer";
import Title from "./";

it("renders correctly", () => {
	const tree = renderer.create(<Title>Title content</Title>).toJSON();
	expect(tree).toMatchSnapshot();
});
