import { PageItemProps } from "../types";

export function mapCometImageMetadata(props: PageItemProps): PageItemProps {
  const { src, urlId, objectId: id } = props;

  if (/^c?2020-?f3/i.test(id) || src === 'https://astroccd.files.wordpress.com/2020/07/re3.jpg') {
    return {
      ...props,
      nombre: 'C/2020 F3 (NEOWISE)',
      objectId: 'C/2020 F3',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/124cometa-c-reflecator-358-f5-12-enero-2007-iso-100-1-320s.jpg') {
    return {
      ...props,
      fecha: '20070112',
      urlId: '20070112-c2006-p1',
      nombre: 'C/2006 P1 (McNaught)',
      objectId: 'C/2006 P1',
    }
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/rgbpro_2.jpg') {
    return {
      ...props,
      nombre: 'C/2013 US10 (CATALINA)',
      objectId: 'C/2013 US10',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/tempel-dia-3-y-4-julio-2005.jpg') {
    return {
      ...props,
      fecha: '20070112',
      nombre: 'C/2006 P1 (McNaught)',
      objectId: 'C/2006 P1',
    }
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/124cometa-c2006p1-reflecator-358-f5-12-enero-2007-iso-100-1-320s.jpg') {
    return {
      ...props,
      fecha: '20070112',
      nombre: 'C/2006 P1 (McNaught)',
      objectId: 'C/2006 P1',
    }
  }

  if (/^c?2019-?y1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2019 Y1 (ATLAS)',
      objectId: 'C/2019 Y1',
    }
  }

  if (/^c?2019-?y4/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2019 Y4 (ATLAS)',
      objectId: 'C/2019 Y4',
    }
  }

  if (/^c?2017-?t2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2017 T2 (PANSTARRS)',
      objectId: 'C/2017 T2',
    };
  }

  if (/^c2018-?n2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2018 N2 (ASASSN)',
      objectId: 'C/2018 N2',
    };
  }

  if (/^2i-?borisov|^002i|^c2019q4/i.test(id)) {
    return {
      ...props,
      nombre: '2I/Borisov',
      objectId: '2I',
    };
  }

  if (/^260-?P/i.test(id)) {
    return {
      ...props,
      nombre: '260P/McNaught',
      objectId: '260P',
    };
  }

  if (/^6478(-gault)?/i.test(id) || /^11enero_8febrero/i.test(id)) {
    return {
      ...props,
      objectId: '(6478) Gault',
    };
  }

  if (/^60p(tsuchinshan)?/i.test(id)) {
    return {
      ...props,
      nombre: '60P/Tsuchinshan',
      objectId: '60P',
    };
  }

  if (/^38p_/i.test(id)) {
    return {
      ...props,
      nombre: '38P/Stephan-Oterma',
      objectId: '38P',
    }
  }

  if (/^46p_/i.test(id)) {
    return {
      ...props,
      nombre: '46P/Wirtanen',
      objectId: '46P',
    }
  }

  if (/^c?2018-?V1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2018 V1 (Machholz-Fujikawa-Iwamoto)',
      objectId: 'C/2018 V1',
    }
  }

  if (/^64p_/i.test(id)) {
    return {
      ...props,
      nombre: '64P/Swift-Gehrels',
      objectId: '64P',
    }
  }

  if (/^21-?p_/i.test(id)) {
    return {
      ...props,
      nombre: '21/P Giacobini-Zinner',
      objectId: '21P',
    };
  }

  if (/^c?2017-?s3/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2017 S3 (panstars)',
      objectId: 'C/2017 S3',
    }
  }

  if (/^c?2016-?r2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2016 R2 (PANSTARRS)',
      objectId: 'C/2016 R2',
    }
  }

  if (/^174p_/.test(id)) {
    return {
      ...props,
      nombre: '174P/ECHELUS',
      objectId: '174P',
    };
  }

  if (id === '2015v2_20171112_i88') {
    return {
      ...props,
      nombre: 'C/2015 V1 (PANSTARRS)',
      objectId: 'C/2015 V1',
    };
  }

  if (/^c?2015-?V2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2015 V2 (JOHNSON)',
      objectId: 'C/2015 V2',
    };
  }

  if (/^c?2015-?er61/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2015 ER61 (PANSTARRS)',
      objectId: 'C/2015 ER61',
    };
  }

  if (/^c?2017-?o1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2017 O1 (ASASSN1)',
      objectId: 'C/2017 O1',
    };
  }

  if (/^(00)?29p/i.test(id)) {
    return {
      ...props,
      nombre: '29P/Schwassmann-Wachmann',
      objectId: '29P',
    };
  }

  if (/^c?2015-?(O|0)1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2015 O1 (PANSTARRS)',
      objectId: 'C/2015 O1',
    };
  }

  if (/^(copia-de-)?c?2017-?k2(-PANSTARRS)?/i.test(id) || id === '20171' || id === '111111111111') {
    return {
      ...props,
      nombre: 'C/2017 K2 (PANSTARRS)',
      objectId: 'C/2017 K2',
    };
  }

  if (/^c?[-_]?2013-?US10/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2013 US10 (CATALINA)',
      objectId: 'C/2013 US10',
    };
  }

  if (/^c?[-_]?2013-?X1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2013 X1 (PANSTARRS)',
      objectId: 'C/2013 X1',
    };
  }

  if (/^c?[-_]?2014-?S2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2014 S2 (PANSTARRS)',
      objectId: 'C/2014 S2',
    };
  }

  if (/^c?[-_]?2015-?F4/i.test(id) || src === 'https://astroccd.files.wordpress.com/2012/12/20150913_i88.jpg') {
    return {
      ...props,
      nombre: 'C/2015 F4 (JACQUES)',
      objectId: 'C/2015 F4',
    };
  }

  if (/^c?[-_]?2014-?Q2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2014 Q2 (LOVEJOY)',
      objectId: 'C/2014 Q2',
    };
  }

  if (/^15p(_|\.)/i.test(id)) {
    return {
      ...props,
      nombre: '15P/Finlay',
      objectId: '15P',
    };
  }

  if (/^c?[-_]?2011-?J2/i.test(id) || id === 'c2014j2_1_20') {
    return {
      ...props,
      nombre: 'C/2011 J2 (LINEAR)',
      objectId: 'C/2011 J2',
    };
  }

  if (/^c?[-_]?2014-?E2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2014 E2 (JACQUES)',
      objectId: 'C/2014 E2',
    };
  }

  if (/^c?[-_]?2013-?UQ4/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2013 UQ4 (CATALINA)',
      objectId: 'C/2013 UQ4',
    };
  }

  if (/^c?[-_]?2012-?K1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2012 K1 (PANSTARRS)',
      objectId: 'C/2012 K1',
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
      objectId: 'C/2013 R1',
    };
  }

  if (
    /^(user_556_)?c?[-_]?2012-?S1/i.test(id)
    || src === 'https://i1.wp.com/iopscience.iop.org/img/i/apj-logo.gif'
    || id === 'user_556_6_enero_2012_c2012s1_30_100s_1357724375_527011'
  ) {
    return {
      ...props,
      fecha: '20131116',
      nombre: 'C/2012 S1 (ISON)',
      objectId: 'C/2012 S1',
    };
  }

  if (/^apophis-/.test(id)) {
    return {
      ...props,
      nombre: '99942 Apophis',
      objectId: '99942 Apophis',
    };
  }

  if (/^c?[-_]?2012-?K5/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2012 K5 (LINEAR)',
      objectId: 'C/2012 K5',
    };
  }

  if (/^(user_556_)?168P/i.test(id)) {
    return {
      ...props,
      nombre: '168P/Hergenrother',
      objectId: '168P',
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
      objectId: 'C/2011 L4',
    };
  }

  if (
    /c?2005[-_]?yu55/i.test(id)
    || src === 'https://astroccd.files.wordpress.com/2012/12/lulin-26-60s-l-pag-24fe-2009.jpg'
  ) {
    return {
      ...props,
      nombre: '2005 YU55 (308635)',
      objectId: '2005 YU55',
    };
  }

  if (/^lulin-26-60s/.test(id)) {
    return {
      ...props,
      nombre: 'C/2007 N3 (Lulin)',
      objectId: 'C/2007 N3',
    }
  }

  if (/^(11-18-2007-holmes-11|cometa-17p)/.test(id)) {
    return {
      ...props,
      nombre: '17P/Holmes',
      objectId: '17P',
    }
  }

  if (/^(m3-)?c?-?2006-?vz13/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2006 VZ13 (LINEAR)',
      objectId: 'C/2006 VZ13',
    }
  }

  if (/^(124cometa-)?c?-?2006-?p1/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2006 P1 (McNaught)',
      objectId: 'C/2006 P1',
    }
  }

  if (/^tempel-dia-3-y-4-julio-2005/i.test(id)) {
    return {
      ...props,
      nombre: '9P/Tempel 1',
      objectId: '9P',
    }
  }

  if (/^(mosaico-)?c?-?2001-?Q4/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2001 Q4 (NEAT)',
      objectId: 'C/2001 Q4',
    }
  }

  if (/^c?-?2002-?t7/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2002 T7 (LINEAR)',
      objectId: 'C/2002 T7',
    }
  }

  if (/^c?-?1996-?b2/i.test(id) || id === 'hyakutake_carta') {
    return {
      ...props,
      nombre: 'C/1996 B2 (Hyakutake)',
      objectId: 'C/1996 B2',
    }
  }

  if (/^c?-?2018-?n2/i.test(id)) {
    return {
      ...props,
      nombre: 'C/2018 N2 (ASASSN)',
      objectId: 'C/2018 N2',
    }
  }

  return props;
}