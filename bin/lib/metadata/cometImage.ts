import { PageBasename, PageItemProps } from "../../../types";

export function mapCometImageMetadata(props: PageItemProps): PageItemProps {
  const { src, type, text, objeto: id } = props;

  if (
    text
    && /www\.minorplanetcenter\.net\/iau\/lists\/ObsCodesF\.html/i.test(text)
  ) {
    return {
      ...props,
      urlId: PageBasename.cometasAsteroides,
    };
  }

  // if (
  //   text
  //   && type === 'header'
  //   && /drive\.google\.com\/open\?id=0B9X-aeZtOZTwby1Kc05SZnhQMnc/.test(text)
  // ) {

  //   return {
  //     ...props,
  //     urlId: 'c2017-k2',
  //     fecha: '20170724',
  //     objeto: 'C/2017 K2',
  //   }
  // }

  if (
    /^c?[-_]?2014-?Q2/i.test(id)
    || /video-5.png/.test(src)
    // || text && type === 'header' && text.includes('0B9X-aeZtOZTwOUF2MlkwQWVoaG8')
  ) {

    return {
      ...props,
      urlId: 'c2014-q2',
      nombre: 'C/2014 Q2 (LOVEJOY)',
      objeto: 'C/2014 Q2',
    };
  }

  if (!type || type !== 'image') {
    return props;
  }

  if (
    src === 'https://astroccd.files.wordpress.com/2018/04/c2015o1_20170816_i88.jpg'
  ) {
    return {
      ...props,

      fecha: '20170816',
      objeto: 'C/2015 O1',
      nombre: 'C/2015 O1 (PANSTARS)',
    };
  }

  if (
    id === '2015-o1_20180416_i88'
    || id === 'c2015o1_20170816_i88'
  ) {
    return {
      ...props,
      objeto: 'C/2015 O1',
      nombre: 'C/2015 O1 (PANSTARRS)',
    };
  }

  if (/^c?2020-?f3/i.test(id) || src === 'https://astroccd.files.wordpress.com/2020/07/re3.jpg') {
    return {
      ...props,
      nombre: 'C/2020 F3 (NEOWISE)',
      objeto: 'C/2020 F3',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/124cometa-c-reflecator-358-f5-12-enero-2007-iso-100-1-320s.jpg') {
    return {
      ...props,
      fecha: '20070112',
      nombre: 'C/2006 P1 (McNaught)',
      objeto: 'C/2006 P1',
    }
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/rgbpro_2.jpg') {
    return {
      ...props,
      nombre: 'C/2013 US10 (CATALINA)',
      objeto: 'C/2013 US10',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/tempel-dia-3-y-4-julio-2005.jpg') {
    return {
      ...props,
      fecha: '20070112',
      nombre: 'C/2006 P1 (McNaught)',
      objeto: 'C/2006 P1',
    }
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/124cometa-c2006p1-reflecator-358-f5-12-enero-2007-iso-100-1-320s.jpg') {
    return {
      ...props,
      fecha: '20070112',
      nombre: 'C/2006 P1 (McNaught)',
      objeto: 'C/2006 P1',
    }
  }

  if (/^c?2019-?y1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2019 Y1 (ATLAS)',
      objeto: 'C/2019 Y1',
    }
  }

  if (/^c?2019-?y4/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2019 Y4 (ATLAS)',
      objeto: 'C/2019 Y4',
    }
  }

  if (/^c?2017-?t2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2017 T2 (PANSTARRS)',
      objeto: 'C/2017 T2',
    };
  }

  if (/^c2018-?n2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2018 N2 (ASASSN)',
      objeto: 'C/2018 N2',
    };
  }

  if (/^2i-?borisov|^002i|^c2019q4/i.test(id)) {
    return {
      ...props,
      nombre: '2I/Borisov',
      objeto: '2I',
    };
  }

  if (/^260-?P/i.test(id)) {
    return {
      ...props,
      nombre: '260P/McNaught',
      objeto: '260P',
    };
  }

  if (/^6478(-gault)?/i.test(id) || /^11enero_8febrero/i.test(id)) {
    return {
      ...props,
      objeto: '(6478) Gault',
    };
  }

  if (/^60p(tsuchinshan)?/i.test(id)) {
    return {
      ...props,
      nombre: '60P/Tsuchinshan',
      objeto: '60P',
    };
  }

  if (/^38p_/i.test(id)) {
    return {
      ...props,
      nombre: '38P/Stephan-Oterma',
      objeto: '38P',
    }
  }

  if (/^46p_/i.test(id)) {
    return {
      ...props,
      nombre: '46P/Wirtanen',
      objeto: '46P',
    }
  }

  if (/^c?2018-?V1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2018 V1 (Machholz-Fujikawa-Iwamoto)',
      objeto: 'C/2018 V1',
    }
  }

  if (/^64p_/i.test(id)) {
    return {
      ...props,
      nombre: '64P/Swift-Gehrels',
      objeto: '64P',
    }
  }

  if (/^21-?p_/i.test(id)) {
    return {
      ...props,
      nombre: '21P/Giacobini-Zinner',
      objeto: '21P',
    };
  }

  if (/^c?2017-?s3/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2017 S3 (panstars)',
      objeto: 'C/2017 S3',
    }
  }

  if (
    /^c?2016-?r2/i.test(id)
    || /grafe\.jpg/.test(src)
  ) {
    return {
      ...props,
      nombre: 'C/2016 R2 (PANSTARRS)',
      objeto: 'C/2016 R2',
    }
  }

  if (/^174p_/.test(id)) {
    return {
      ...props,
      nombre: '174P/ECHELUS',
      objeto: '174P',
    };
  }

  if (id === '2015v2_20171112_i88') {
    return {
      ...props,
      nombre: 'C/2015 V1 (PANSTARRS)',
      objeto: 'C/2015 V1',
    };
  }

  if (/^c?2015-?V2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2015 V2 (JOHNSON)',
      objeto: 'C/2015 V2',
    };
  }

  if (/^c?2015-?er61/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2015 ER61 (PANSTARRS)',
      objeto: 'C/2015 ER61',
    };
  }

  if (/^c?2017-?o1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2017 O1 (ASASSN1)',
      objeto: 'C/2017 O1',
    };
  }

  if (
    /^(00)?29p/i.test(id)
    || src === 'https://astroccd.files.wordpress.com/2012/12/29p.jpg'
  ) {
    return {
      ...props,
      nombre: '29P/Schwassmann-Wachmann',
      objeto: '29P',
    };
  }

  if (/^c?2015-?(O|0)1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2015 O1 (PANSTARRS)',
      objeto: 'C/2015 O1',
    };
  }

  if (/^(copia-de-)?c?2017-?k2(-PANSTARRS)?/i.test(id) || id === '20171' || id === '111111111111') {
    return {
      ...props,
      nombre: 'C/2017 K2 (PANSTARRS)',
      objeto: 'C/2017 K2',
    };
  }

  if (/^c?[-_]?2013-?US10/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2013 US10 (CATALINA)',
      objeto: 'C/2013 US10',
    };
  }

  if (/^c?[-_]?2013-?X1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2013 X1 (PANSTARRS)',
      objeto: 'C/2013 X1',
    };
  }

  if (/^c?[-_]?2014-?S2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2014 S2 (PANSTARRS)',
      objeto: 'C/2014 S2',
    };
  }

  if (/^c?[-_]?2015-?F4/i.test(id) || src === 'https://astroccd.files.wordpress.com/2012/12/20150913_i88.jpg') {
    return {
      ...props,
      nombre: 'C/2015 F4 (JACQUES)',
      objeto: 'C/2015 F4',
    };
  }

  if (/^15p(_|\.)/i.test(id)) {
    return {
      ...props,
      nombre: '15P/Finlay',
      objeto: '15P',
    };
  }

  if (/^c?[-_]?2011-?J2/i.test(id) || id === 'c2014j2_1_20') {
    return {
      ...props,
      nombre: 'C/2011 J2 (LINEAR)',
      objeto: 'C/2011 J2',
    };
  }

  if (/^c?[-_]?2014-?E2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2014 E2 (JACQUES)',
      objeto: 'C/2014 E2',
    };
  }

  if (/^c?[-_]?2013-?UQ4/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2013 UQ4 (CATALINA)',
      objeto: 'C/2013 UQ4',
    };
  }

  if (/^c?[-_]?2012-?K1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2012 K1 (PANSTARRS)',
      objeto: 'C/2012 K1',
    };
  }

  if (
    /^c?[-_]?2013-?R1/i.test(id)
    || src === 'https://astroccd.files.wordpress.com/2012/12/procesado.jpg'
    || id === '15-febrero-2013-201da12-20-10-5-2-1'
  ) {
    return {
      ...props,
      nombre: 'C/2013 R1 (LOVEJOY)',
      objeto: 'C/2013 R1',
    };
  }

  if (
    /^(user_556_)?c?[-_]?2012-?S1/i.test(id)
    || src === 'https://i1.wp.com/iopscience.iop.org/img/i/apj-logo.gif'
    || id === 'user_556_6_enero_2012_c2012s1_30_100s_1357724375_527011'
  ) {
    return {
      ...props,
      nombre: 'C/2012 S1 (ISON)',
      objeto: 'C/2012 S1',
    };
  }

  if (/^apophis-/.test(id)) {
    return {
      ...props,
      nombre: '99942 Apophis',
      objeto: '99942 Apophis',
    };
  }

  if (/^c?[-_]?2012-?K5/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2012 K5 (LINEAR)',
      objeto: 'C/2012 K5',
    };
  }

  if (/^(user_556_)?168P/i.test(id)) {
    return {
      ...props,
      nombre: '168P/Hergenrother',
      objeto: '168P',
    };
  }

  if (
    /^(user_556_)?c?[-_]?2011-?L4/i.test(id)
    || id === 'user_556_c2011_l4pa_15_julio2012_1342515487_708930'
    || src === 'https://astroccd.files.wordpress.com/2012/11/obras_031.gif'
  ) {
    return {
      ...props,
      nombre: 'C/2011 L4 (PANSTARRS)',
      objeto: 'C/2011 L4',
    };
  }

  if (
    /c?2005[-_]?yu55/i.test(id)
    || src === 'https://astroccd.files.wordpress.com/2012/12/lulin-26-60s-l-pag-24fe-2009.jpg'
  ) {
    return {
      ...props,
      nombre: '2005 YU55 (308635)',
      objeto: '2005 YU55',
    };
  }

  if (/^lulin-26-60s/.test(id)) {
    return {
      ...props,
      nombre: 'C/2007 N3 (Lulin)',
      objeto: 'C/2007 N3',
    }
  }

  if (/^(11-18-2007-holmes-11|cometa-17p)/.test(id)) {
    return {
      ...props,
      nombre: '17P/Holmes',
      objeto: '17P',
    }
  }

  if (/^(m3-)?c?-?2006-?vz13/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2006 VZ13 (LINEAR)',
      objeto: 'C/2006 VZ13',
    }
  }

  if (/^(124cometa-)?c?-?2006-?p1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2006 P1 (McNaught)',
      objeto: 'C/2006 P1',
    }
  }

  if (/^tempel-dia-3-y-4-julio-2005/i.test(id)) {
    return {
      ...props,
      nombre: '9P/Tempel 1',
      objeto: '9P',
    }
  }

  if (/^(mosaico-)?c?-?2001-?Q4/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2001 Q4 (NEAT)',
      objeto: 'C/2001 Q4',
    }
  }

  if (/^c?-?2002-?t7/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2002 T7 (LINEAR)',
      objeto: 'C/2002 T7',
    }
  }

  if (/^c?-?1996-?b2/i.test(id) || id === 'hyakutake_carta') {
    return {
      ...props,
      nombre: 'C/1996 B2 (Hyakutake)',
      objeto: 'C/1996 B2',
    }
  }

  if (/^c?-?2018-?n2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2018 N2 (ASASSN)',
      objeto: 'C/2018 N2',
    }
  }

  return props;
}