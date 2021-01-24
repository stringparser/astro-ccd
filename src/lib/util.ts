export const mesMap = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  ago: '08',
  agosto: '08',
  Aagosto: '08',
  sep: '09',
  septiembre: '09',
  ocubre: '10',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

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