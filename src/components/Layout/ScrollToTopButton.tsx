import React from "react";
import ScrollToTop from "react-scroll-up";

import IconButton from "@material-ui/core/IconButton/IconButton";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ScrollToTopButton: React.FC = () => (
  <ScrollToTop showUnder={160}>
    <IconButton style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
      <KeyboardArrowUpIcon />
    </IconButton>
  </ScrollToTop>
);


export default ScrollToTopButton;