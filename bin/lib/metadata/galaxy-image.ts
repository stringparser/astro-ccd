import { ImageProps } from "../types";

const SN_RE = /(?:^|_)sn-?([^\s-_]+)/i;
const IC_RE = /(?:^|[_\d-]+)ic[-_]?(\d+)/i;
const NGC_RE = /(?:^|[_\d-]+)ngc-?(\d+)/i;
const MESSIER_RE = /^m-?(\d+)/i;

const LOCATION_PROPS = {
  'SN 2014j': {
    _id: 'SN 2014j',
    localizacion: 'M82'
  },
  'SN 2014jrgb': {
    _id: 'SN 2014j',
    localizacion: 'M82'
  },
};

export function mapGalaxyImageMetadata(props: ImageProps): ImageProps {
  const { src, _id } = props;

  if (/^(abel-2151|hubble_sequence_photo|20170506_200443)/.test(_id)) {
    return {
      ...props,
      _id: 'Abell 2151',
      alias: 'Hercules Cluster',
    };
  }

  if (/^sn2020jfo/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2020jfo',
      localizacion: 'NGC 4303'
    }
  }

  if (/^(sn2019ein|snm51)/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2019ein',
      localizacion: 'NGC 5353'
    }
  }

  if (/^AT2019abn/i.test(_id)) {
    return {
      ...props,
      _id: 'AT2019abn',
    }
  }

  if (/^sn-?2019np/i.test(_id)) {
    return {
      ...props,
      _id: 'SN2019np',
      localizacion: 'NGC 3254',
    };
  }

  if (/^m51-?a?/i.test(_id)) {
    return {
      ...props,
      _id: 'NGC 5194',
      alias: 'M51',
    };
  }

  if (/^AT2019ahd/i.test(_id) || src === 'https://astroccd.files.wordpress.com/2019/01/rgb.jpg') {
    return {
      ...props,
      _id: 'AT2019ahd',
      localizacion: 'NGC 3423',
    };
  }

  if (/^(sn)?2018isq/i.test(_id)) {
    return {
      ...props,
      _id: 'SN2018isq',
    };
  }

  if (/^sn2018ivc/i.test(_id)) {
    return {
      ...props,
      _id: 'SN2018ivc',
      localizacion: 'M77'
    };
  }

  if (/^sn2018ivc/i.test(_id)) {
    return {
      ...props,
      _id: 'SN2018ivc',
    };
  }

  if (/^at2018gjx/.test(_id)) {
    return {
      ...props,
      _id: 'AT2018gjx',
    };
  }

  if (/^sn-?2018imf/.test(_id)) {
    return {
      ...props,
      _id: 'SN2018imf',
      localizacion: 'PGC 57660',
    };
  }

  if (/^sn-?2018cow/.test(_id)) {
    return {
      ...props,
      _id: 'SN 2018cow',
      localizacion: 'PGC 57660',
    };
  }

  if (/^(sn)?-?2018zd/.test(_id)) {
    return {
      ...props,
      _id: 'SN 2018zd',
      localizacion: 'NGC 2146',
    };
  }

  if (/^(at)?2018gv/i.test(_id)) {
    return {
      ...props,
      _id: 'AT 2018gv',
      localizacion: 'NGC 2525',
    };
  }

  if (/^(at)?-?2017eaw/i.test(_id)) {
    return {
      ...props,
      _id: 'AT 2017eaw',
      localizacion: 'NGC 6946',
    };
  }

  if (/^sn2017eax/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2017eax',
    };
  }

  if (/^2017dfc/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2017dfc',
    };
  }


  if (/^sn2016gfy/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2016gfy',
    };
  }

  if (_id === 'm66m65_20160530_I88') {
    return {
      ...props,
      _id: 'M66',
    }
  }

  if (/^sn2016coj/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2016coj',
      localizacion: 'NGC 4125'
    }
  }

  if (/^oj287/.test(_id) || src === 'https://astroccd.files.wordpress.com/2012/12/oj287medidas.jpg') {
    return {
      ...props,
      _id: 'OJ287',
    };
  }

  if (_id === 'sn2014dg_ugc2855_20141217') {
    return {
      ...props,
      _id: 'SN 2014dg',
      localizacion: 'UGC 2855'
    }
  }

  if (_id === 'psn-j220812434110503_ugc11919_sbc2014121512') {
    return {
      ...props,
      _id: 'PSN J22081243+4110503',
      localizacion: 'UGC 11919',
    };
  }

  if (_id === 'sn2014cy_20141018_gjcb1') {
    return {
      ...props,
      _id: 'SN 2014CY',
      localizacion: 'NGC 7742',
    };
  }

  if (_id === 'sn2014bv_20140714_i88-copia') {
    return {
      ...props,
      _id: 'SN 2014bv',
      localizacion: 'NGC 4386',
    };
  }

  if (_id === 'sn2014l_20140307_i88') {
    return {
      ...props,
      _id: 'SN 2014l',
      localizacion: 'M99',
    }
  }

  if (_id === 'sn2014g_20140202_i88') {
    return {
      ...props,
      _id: 'SN 2013am',
      localizacion: 'NGC3448',
    }
  }

  if (_id === 'm65-3-600s-2abril-2013') {
    return {
      ...props,
      _id: 'SN 2014G',
      localizacion: 'M65',
    };
  }

  if (_id === 'm66m65_20160530_i881') {
    return {
      ...props,
      _id: 'SN 2016cok',
      localizacion: 'M66',
    };
  }

  if (_id === 'psn-j172929187542390_ngc6412_20150715_i88') {
    return {
      ...props,
      _id: 'PSN J17292918+7542390',
      localizacion: 'NGC 6412',
    };
  }

  if (_id === 'psn-j172929187542390_ngc6412_20150715_i88') {
    return {
      ...props,
      _id: 'PSN J20435314+1230304',
      localizacion: 'NGC 6956',
    };
  }

  if (_id === 'psn-j204353141230304ngc6956') {
    return {
      ...props,
      _id: 'PSN J20435314+1230304',
      localizacion: 'NGC 6956',
    };
  }

  if (_id === 'psn-j072853873349106_ngc23882') {
    return {
      ...props,
      _id: 'PSN J07285387+3349106',
      localizacion: 'NGC 23882',
    };
  }

  if (_id === 'm101psn-j140216785426205') {
    return {
      ...props,
      _id: 'PSN J14021678+5426205',
      localizacion: 'M101',
    };
  }

  if (_id === 'pnv_-j030930632638031') {
    return {
      ...props,
      _id: 'PNV J03093063+2638031',
      localizacion: 'Aries',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/11/rgbpix3.jpg') {
    return {
      ...props,
      _id: 'M57',
    };
  }

  if (/^arp99$/.test(_id)) {
    return {
      ...props,
      _id: 'Arp 99',
      alias: 'NGC 7547/49/50/53/58, Hickson 93',
      localizacion: 'Pegaso',
    }
  }

  if (/^(sn)?2013fa/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2013fa',
      localizacion: 'Delfín'
    };
  }

  if (/^(sn)?2013am/i.test(_id)) {
    return {
      ...props,
      _id: 'SN 2013am',
      localizacion: 'M65'
    };
  }

  if (/^sn2014cx/.test(_id)) {
    return {
      ...props,
      _id: 'SN 2014cx',
    };
  }

  if (/^snhunt260/.test(_id)) {
    return {
      ...props,
      _id: 'SNhunt260',
    };
  }

  if (SN_RE.test(_id)) {
    const value = (SN_RE.exec(_id) || ['']).pop();
    const valueId = `SN ${value}`;

    return {
      ...props,
      _id: valueId,
      ...LOCATION_PROPS[valueId],
    };
  }

  if (IC_RE.test(_id)) {
    const value = (IC_RE.exec(_id) || ['']).pop();
    const valueId = `IC ${value}`;

    return {
      ...props,
      _id: valueId,
      ...LOCATION_PROPS[valueId],
    };
  }

  if (NGC_RE.test(_id)) {
    const value = (NGC_RE.exec(_id) || ['']).pop();
    return {
      ...props,
      _id: `NGC ${value}`,
    };
  }

  if (MESSIER_RE.test(_id)) {
    const value = (MESSIER_RE.exec(_id) || ['']).pop();
    return {
      ...props,
      _id: `M${value}`,
    };
  }

  return props;
};