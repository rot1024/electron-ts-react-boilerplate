import React from "react";
import { hot } from "react-hot-loader";

import GlobalStyles from "./style";

import Test from "./test";

const App: React.SFC = () => (
  <>
    <Test />
    <GlobalStyles />
  </>
);

export default hot(module)(App);
