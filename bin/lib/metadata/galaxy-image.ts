import { PageItemProps } from "../types";

const SN_RE = /(?:^|_)sn-?([^\s-_]+)/i;
const IC_RE = /(?:^|[_\d-]+)ic[-_]?(\d+)/i;
const NGC_RE = /(?:^|[_\d-]+)ngc-?(\d+)/i;
const MESSIER_RE = /^m-?(\d+)/i;

const LOCATION_PROPS = {
  'SN 2014j': {
    id: 'SN 2014j',
    localizacion: 'M82'
  },
  'SN 2014jrgb': {
    id: 'SN 2014j',
    localizacion: 'M82'
  },
};

export function mapGalaxyImageMetadata(props: PageItemProps): PageItemProps {
  const { src, id } = props;

  if (
    /^(abel-2151|hubble_sequence_photo|20170506_200443)/.test(id)
    || src === 'https://astroccd.files.wordpress.com/2014/02/logodef.png'
  ) {
    return {
      ...props,
      id: 'Abell 2151',
      alias: 'Hercules Cluster',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2021/01/final.jpg') {
    return {
      ...props,
      id: '20210112-zona-orion',
      fecha: '20210112'
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2020/03/img-20200302-wa0019.jpg') {
    return {
      ...props,
      id: 'NGC 2024',
      fecha: '20190929',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/10/user_556_medusa_pa.jpg') {
    return {
      ...props,
      id: 'abel 21',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/11/comparativa.jpg') {
    return {
      ...props,
      id: 'S106',
      fecha: '20150715',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2018/08/1.png') {
    return {
      ...props,
      id: 'NGC 7000',
      fecha: '20180808',
      alias: 'Nebulosa del pelícano',
    };
  }

  if (id === 'integration_abe-copia') {
    return {
      ...props,
      id: 'NGC 2237',
      alias: 'Nebulosa Roseta'
    };
  }

  if (/^sn2020jfo/i.test(id)) {
    return {
      ...props,
      id: 'SN 2020jfo',
      localizacion: 'NGC 4303'
    };
  }

  if (/^(sn2019ein|snm51)/i.test(id)) {
    return {
      ...props,
      id: 'SN 2019ein',
      localizacion: 'NGC 5353'
    };
  }

  if (/^AT2019abn/i.test(id)) {
    return {
      ...props,
      id: 'AT2019abn',
    };
  }

  if (/^sn-?2019np/i.test(id)) {
    return {
      ...props,
      id: 'SN2019np',
      localizacion: 'NGC 3254',
    };
  }

  if (/^m51-?a?/i.test(id)) {
    return {
      ...props,
      id: 'NGC 5194',
      alias: 'M51',
    };
  }

  if (/^AT2019ahd/i.test(id) || src === 'https://astroccd.files.wordpress.com/2019/01/rgb.jpg') {
    return {
      ...props,
      id: 'AT2019ahd',
      localizacion: 'NGC 3423',
    };
  }

  if (/^(sn)?2018isq/i.test(id)) {
    return {
      ...props,
      id: 'SN2018isq',
    };
  }

  if (/^sn2018ivc/i.test(id)) {
    return {
      ...props,
      id: 'SN2018ivc',
      localizacion: 'M77'
    };
  }

  if (/^sn2018ivc/i.test(id)) {
    return {
      ...props,
      id: 'SN2018ivc',
    };
  }

  if (/^at2018gjx/.test(id)) {
    return {
      ...props,
      id: 'AT2018gjx',
    };
  }

  if (/^sn-?2018imf/.test(id)) {
    return {
      ...props,
      id: 'SN2018imf',
      localizacion: 'PGC 57660',
    };
  }

  if (/^sn-?2018cow/.test(id)) {
    return {
      ...props,
      id: 'SN 2018cow',
      localizacion: 'PGC 57660',
    };
  }

  if (/^(sn)?-?2018zd/.test(id)) {
    return {
      ...props,
      id: 'SN 2018zd',
      localizacion: 'NGC 2146',
    };
  }

  if (/^(at)?2018gv/i.test(id)) {
    return {
      ...props,
      id: 'AT 2018gv',
      localizacion: 'NGC 2525',
    };
  }

  if (/^(at)?-?2017eaw/i.test(id)) {
    return {
      ...props,
      id: 'AT 2017eaw',
      localizacion: 'NGC 6946',
    };
  }

  if (/^sn2017eax/i.test(id)) {
    return {
      ...props,
      id: 'SN 2017eax',
    };
  }

  if (/^2017dfc/i.test(id)) {
    return {
      ...props,
      id: 'SN 2017dfc',
    };
  }


  if (/^sn2016gfy/i.test(id)) {
    return {
      ...props,
      id: 'SN 2016gfy',
    };
  }

  if (id === 'm66m65_20160530_I88') {
    return {
      ...props,
      id: 'M66',
    }
  }

  if (/^sn2016coj/i.test(id)) {
    return {
      ...props,
      id: 'SN 2016coj',
      localizacion: 'NGC 4125'
    }
  }

  if (
    /^oj287/.test(id)
    || src === 'https://astroccd.files.wordpress.com/2012/12/oj287medidas.jpg'
    || src === 'https://astroccd.files.wordpress.com/2012/12/pulsar.jpg'
  ) {
    return {
      ...props,
      id: 'OJ287',
    };
  }

  if (
    src === 'https://astroccd.files.wordpress.com/2012/12/quinteto.png'
  ) {
    return {
      ...props,
      id: '20151115-quinteto'
    };
  }

  if (src === 'https://i0.wp.com/www.astrosurf.com/snweb2/images/rainbowl.gif') {
    return {
      ...props,
      id: 'SN 2005cs',
    };
  }

  if (id === 'sn2014dg_ugc2855_20141217') {
    return {
      ...props,
      id: 'SN 2014dg',
      localizacion: 'UGC 2855'
    }
  }

  if (id === 'psn-j220812434110503_ugc11919_sbc2014121512') {
    return {
      ...props,
      id: 'PSN J22081243+4110503',
      localizacion: 'UGC 11919',
    };
  }

  if (id === 'sn2014cy_20141018_gjcb1') {
    return {
      ...props,
      id: 'SN 2014CY',
      localizacion: 'NGC 7742',
    };
  }

  if (id === 'sn2014bv_20140714_i88-copia') {
    return {
      ...props,
      id: 'SN 2014bv',
      localizacion: 'NGC 4386',
    };
  }

  if (id === 'sn2014l_20140307_i88') {
    return {
      ...props,
      id: 'SN 2014l',
      localizacion: 'M99',
    }
  }

  if (id === 'sn2014g_20140202_i88') {
    return {
      ...props,
      id: 'SN 2013am',
      localizacion: 'NGC3448',
    }
  }

  if (id === 'm65-3-600s-2abril-2013') {
    return {
      ...props,
      id: 'SN 2014G',
      localizacion: 'M65',
    };
  }

  if (id === 'm66m65_20160530_i881') {
    return {
      ...props,
      id: 'SN 2016cok',
      localizacion: 'M66',
    };
  }

  if (id === 'psn-j172929187542390_ngc6412_20150715_i88') {
    return {
      ...props,
      id: 'PSN J17292918+7542390',
      localizacion: 'NGC 6412',
    };
  }

  if (id === 'psn-j172929187542390_ngc6412_20150715_i88') {
    return {
      ...props,
      id: 'PSN J20435314+1230304',
      localizacion: 'NGC 6956',
    };
  }

  if (id === 'psn-j204353141230304ngc6956') {
    return {
      ...props,
      id: 'PSN J20435314+1230304',
      localizacion: 'NGC 6956',
    };
  }

  if (id === 'psn-j072853873349106_ngc23882') {
    return {
      ...props,
      id: 'PSN J07285387+3349106',
      localizacion: 'NGC 23882',
    };
  }

  if (id === 'm101psn-j140216785426205') {
    return {
      ...props,
      id: 'PSN J14021678+5426205',
      localizacion: 'M101',
    };
  }

  if (id === 'pnv_-j030930632638031') {
    return {
      ...props,
      id: 'PNV J03093063+2638031',
      localizacion: 'Aries',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/11/rgbpix3.jpg') {
    return {
      ...props,
      id: 'M57',
    };
  }

  if (/^arp99$/.test(id)) {
    return {
      ...props,
      id: 'Arp 99',
      alias: 'NGC 7547/49/50/53/58, Hickson 93',
      localizacion: 'Pegaso',
    }
  }

  if (/^(sn)?2013fa/i.test(id)) {
    return {
      ...props,
      id: 'SN 2013fa',
      localizacion: 'Delfín'
    };
  }

  if (/^(sn)?2013am/i.test(id)) {
    return {
      ...props,
      id: 'SN 2013am',
      localizacion: 'M65'
    };
  }

  if (/^sn2014cx/.test(id)) {
    return {
      ...props,
      id: 'SN 2014cx',
    };
  }

  if (/^snhunt260/.test(id)) {
    return {
      ...props,
      id: 'SNhunt260',
    };
  }

  if (SN_RE.test(id)) {
    const value = (SN_RE.exec(id) || ['']).pop();
    const valueId = `SN ${value}`;

    return {
      ...props,
      id: valueId,
      ...LOCATION_PROPS[valueId],
    };
  }

  if (IC_RE.test(id)) {
    const value = (IC_RE.exec(id) || ['']).pop();
    const valueId = `IC ${value}`;

    return {
      ...props,
      id: valueId,
      ...LOCATION_PROPS[valueId],
    };
  }

  if (NGC_RE.test(id)) {
    const value = (NGC_RE.exec(id) || ['']).pop();
    return {
      ...props,
      id: `NGC ${value}`,
    };
  }

  if (MESSIER_RE.test(id)) {
    const value = (MESSIER_RE.exec(id) || ['']).pop();
    return {
      ...props,
      id: `M${value}`,
    };
  }

  return props;
};