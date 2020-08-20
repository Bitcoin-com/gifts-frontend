import React from 'react';
import { Flag } from '@bitcoin-portal/bitcoincom-pkg-components';

import bchLogo from '../../../../static/images/uploads/bch-square-green.png';
import bchLogoOldSchool from '../../../../static/images/uploads/bch-logo-oldschool.png';
import bchLogoEZ from '../../../../static/images/uploads/bch-logo-grey.png';

export const giftDesignOptions = [
  { image: bchLogo, value: 'default', label: 'Bitcoin.com' },
  {
    image: bchLogoOldSchool,
    value: 'throwback',
    label: 'Classic',
  },
  { image: bchLogoEZ, value: 'ezprint', label: 'Easy Print' },
];

export const currencies = [
  {
    value: 'BCH',
    label: 'BCH - Bitcoin Cash',
    image: bchLogo,
  },
  {
    value: 'AED',
    label: 'AED - UAE Dirham',
    image: <Flag country="ae" width={16} />,
  },
  {
    value: 'AFN',
    label: 'AFN - Afghan Afghani',
    image: <Flag country="af" width={16} />,
  },
  {
    value: 'ALL',
    label: 'ALL - Albanian Lek',
    image: <Flag country="al" width={16} />,
  },
  {
    value: 'AMD',
    label: 'AMD - Armenian Dram',
    image: <Flag country="am" width={16} />,
  },
  {
    value: 'ANG',
    label: 'ANG - Netherlands Antillean Guilder',
    image: <Flag country="nl" width={16} />,
  },
  {
    value: 'AOA',
    label: 'AOA - Angolan Kwanza',
    image: <Flag country="ao" width={16} />,
  },
  {
    value: 'ARS',
    label: 'ARS - Argentine Peso',
    image: <Flag country="ar" width={16} />,
  },
  {
    value: 'AUD',
    label: 'AUD - Australian Dollar',
    image: <Flag country="au" width={16} />,
  },
  {
    value: 'AWG',
    label: 'AWG - Aruban Florin',
    image: <Flag country="aw" width={16} />,
  },
  {
    value: 'AZN',
    label: 'AZN - Azerbaijani Manat',
    image: <Flag country="az" width={16} />,
  },
  {
    value: 'BAM',
    label: 'BAM - Bosnia-Herzegovina Convertible Mark',
    image: <Flag country="ba" width={16} />,
  },
  {
    value: 'BBD',
    label: 'BBD - Barbadian Dollar',
    image: <Flag country="bb" width={16} />,
  },
  {
    value: 'BDT',
    label: 'BDT - Bangladeshi Taka',
    image: <Flag country="bd" width={16} />,
  },
  {
    value: 'BGN',
    label: 'BGN - Bulgarian Lev',
    image: <Flag country="bg" width={16} />,
  },
  {
    value: 'BHD',
    label: 'BHD - Bahraini Dinar',
    image: <Flag country="bh" width={16} />,
  },
  {
    value: 'BIF',
    label: 'BIF - Burundian Franc',
    image: <Flag country="bi" width={16} />,
  },
  {
    value: 'BMD',
    label: 'BMD - Bermudan Dollar',
    image: <Flag country="bm" width={16} />,
  },
  {
    value: 'BND',
    label: 'BND - Brunei Dollar',
    image: <Flag country="bn" width={16} />,
  },
  {
    value: 'BOB',
    label: 'BOB - Bolivian Boliviano',
    image: <Flag country="bo" width={16} />,
  },
  {
    value: 'BRL',
    label: 'BRL - Brazilian Real',
    image: <Flag country="br" width={16} />,
  },
  {
    value: 'BSD',
    label: 'BSD - Bahamian Dollar',
    image: <Flag country="bs" width={16} />,
  },
  {
    value: 'BTN',
    label: 'BTN - Bhutanese Ngultrum',
    image: <Flag country="bt" width={16} />,
  },
  {
    value: 'BWP',
    label: 'BWP - Botswanan Pula',
    image: <Flag country="bw" width={16} />,
  },
  {
    value: 'BYR',
    label: 'BYR - Belarusian Ruble',
    image: <Flag country="by" width={16} />,
  },
  {
    value: 'BZD',
    label: 'BZD - Belize Dollar',
    image: <Flag country="bz" width={16} />,
  },
  {
    value: 'CAD',
    label: 'CAD - Canadian Dollar',
    image: <Flag country="ca" width={16} />,
  },
  {
    value: 'CDF',
    label: 'CDF - Congolese Franc',
    image: <Flag country="cd" width={16} />,
  },
  {
    value: 'CHF',
    label: 'CHF - Swiss Franc',
    image: <Flag country="ch" width={16} />,
  },
  {
    value: 'CLF',
    label: 'CLF - Chilean Unit of Account (UF)',
    image: <Flag country="cl" width={16} />,
  },
  {
    value: 'CLP',
    label: 'CLP - Chilean Peso',
    image: <Flag country="cl" width={16} />,
  },
  {
    value: 'CNY',
    label: 'CNY - Chinese Yuan',
    image: <Flag country="cn" width={16} />,
  },
  {
    value: 'COP',
    label: 'COP - Colombian Peso',
    image: <Flag country="co" width={16} />,
  },
  {
    value: 'CRC',
    label: 'CRC - Costa Rican Colón',
    image: <Flag country="cr" width={16} />,
  },
  {
    value: 'CUP',
    label: 'CUP - Cuban Peso',
    image: <Flag country="cu" width={16} />,
  },
  {
    value: 'CVE',
    label: 'CVE - Cape Verdean Escudo',
    image: <Flag country="cv" width={16} />,
  },
  {
    value: 'CZK',
    label: 'CZK - Czech Koruna',
    image: <Flag country="cz" width={16} />,
  },
  {
    value: 'DJF',
    label: 'DJF - Djiboutian Franc',
    image: <Flag country="dj" width={16} />,
  },
  {
    value: 'DKK',
    label: 'DKK - Danish Krone',
    image: <Flag country="dk" width={16} />,
  },
  {
    value: 'DOP',
    label: 'DOP - Dominican Peso',
    image: <Flag country="do" width={16} />,
  },
  {
    value: 'DZD',
    label: 'DZD - Algerian Dinar',
    image: <Flag country="dz" width={16} />,
  },
  {
    value: 'EEK',
    label: 'EEK - Estonian Kroon',
    image: <Flag country="ee" width={16} />,
  },
  {
    value: 'EGP',
    label: 'EGP - Egyptian Pound',
    image: <Flag country="eg" width={16} />,
  },
  {
    value: 'ETB',
    label: 'ETB - Ethiopian Birr',
    image: <Flag country="et" width={16} />,
  },
  {
    value: 'EUR',
    label: 'EUR - Eurozone Euro',
    image: <Flag country="eu" width={16} />,
  },
  {
    value: 'FJD',
    label: 'FJD - Fijian Dollar',
    image: <Flag country="fj" width={16} />,
  },
  {
    value: 'FKP',
    label: 'FKP - Falkland Islands Pound',
    image: <Flag country="fk" width={16} />,
  },
  {
    value: 'GBP',
    label: 'GBP - Pound Sterling',
    image: <Flag country="gb" width={16} />,
  },
  {
    value: 'GEL',
    label: 'GEL - Georgian Lari',
    image: <Flag country="ge" width={16} />,
  },
  {
    value: 'GHS',
    label: 'GHS - Ghanaian Cedi',
    image: <Flag country="gh" width={16} />,
  },
  {
    value: 'GIP',
    label: 'GIP - Gibraltar Pound',
    image: <Flag country="gi" width={16} />,
  },
  {
    value: 'GMD',
    label: 'GMD - Gambian Dalasi',
    image: <Flag country="gm" width={16} />,
  },
  {
    value: 'GNF',
    label: 'GNF - Guinean Franc',
    image: <Flag country="gn" width={16} />,
  },
  {
    value: 'GTQ',
    label: 'GTQ - Guatemalan Quetzal',
    image: <Flag country="gt" width={16} />,
  },
  {
    value: 'GYD',
    label: 'GYD - Guyanaese Dollar',
    image: <Flag country="gy" width={16} />,
  },
  {
    value: 'HKD',
    label: 'HKD - Hong Kong Dollar',
    image: <Flag country="hk" width={16} />,
  },
  {
    value: 'HNL',
    label: 'HNL - Honduran Lempira',
    image: <Flag country="hn" width={16} />,
  },
  {
    value: 'HRK',
    label: 'HRK - Croatian Kuna',
    image: <Flag country="hr" width={16} />,
  },
  {
    value: 'HTG',
    label: 'HTG - Haitian Gourde',
    image: <Flag country="ht" width={16} />,
  },
  {
    value: 'HUF',
    label: 'HUF - Hungarian Forint',
    image: <Flag country="hu" width={16} />,
  },
  {
    value: 'IDR',
    label: 'IDR - Indonesian Rupiah',
    image: <Flag country="id" width={16} />,
  },
  {
    value: 'ILS',
    label: 'ILS - Israeli Shekel',
    image: <Flag country="il" width={16} />,
  },
  {
    value: 'INR',
    label: 'INR - Indian Rupee',
    image: <Flag country="in" width={16} />,
  },
  {
    value: 'IQD',
    label: 'IQD - Iraqi Dinar',
    image: <Flag country="iq" width={16} />,
  },
  {
    value: 'IRR',
    label: 'IRR - Iranian Rial',
    image: <Flag country="ir" width={16} />,
  },
  {
    value: 'ISK',
    label: 'ISK - Icelandic Króna',
    image: <Flag country="is" width={16} />,
  },
  {
    value: 'JEP',
    label: 'JEP - Jersey Pound',
    image: <Flag country="je" width={16} />,
  },
  {
    value: 'JMD',
    label: 'JMD - Jamaican Dollar',
    image: <Flag country="jm" width={16} />,
  },
  {
    value: 'JOD',
    label: 'JOD - Jordanian Dinar',
    image: <Flag country="jo" width={16} />,
  },
  {
    value: 'JPY',
    label: 'JPY - Japanese Yen',
    image: <Flag country="jp" width={16} />,
  },
  {
    value: 'KES',
    label: 'KES - Kenyan Shilling',
    image: <Flag country="ke" width={16} />,
  },
  {
    value: 'KGS',
    label: 'KGS - Kyrgystani Som',
    image: <Flag country="kg" width={16} />,
  },
  {
    value: 'KHR',
    label: 'KHR - Cambodian Riel',
    image: <Flag country="kh" width={16} />,
  },
  {
    value: 'KMF',
    label: 'KMF - Comorian Franc',
    image: <Flag country="km" width={16} />,
  },
  {
    value: 'KPW',
    label: 'KPW - North Korean Won',
    image: <Flag country="kp" width={16} />,
  },
  {
    value: 'KRW',
    label: 'KRW - South Korean Won',
    image: <Flag country="kr" width={16} />,
  },
  {
    value: 'KWD',
    label: 'KWD - Kuwaiti Dinar',
    image: <Flag country="kw" width={16} />,
  },
  {
    value: 'KYD',
    label: 'KYD - Cayman Islands Dollar',
    image: <Flag country="ky" width={16} />,
  },
  {
    value: 'KZT',
    label: 'KZT - Kazakhstani Tenge',
    image: <Flag country="kz" width={16} />,
  },
  {
    value: 'LAK',
    label: 'LAK - Laotian Kip',
    image: <Flag country="la" width={16} />,
  },
  {
    value: 'LBP',
    label: 'LBP - Lebanese Pound',
    image: <Flag country="lb" width={16} />,
  },
  {
    value: 'LKR',
    label: 'LKR - Sri Lankan Rupee',
    image: <Flag country="lk" width={16} />,
  },
  {
    value: 'LRD',
    label: 'LRD - Liberian Dollar',
    image: <Flag country="lr" width={16} />,
  },
  {
    value: 'LSL',
    label: 'LSL - Lesotho Loti',
    image: <Flag country="ls" width={16} />,
  },
  {
    value: 'LTL',
    label: 'LTL - Lithuanian Litas',
    image: <Flag country="lt" width={16} />,
  },
  {
    value: 'LVL',
    label: 'LVL - Latvian Lats',
    image: <Flag country="lv" width={16} />,
  },
  {
    value: 'LYD',
    label: 'LYD - Libyan Dinar',
    image: <Flag country="ly" width={16} />,
  },
  {
    value: 'MAD',
    label: 'MAD - Moroccan Dirham',
    image: <Flag country="ma" width={16} />,
  },
  {
    value: 'MDL',
    label: 'MDL - Moldovan Leu',
    image: <Flag country="md" width={16} />,
  },
  {
    value: 'MGA',
    label: 'MGA - Malagasy Ariary',
    image: <Flag country="mg" width={16} />,
  },
  {
    value: 'MKD',
    label: 'MKD - Macedonian Denar',
    image: <Flag country="mk" width={16} />,
  },
  {
    value: 'MMK',
    label: 'MMK - Myanma Kyat',
    image: <Flag country="mm" width={16} />,
  },
  {
    value: 'MNT',
    label: 'MNT - Mongolian Tugrik',
    image: <Flag country="mn" width={16} />,
  },
  {
    value: 'MOP',
    label: 'MOP - Macanese Pataca',
    image: <Flag country="mo" width={16} />,
  },
  {
    value: 'MRO',
    label: 'MRO - Mauritanian Ouguiya',
    image: <Flag country="mr" width={16} />,
  },
  {
    value: 'MUR',
    label: 'MUR - Mauritian Rupee',
    image: <Flag country="mu" width={16} />,
  },
  {
    value: 'MVR',
    label: 'MVR - Maldivian Rufiyaa',
    image: <Flag country="mv" width={16} />,
  },
  {
    value: 'MWK',
    label: 'MWK - Malawian Kwacha',
    image: <Flag country="mw" width={16} />,
  },
  {
    value: 'MXN',
    label: 'MXN - Mexican Peso',
    image: <Flag country="mx" width={16} />,
  },
  {
    value: 'MYR',
    label: 'MYR - Malaysian Ringgit',
    image: <Flag country="my" width={16} />,
  },
  {
    value: 'MZN',
    label: 'MZN - Mozambican Metical',
    image: <Flag country="mz" width={16} />,
  },
  {
    value: 'NAD',
    label: 'NAD - Namibian Dollar',
    image: <Flag country="na" width={16} />,
  },
  {
    value: 'NGN',
    label: 'NGN - Nigerian Naira',
    image: <Flag country="ng" width={16} />,
  },
  {
    value: 'NIO',
    label: 'NIO - Nicaraguan Córdoba',
    image: <Flag country="ni" width={16} />,
  },
  {
    value: 'NOK',
    label: 'NOK - Norwegian Krone',
    image: <Flag country="no" width={16} />,
  },
  {
    value: 'NPR',
    label: 'NPR - Nepalese Rupee',
    image: <Flag country="np" width={16} />,
  },
  {
    value: 'NZD',
    label: 'NZD - New Zealand Dollar',
    image: <Flag country="nz" width={16} />,
  },
  {
    value: 'OMR',
    label: 'OMR - Omani Rial',
    image: <Flag country="om" width={16} />,
  },
  {
    value: 'PAB',
    label: 'PAB - Panamanian Balboa',
    image: <Flag country="pa" width={16} />,
  },
  {
    value: 'PEN',
    label: 'PEN - Peruvian Nuevo Sol',
    image: <Flag country="pe" width={16} />,
  },
  {
    value: 'PGK',
    label: 'PGK - Papua New Guinean Kina',
    image: <Flag country="pg" width={16} />,
  },
  {
    value: 'PHP',
    label: 'PHP - Philippine Peso',
    image: <Flag country="ph" width={16} />,
  },
  {
    value: 'PKR',
    label: 'PKR - Pakistani Rupee',
    image: <Flag country="pk" width={16} />,
  },
  {
    value: 'PLN',
    label: 'PLN - Polish Zloty',
    image: <Flag country="pl" width={16} />,
  },
  {
    value: 'PYG',
    label: 'PYG - Paraguayan Guarani',
    image: <Flag country="py" width={16} />,
  },
  {
    value: 'QAR',
    label: 'QAR - Qatari Rial',
    image: <Flag country="qa" width={16} />,
  },
  {
    value: 'RON',
    label: 'RON - Romanian Leu',
    image: <Flag country="ro" width={16} />,
  },
  {
    value: 'RSD',
    label: 'RSD - Serbian Dinar',
    image: <Flag country="rs" width={16} />,
  },
  {
    value: 'RUB',
    label: 'RUB - Russian Ruble',
    image: <Flag country="ru" width={16} />,
  },
  {
    value: 'RWF',
    label: 'RWF - Rwandan Franc',
    image: <Flag country="rw" width={16} />,
  },
  {
    value: 'SAR',
    label: 'SAR - Saudi Riyal',
    image: <Flag country="sa" width={16} />,
  },
  {
    value: 'SBD',
    label: 'SBD - Solomon Islands Dollar',
    image: <Flag country="sb" width={16} />,
  },
  {
    value: 'SCR',
    label: 'SCR - Seychellois Rupee',
    image: <Flag country="sc" width={16} />,
  },
  {
    value: 'SDG',
    label: 'SDG - Sudanese Pound',
    image: <Flag country="sd" width={16} />,
  },
  {
    value: 'SEK',
    label: 'SEK - Swedish Krona',
    image: <Flag country="se" width={16} />,
  },
  {
    value: 'SGD',
    label: 'SGD - Singapore Dollar',
    image: <Flag country="sg" width={16} />,
  },
  {
    value: 'SHP',
    label: 'SHP - Saint Helena Pound',
    image: <Flag country="sh" width={16} />,
  },
  {
    value: 'SLL',
    label: 'SLL - Sierra Leonean Leone',
    image: <Flag country="sl" width={16} />,
  },
  {
    value: 'SOS',
    label: 'SOS - Somali Shilling',
    image: <Flag country="so" width={16} />,
  },
  {
    value: 'SRD',
    label: 'SRD - Surinamese Dollar',
    image: <Flag country="sr" width={16} />,
  },
  {
    value: 'STD',
    label: 'STD - São Tomé and Príncipe Dobra',
    image: <Flag country="st" width={16} />,
  },
  {
    value: 'SVC',
    label: 'SVC - Salvadoran Colón',
    image: <Flag country="sv" width={16} />,
  },
  {
    value: 'SYP',
    label: 'SYP - Syrian Pound',
    image: <Flag country="sy" width={16} />,
  },
  {
    value: 'SZL',
    label: 'SZL - Swazi Lilangeni',
    image: <Flag country="sz" width={16} />,
  },
  {
    value: 'THB',
    label: 'THB - Thai Baht',
    image: <Flag country="th" width={16} />,
  },
  {
    value: 'TJS',
    label: 'TJS - Tajikistani Somoni',
    image: <Flag country="tj" width={16} />,
  },
  {
    value: 'TMT',
    label: 'TMT - Turkmenistani Manat',
    image: <Flag country="tm" width={16} />,
  },
  {
    value: 'TND',
    label: 'TND - Tunisian Dinar',
    image: <Flag country="tn" width={16} />,
  },
  {
    value: 'TOP',
    label: 'TOP - Tongan Paʻanga',
    image: <Flag country="to" width={16} />,
  },
  {
    value: 'TRY',
    label: 'TRY - Turkish Lira',
    image: <Flag country="tr" width={16} />,
  },
  {
    value: 'TTD',
    label: 'TTD - Trinidad and Tobago Dollar',
    image: <Flag country="tt" width={16} />,
  },
  {
    value: 'TWD',
    label: 'TWD - New Taiwan Dollar',
    image: <Flag country="tw" width={16} />,
  },
  {
    value: 'TZS',
    label: 'TZS - Tanzanian Shilling',
    image: <Flag country="tz" width={16} />,
  },
  {
    value: 'UAH',
    label: 'UAH - Ukrainian Hryvnia',
    image: <Flag country="ua" width={16} />,
  },
  {
    value: 'UGX',
    label: 'UGX - Ugandan Shilling',
    image: <Flag country="ug" width={16} />,
  },
  {
    value: 'USD',
    label: 'USD - US Dollar',
    image: <Flag country="us" width={16} />,
  },
  {
    value: 'UYU',
    label: 'UYU - Uruguayan Peso',
    image: <Flag country="uy" width={16} />,
  },
  {
    value: 'UZS',
    label: 'UZS - Uzbekistan Som',
    image: <Flag country="uz" width={16} />,
  },
  {
    value: 'VEF',
    label: 'VEF - Venezuelan Bolívar Fuerte',
    image: <Flag country="ve" width={16} />,
  },
  {
    value: 'VND',
    label: 'VND - Vietnamese Dong',
    image: <Flag country="vn" width={16} />,
  },
  {
    value: 'VUV',
    label: 'VUV - Vanuatu Vatu',
    image: <Flag country="vu" width={16} />,
  },
  {
    value: 'WST',
    label: 'WST - Samoan Tala',
    image: <Flag country="ws" width={16} />,
  },
  {
    value: 'XAF',
    label: 'XAF - CFA Franc BEAC',
    image: <Flag country="cm" width={16} />,
  },
  {
    value: 'XAG',
    label: 'XAG - Silver (troy ounce)',
    image: <Flag country="ch" width={16} />,
  },
  {
    value: 'XAU',
    label: 'XAU - Gold (troy ounce)',
    image: <Flag country="ch" width={16} />,
  },
  {
    value: 'XCD',
    label: 'XCD - East Caribbean Dollar',
    image: <Flag country="kn" width={16} />,
  },
  {
    value: 'XOF',
    label: 'XOF - CFA Franc BCEAO',
    image: <Flag country="bj" width={16} />,
  },
  {
    value: 'XPF',
    label: 'XPF - CFP Franc',
    image: <Flag country="fr" width={16} />,
  },
  {
    value: 'YER',
    label: 'YER - Yemeni Rial',
    image: <Flag country="ye" width={16} />,
  },
  {
    value: 'ZAR',
    label: 'ZAR - South African Rand',
    image: <Flag country="za" width={16} />,
  },
  {
    value: 'ZMW',
    label: 'ZMW - Zambian Kwacha',
    image: <Flag country="zm" width={16} />,
  },
  {
    value: 'ZWL',
    label: 'ZWL - Zimbabwean Dollar',
    image: <Flag country="zw" width={16} />,
  },
];
