import { Box, makeStyles } from "@material-ui/core";
import { memo, useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',

    padding: '0.5rem 1.25rem',
    marginTop: '1rem',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}))

const DisqusEmbedPlaceholder = memo(() => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div id="disqus_thread" style={{marginTop: '1rem'}}></div>
    </Box>
  );
});

export type DisqusEmbedProps = {
  url?: string;
  title?: string;
  language?: string;
  identifier?: string;
};

const DisqusEmbed: React.FC<DisqusEmbedProps> = (props) => {
  const [isInstalled, setInstalled] = useState(false);

  if (typeof window === 'undefined' || isInstalled) {
    return <DisqusEmbedPlaceholder />;
  }

  // @ts-ignore
  window.disqus_config = function () {
    setInstalled(true);

    Object.assign(this.page, {
      url: window.location.href,
      language: 'es',
      title: document.title,
      identifier: location.pathname,
      ...props,
    });
  };

  (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://astro-ccd.disqus.com/embed.js';
    s.setAttribute('data-language', 'es');
    s.setAttribute('data-timestamp', `${new Date()}`);
    (d.head || d.body).appendChild(s);
  })();

  return <DisqusEmbedPlaceholder />;
}



export default DisqusEmbed;