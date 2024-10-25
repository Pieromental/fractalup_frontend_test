export interface Src {
  original: string;
  large2x?: string;
  large?: string;
  medium?: string;
  small?: string;
  portrait?: string;
  landscape?: string;
  tiny?: string;
}

export interface PexelImage {
  id: number;
  seller: any;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color?: string;
  src: Src;
  liked?: boolean;
  alt?: string;
}

export interface PexelsParams {
  query: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  color?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'turquoise'
    | 'blue'
    | 'violet'
    | 'pink'
    | 'brown'
    | 'black'
    | 'gray'
    | 'white'
    | string;
  locale?:
    | 'en-US'
    | 'pt-BR'
    | 'es-ES'
    | 'ca-ES'
    | 'de-DE'
    | 'it-IT'
    | 'fr-FR'
    | 'sv-SE'
    | 'id-ID'
    | 'pl-PL'
    | 'ja-JP'
    | 'zh-TW'
    | 'zh-CN'
    | 'ko-KR'
    | 'th-TH'
    | 'nl-NL'
    | 'hu-HU'
    | 'vi-VN'
    | 'cs-CZ'
    | 'da-DK'
    | 'fi-FI'
    | 'uk-UA'
    | 'el-GR'
    | 'ro-RO'
    | 'nb-NO'
    | 'sk-SK'
    | 'tr-TR'
    | 'ru-RU';
  page?: number;
  per_page?: number;
}
