import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button/Button";

import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link/Link";

import { PageBasename } from "src/types";

import { ClickAwayListener, Grow, makeStyles, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";

import { FOTOS_MENU_ID } from "./constants";
import { opacityMixin } from "../mixins";
import clsx from "clsx";

export const fotosMenuItems = [
  {
    href: `/${PageBasename.cometasAsteroides}`,
    text: 'Cometas y Asteroides',
  },
  {
    href: `/${PageBasename.galaxias}`,
    text: 'Galaxias y Supernovas',
  },
  {
    href: `/${PageBasename.nebulosas}`,
    text: 'Nebulosas',
  },
  {
    href: `/${PageBasename.sistemaSolar}`,
    text: 'Sistema Solar',
  },
];

const useStyles = makeStyles(theme => ({
  link: {
    padding: '0.5rem 0.75rem',

    '&:hover': {
      textDecoration: 'none',
    }
  },
  menuAnchor: {
    cursor: 'pointer',
  },
  menu: {
    zIndex: theme.zIndex.appBar,
  },
  menuItem: {
    padding: 0,
  },
}));

export type FotosMenuProps = {
  className?: string;
};

const FotosMenu: React.FC<FotosMenuProps> = ({ className }) => {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    const ref = anchorRef.current;

    if (ref && prevOpen.current === true && open === false) {
      ref.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <MuiLink
        ref={anchorRef}
        aria-haspopup="true"
        aria-controls={open ? FOTOS_MENU_ID : undefined}
        className={clsx(classes.menuAnchor, className)}
        onClick={handleToggle}
      >
        Fotos
      </MuiLink>
      <Popper
        open={open}
        role={undefined}
        anchorEl={anchorRef.current}
        className={classes.menu}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id={FOTOS_MENU_ID}
                  autoFocusItem={open}
                  onKeyDown={handleListKeyDown}
                >
                  {fotosMenuItems.map((el) => {
                    const { href, text } = el;
                    return (
                      <MenuItem
                        key={el.href}
                        className={classes.menuItem}
                      >
                        <NextLink
                          href={href}
                          passHref={true}
                        >
                          <MuiLink
                            variant="button"
                            className={classes.link}
                            onClick={handleClose}
                          >
                            {text}
                          </MuiLink>
                        </NextLink>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
};

export default FotosMenu;