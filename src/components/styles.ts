export const opacityMixin = {
  opacity: .8,
  transition: 'opacity linear 0.3s',

  '&:hover': {
    opacity: 1,
  }
};

export const maxWidthMixin = {
  '@media (max-width: 960px)': {
    width: '100%',
  },

  '@media (min-width: 1024px)': {
    width: '1024px',
  },
};