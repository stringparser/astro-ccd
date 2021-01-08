import { Box } from "@material-ui/core";
import { memo, useState } from "react";

const DisqusEmbedPlaceholder = memo(() => (
  <Box mt="1rem">
      <div id="disqus_thread" style={{marginTop: '1rem'}}></div>
  </Box>
));

export type DisqusEmbedProps = {
  url?: string;
  title?: string;
  language?: string;
  identifier?: string;
};

const DisqusEmbed: React.FC<DisqusEmbedProps> = (props) => {
  const [isInstalled, setInstalled] = useState(false);

  if (typeof window === 'undefined' ||isInstalled) {
    return <DisqusEmbedPlaceholder />;
  }

  // @ts-ignore
  window.disqus_config = function () {
    console.log('setting discuss config', props);
    setInstalled(true);
    Object.assign(this.page, {
      url: window.location.href,
      language: 'es',
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