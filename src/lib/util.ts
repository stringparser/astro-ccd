export const mapTextToUrl = (input: string) => {

  const text =
    /aeztoztwby1kc05sznhqmnc/i.test(input) && 'c2017-k2' 
    || /aeZtOZTwOUF2MlkwQWVoaG8/i.test(input) && 'c2014-q2'
    || /youtu\.be\/po6as9H\-\_hk/i.test(input) && 'c2011-J2'
    || /29_2005_yu55/i.test(input) && '2005-yu55'
    || input
  ;

  return (text
    .replace(/[\/()]+/g, '')
    .trim()
    .replace(/[\s,._]+/g, '-')
    .replace(/^c/i, 'c')
    .replace(/^-|-$/g, '')
    .replace(/\+\d+$/, '')
    .toLowerCase()
    .replace(/^(at|sn)-?(\d+)-?(\S*)$/, '$1$2-$3')
    .replace(/^(?:cometa-?)?c?(\d{4})-?(\S{2}|\S{4})$/i, 'c$1-$2')
    .replace(/^(?:cometa-)?(\d+)(i|p)[-a-z0-9]*/i, ($0, $1: string, $2: string) => {
      if ($1 && $2) {
        return `${$1}${$2.toUpperCase()}`;
      }

      return $0;
    })
    .replace(/-[-]+/g, '-')
  );
};