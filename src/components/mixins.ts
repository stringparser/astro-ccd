export const opacityMixin = {
  '@media (min-width: 1024px)': {
    opacity: .8,
    transition: 'opacity linear 0.3s',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },
  },
};

export const maxWidthMixin = {
  '@media (max-width: 960px)': {
    width: '100vw',
  },

  '@media (min-width: 1024px)': {
    width: '1024px',
  },
};