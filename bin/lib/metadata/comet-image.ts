import { ImageProps } from "../types";

export function mapCometImageMetadata(props: ImageProps): ImageProps {
  const { src, id } = props;

  if (/^c?2020f3/i.test(id) || src === 'https://astroccd.files.wordpress.com/2020/07/re3.jpg') {
    return {
      ...props,
      id: 'C/2020 F3',
      alias: 'neowise',
    };
  }

  if (/^c?2019-?y1/i.test(id)) {
    return {
      ...props,
      id: 'C/2019 Y1',
      alias: 'atlas',
    }
  }

  if (/^c?2019-?y4/i.test(id)) {
    return {
      ...props,
      id: 'C/2019 Y4',
      alias: 'atlas',
    }
  }

  if (/^c?2017-?t2/i.test(id)) {
    return {
      ...props,
      id: 'C/2017 T2',
      alias: 'panstarrs'
    };
  }

  if (/^c2018-?n2/i.test(id)) {
    return {
      ...props,
      id: 'C/2018 N2',
      alias: 'asassn'
    };
  }

  if (/^2i-?borisov|^002i|^c2019q4/i.test(id)) {
    return {
      ...props,
      id: '2I',
      alias: 'Borisov',
    };
  }

  if (/^260-?P/i.test(id)) {
    return {
      ...props,
      id: '260P',
      alias: 'McNaught',
    };
  }

  if (/^6478(-gault)?/i.test(id) || /^11enero_8febrero/i.test(id)) {
    return {
      ...props,
      id: '(6478) Gault',
    };
  }

  if (/^60p(tsuchinshan)?/i.test(id)) {
    return {
      ...props,
      id: '60P',
      alias: 'Tsuchinshan',
    };
  }

  if (/^38p_/i.test(id)) {
    return {
      ...props,
      id: '38P',
      alias: 'Stephan-Oterma',
    }
  }

  if (/^46p_/i.test(id)) {
    return {
      ...props,
      id: '46P',
      alias: 'Wirtanen',
    }
  }

  if (/^c?2018-?V1/i.test(id)) {
    return {
      ...props,
      id: 'C/2018 V1',
      alias: 'Machholz-Fujikawa-Iwamoto',
    }
  }

  if (/^64p_/i.test(id)) {
    return {
      ...props,
      id: '64P',
      alias: 'Swift-Gehrels',
    }
  }

  if (/^21-?p_/i.test(id)) {
    return {
      ...props,
      id: '21P',
      alias: 'Giacobini-Zinner'
    };
  }

  if (/^c?2017-?s3/i.test(id)) {
    return {
      ...props,
      id: 'C/2017 S3',
      alias: 'panstars',
    }
  }

  if (/^c?2016-?r2/i.test(id)) {
    return {
      ...props,
      id: 'C/2016 R2',
      alias: 'panstars',
    }
  }

  if (/^174p_/.test(id)) {
    return {
      ...props,
      id: '174P',
      alias: 'ECHELUS'
    };
  }

  if (/^c?2015-?V2/i.test(id)) {
    return {
      ...props,
      id: 'C/2015 V2',
      alias: 'JOHNSON'
    };
  }

  if (/^c?2015-?er61/i.test(id)) {
    return {
      ...props,
      id: 'C/2015 ER61',
      alias: 'PANSTARRS'
    };
  }

  if (/^c?2017-?o1/i.test(id)) {
    return {
      ...props,
      id: 'C/2017 O1',
      alias: 'ASASSN1'
    };
  }

  if (/^(00)?29p/i.test(id)) {
    return {
      ...props,
      id: '29P',
      alias: 'Schwassmann-Wachmann'
    };
  }

  if (/^c?2015-?01/i.test(id)) {
    return {
      ...props,
      id: 'C/2015 O1',
      alias: 'PANSTARRS'
    };
  }

  if (/^(copia-de-)?c?2017-?k2(-panstarrs)?/i.test(id) || id === '20171' || id === '111111111111') {
    return {
      ...props,
      id: 'C/2017 K2',
      alias: 'PANSTARRS'
    };
  }

  if (/^c?[-_]?2013-?US10/i.test(id)) {
    return {
      ...props,
      id: 'C/2013 US10',
      alias: 'CATALINA'
    };
  }

  if (/^c?[-_]?2013-?X1/i.test(id)) {
    return {
      ...props,
      id: 'C/2013 X1',
      alias: 'PANSTARRS'
    };
  }

  if (/^c?[-_]?2014-?S2/i.test(id)) {
    return {
      ...props,
      id: 'C/2014 S2',
      alias: 'PANSTARRS'
    };
  }

  if (/^c?[-_]?2015-?F4/i.test(id)) {
    return {
      ...props,
      id: 'C/2015 F4',
      alias: 'JACQUES'
    };
  }

  if (/^c?[-_]?2014-?Q2/i.test(id)) {
    return {
      ...props,
      id: 'C/2014 Q2',
      alias: 'LOVEJOY'
    };
  }

  if (/^15p(_|\.)/i.test(id)) {
    return {
      ...props,
      id: '15P',
      alias: 'Finlay'
    };
  }

  if (/^c?[-_]?2011-?J2/i.test(id) || id === 'c2014j2_1_20') {
    return {
      ...props,
      id: 'C/2011 J2',
      alias: 'LINEAR'
    };
  }

  if (/^c?[-_]?2014-?E2/i.test(id)) {
    return {
      ...props,
      id: 'C/2014 E2',
      alias: 'JACQUES'
    };
  }

  if (/^c?[-_]?2013-?UQ4/i.test(id)) {
    return {
      ...props,
      id: 'C/2013 UQ4',
      alias: 'CATALINA'
    };
  }

  if (/^c?[-_]?2012-?K1/i.test(id)) {
    return {
      ...props,
      id: 'C/2012 K1',
      alias: 'PANSTARRS'
    };
  }

  if (/^c?[-_]?2013-?R1/i.test(id) || src === 'https://astroccd.files.wordpress.com/2012/12/procesado.jpg') {
    return {
      ...props,
      id: 'C/2013 R1',
      alias: 'LOVEJOY'
    };
  }

  if (/^(user_556_)?c?[-_]?2012-?S1/i.test(id)) {
    return {
      ...props,
      id: 'C/2012 S1',
      alias: 'ISON'
    };
  }

  if (/^apophis-/.test(id)) {
    return {
      ...props,
      id: '99942',
      alias: 'Apophis'
    };
  }

  if (/^c?[-_]?2012-?K5/i.test(id)) {
    return {
      ...props,
      id: 'C/2012 K5',
      alias: 'LINEAR'
    };
  }

  if (/^(user_556_)?168P/i.test(id)) {
    return {
      ...props,
      id: '168P',
      alias: 'Hergenrother'
    };
  }

  if (/^(user_556_)?c?[-_]?2011-?L4/i.test(id)) {
    return {
      ...props,
      id: 'C/2011 L4',
      alias: 'PANSTARRS'
    };
  }

  if (/^2005yu55/.test(id)) {
    return {
      ...props,
      id: '(308635) 2005 YU55',
    };
  }

  if (/^lulin-26-60s/.test(id)) {
    return {
      ...props,
      id: 'C/2007 N3',
      alias: 'Lulin'
    }
  }

  if (/^(11-18-2007-holmes-11|cometa-17p)/.test(id)) {
    return {
      ...props,
      id: '17P',
      alias: 'Holmes'
    }
  }

  if (/^(m3-)?c?-?2006-?vz13/i.test(id)) {
    return {
      ...props,
      id: 'C/2006 VZ13',
      alias: 'LINEAR'
    }
  }

  if (/^(124cometa-)?c?-?2006-?p1/i.test(id)) {
    return {
      ...props,
      id: 'C/2006 P1',
      alias: 'McNaught'
    }
  }

  if (/^tempel-dia-3-y-4-julio-2005/i.test(id)) {
    return {
      ...props,
      id: '9P',
      alias: 'Tempel 1'
    }
  }

  if (/^(mosaico-)?c?-?2001-?Q4/i.test(id)) {
    return {
      ...props,
      id: 'C/2001 Q4',
      alias: 'NEAT',
    }
  }

  if (/^c?-?2002-?t7/i.test(id)) {
    return {
      ...props,
      id: 'C/2002 T7',
      alias: 'LINEAR',
    }
  }

  if (/^c?-?1996-?b2/i.test(id) || id === 'hyakutake_carta') {
    return {
      ...props,
      id: 'C/1996 B2',
      alias: 'Hyakutake',
    }
  }

  return props;
}