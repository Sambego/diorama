import React from "react";
import renderer from "react-test-renderer";
import Browser from ".";

it("renders correctly", () => {
	const tree = renderer.create(<Browser url="https://sambego.be" />).toJSON();
	expect(tree).toMatchSnapshot();
});
