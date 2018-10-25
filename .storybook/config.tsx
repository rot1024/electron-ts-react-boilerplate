import React from "react";
import { configure, addDecorator } from "@storybook/react";

import GlobalStyles from "../src/renderer/style";

const req = require.context("../src", true, /\.?stories\.tsx?$/);

addDecorator(storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
));

configure(() => {
  req.keys().forEach(filename => req(filename).default());
}, module);
