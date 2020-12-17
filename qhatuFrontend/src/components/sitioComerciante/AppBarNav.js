import React from "react";
import MenuBar from "./MenuBar";
import ExtendedBar from "./ExtendBar";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";

function AppBarNav(props) {
  return (
    <div>
      <Hidden only={["xs"]}>
        <ExtendedBar></ExtendedBar>
      </Hidden>
      <Hidden only={["lg", "md", "sm", "xl"]}>
        <MenuBar></MenuBar>
      </Hidden>
    </div>
  );
}
AppBar.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};
export default withWidth()(AppBarNav);
