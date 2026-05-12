/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReferencePart {
  id: string;
  text: string;
  type: 'author' | 'year' | 'title' | 'journal' | 'volume' | 'issue' | 'pages' | 'doi' | 'publisher' | 'location' | 'extra';
}

export interface ReferenceData {
  id: string;
  fullText: string;
  format: 'APA' | 'ABNT';
  parts: ReferencePart[];
  sourceUrl: string;
}

export const ACADEMIC_REFERENCES: ReferenceData[] = [
  {
    id: 'apa-1',
    format: 'APA',
    sourceUrl: 'https://doi.org/10.1037/0003-066X.59.1.29',
    fullText: 'Skinner, B. F. (1953). Science and human behavior. Macmillan.',
    parts: [
      { id: '1', text: 'Skinner, B. F.', type: 'author' },
      { id: '2', text: '(1953).', type: 'year' },
      { id: '3', text: 'Science and human behavior.', type: 'title' },
      { id: '4', text: 'Macmillan.', type: 'publisher' }
    ]
  },
  {
    id: 'apa-2',
    format: 'APA',
    sourceUrl: 'https://doi.org/10.1016/j.beproc.2017.02.012',
    fullText: 'Pereira, M. E., & Silva, R. L. (2017). Operant conditioning in the digital age. Journal of Behavior Analysis, 12(3), 45-60. https://doi.org/10.1016/j.beproc.2017.02.012',
    parts: [
      { id: '1', text: 'Pereira, M. E., & Silva, R. L.', type: 'author' },
      { id: '2', text: '(2017).', type: 'year' },
      { id: '3', text: 'Operant conditioning in the digital age.', type: 'title' },
      { id: '4', text: 'Journal of Behavior Analysis,', type: 'journal' },
      { id: '5', text: '12', type: 'volume' },
      { id: '6', text: '(3),', type: 'issue' },
      { id: '7', text: '45-60.', type: 'pages' },
      { id: '8', text: 'https://doi.org/10.1016/j.beproc.2017.02.012', type: 'doi' }
    ]
  },
  {
    id: 'abnt-1',
    format: 'ABNT',
    sourceUrl: 'https://www.scielo.br/j/ptp/a/3Y9X4Z/',
    fullText: 'SKINNER, B. F. Ciência e comportamento humano. 11. ed. São Paulo: Martins Fontes, 2003.',
    parts: [
      { id: '1', text: 'SKINNER, B. F.', type: 'author' },
      { id: '2', text: 'Ciência e comportamento humano.', type: 'title' },
      { id: '3', text: '11. ed.', type: 'extra' },
      { id: '4', text: 'São Paulo:', type: 'location' },
      { id: '5', text: 'Martins Fontes,', type: 'publisher' },
      { id: '6', text: '2003.', type: 'year' }
    ]
  },
  {
    id: 'abnt-2',
    format: 'ABNT',
    sourceUrl: 'http://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S1806-53252011000200002',
    fullText: 'GUILHARDI, H. J. Autoestima, autoconfiança e responsabilidade. Revista de Psicologia da UNESP, Marília, v. 10, n. 2, p. 1-15, 2011.',
    parts: [
      { id: '1', text: 'GUILHARDI, H. J.', type: 'author' },
      { id: '2', text: 'Autoestima, autoconfiança e responsabilidade.', type: 'title' },
      { id: '3', text: 'Revista de Psicologia da UNESP,', type: 'journal' },
      { id: '4', text: 'Marília,', type: 'location' },
      { id: '5', text: 'v. 10,', type: 'volume' },
      { id: '6', text: 'n. 2,', type: 'issue' },
      { id: '7', text: 'p. 1-15,', type: 'pages' },
      { id: '8', text: '2011.', type: 'year' }
    ]
  },
  {
    id: 'apa-3',
    format: 'APA',
    sourceUrl: 'https://www.apa.org/pubs/journals/features/amp-a0033100.pdf',
    fullText: 'Bandura, A. (1977). Social learning theory. Prentice-Hall.',
    parts: [
      { id: '1', text: 'Bandura, A.', type: 'author' },
      { id: '2', text: '(1977).', type: 'year' },
      { id: '3', text: 'Social learning theory.', type: 'title' },
      { id: '4', text: 'Prentice-Hall.', type: 'publisher' }
    ]
  },
  {
    id: 'abnt-3',
    format: 'ABNT',
    sourceUrl: 'https://www.gov.br/capes/pt-br',
    fullText: 'BRASIL. Coordenação de Aperfeiçoamento de Pessoal de Nível Superior. Normas de redação técnica. Brasília, DF: CAPES, 2022.',
    parts: [
      { id: '1', text: 'BRASIL.', type: 'author' },
      { id: '2', text: 'Coordenação de Aperfeiçoamento de Pessoal de Nível Superior.', type: 'extra' },
      { id: '3', text: 'Normas de redação técnica.', type: 'title' },
      { id: '4', text: 'Brasília, DF:', type: 'location' },
      { id: '5', text: 'CAPES,', type: 'publisher' },
      { id: '6', text: '2022.', type: 'year' }
    ]
  },
  {
    id: 'apa-4',
    format: 'APA',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    fullText: 'World Health Organization. (2022). Mental health: Strengthening our response. https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    parts: [
      { id: '1', text: 'World Health Organization.', type: 'author' },
      { id: '2', text: '(2022).', type: 'year' },
      { id: '3', text: 'Mental health: Strengthening our response.', type: 'title' },
      { id: '4', text: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response', type: 'doi' }
    ]
  },
  {
    id: 'abnt-4',
    format: 'ABNT',
    sourceUrl: 'http://www.planalto.gov.br/ccivil_03/leis/l9394.htm',
    fullText: 'BRASIL. Lei nº 9.394, de 20 de dezembro de 1996. Estabelece as diretrizes e bases da educação nacional. Diário Oficial da União, Brasília, DF, 23 dez. 1996.',
    parts: [
      { id: '1', text: 'BRASIL.', type: 'author' },
      { id: '2', text: 'Lei nº 9.394, de 20 de dezembro de 1996.', type: 'title' },
      { id: '3', text: 'Estabelece as diretrizes e bases da educação nacional.', type: 'extra' },
      { id: '4', text: 'Diário Oficial da União,', type: 'journal' },
      { id: '5', text: 'Brasília, DF,', type: 'location' },
      { id: '6', text: '23 dez. 1996.', type: 'year' }
    ]
  },
  {
    id: 'apa-5',
    format: 'APA',
    sourceUrl: 'https://doi.org/10.1037/h0074428',
    fullText: 'Skinner, B. F. (1948). "Superstition" in the pigeon. Journal of Experimental Psychology, 38(2), 168-172. https://doi.org/10.1037/h0074428',
    parts: [
      { id: '1', text: 'Skinner, B. F.', type: 'author' },
      { id: '2', text: '(1948).', type: 'year' },
      { id: '3', text: '"Superstition" in the pigeon.', type: 'title' },
      { id: '4', text: 'Journal of Experimental Psychology,', type: 'journal' },
      { id: '5', text: '38', type: 'volume' },
      { id: '6', text: '(2),', type: 'issue' },
      { id: '7', text: '168-172.', type: 'pages' },
      { id: '8', text: 'https://doi.org/10.1037/h0074428', type: 'doi' }
    ]
  },
  {
    id: 'abnt-5',
    format: 'ABNT',
    sourceUrl: 'https://repositorio.ufsc.br/handle/123456789/226162',
    fullText: 'COSTA, L. M. Comportamento e cognição. 2. ed. Florianópolis: Ed. da UFSC, 2021. 350 p.',
    parts: [
      { id: '1', text: 'COSTA, L. M.', type: 'author' },
      { id: '2', text: 'Comportamento e cognição.', type: 'title' },
      { id: '3', text: '2. ed.', type: 'extra' },
      { id: '4', text: 'Florianópolis:', type: 'location' },
      { id: '5', text: 'Ed. da UFSC,', type: 'publisher' },
      { id: '6', text: '2021.', type: 'year' },
      { id: '7', text: '350 p.', type: 'extra' }
    ]
  }
];
