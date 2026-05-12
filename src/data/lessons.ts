/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  steps: LessonStep[];
}

export const REPORT_LESSONS: Lesson[] = [
  {
    id: 'report-1',
    title: 'Estrutura do Relatório Experimental',
    description: 'Aprenda as partes fundamentais de um relatório em psicologia experimental.',
    steps: [
      {
        id: 'step-1',
        title: 'Título Científico',
        content: 'O título deve conter a variável independente (VI) e a variável dependente (VD). Ex: "Efeito do esquema de reforço (VI) na taxa de resposta (VD)".',
        question: 'Qual título respeita melhor o rigor científico?',
        options: [
          'O comportamento dos ratos sob influência de comida rápida',
          'Influência do intervalo de tempo no responder operante de Rattus norvegicus',
          'Como o Skinner ensinou pombos a jogar pingue-pongue',
          'Resultados de um dia de treino no laboratório escolar'
        ],
        correctOptionIndex: 1,
        hint: 'Use termos técnicos e mencione o que foi manipulado e o que foi medido.'
      },
      {
        id: 'step-2',
        title: 'Resumo (Abstract)',
        content: 'O resumo sintetiza o objetivo, o método, os resultados e a conclusão em um único parágrafo fluido.',
        question: 'Qual o tempo verbal predominante em um resumo de algo já realizado?',
        options: [
          'Futuro do presente (ex: o estudo mostrará)',
          'Presente do indicativo (ex: o estudo mostra)',
          'Pretérito perfeito (ex: o objetivo foi, os dados indicaram)',
          'Imperativo (ex: faça o resumo assim)'
        ],
        correctOptionIndex: 2,
        hint: 'Se o experimento já aconteceu, falamos do passado.'
      }
    ]
  },
  {
    id: 'report-2',
    title: 'Método: Sujeitos e Equipamentos',
    description: 'Como descrever o aparato e o organismo corretamente.',
    steps: [
      {
        id: 'm-step-1',
        title: 'O Organismo (Sujeito)',
        content: 'Ao descrever o rato, é vital citar: espécie, linhagem, sexo, peso e estado de privação.',
        question: 'Por que informar o peso do animal em gramas?',
        options: [
          'Curiosidade estética',
          'Para garantir que o animal não está desnutrido ou acima do peso ideal para o teste',
          'Para saber o tamanho da gaiola',
          'Para calcular a velocidade de corrida'
        ],
        correctOptionIndex: 1,
        hint: 'O estado físico do animal afeta diretamente sua motivação e resultados.'
      },
      {
        id: 'm-step-2',
        title: 'A Caixa de Skinner',
        content: 'O equipamento deve ser descrito com precisão: dimensões, materiais e a presença de luz, alavanca e comedouro.',
        question: 'Chamamos o local onde a comida cai de:',
        options: [
          'Pratinho de jantar',
          'Dispenser de sementes',
          'Comedouro ou orifício de acesso ao reforço',
          'Caixa de entrega'
        ],
        correctOptionIndex: 2,
        hint: 'Termos técnicos garantem a replicação do experimento por outros cientistas.'
      }
    ]
  },
  {
    id: 'report-3',
    title: 'Resultados e Discussão',
    description: 'Como apresentar dados e interpretar conforme a teoria.',
    steps: [
      {
        id: 'rd-step-1',
        title: 'Gráficos de Linha',
        content: 'Em análise do comportamento, usamos frequentemente gráficos de frequência acumulada ou taxa de resposta por minuto.',
        question: 'Onde geralmente colocamos a unidade de tempo (sessões)?',
        options: [
          'Eixo Y (Vertical)',
          'Eixo X (Horizontal)',
          'No título apenas',
          'Em uma nota de rodapé separada'
        ],
        correctOptionIndex: 1,
        hint: 'O tempo é a variável independente de base que corre no eixo horizontal.'
      },
      {
        id: 'rd-step-2',
        title: 'Interpretação dos Dados',
        content: 'Na discussão, você deve comparar seus achados com a literatura (ex: com o que Skinner ou outros autores previram).',
        question: 'Se o rato parou de responder quando a comida não vinha mais, ocorreu:',
        options: [
          'Extinção operante',
          'Reforçamento negativo',
          'Punição positiva',
          'Esquecimento'
        ],
        correctOptionIndex: 0,
        hint: 'A suspensão do reforço leva à diminuição gradual da resposta.'
      }
    ]
  },
  {
    id: 'report-4',
    title: 'Citações no Texto (APA 7)',
    description: 'Aprenda a citar autores dentro dos parágrafos.',
    steps: [
      {
        id: 'cite-1',
        title: 'Citação Indireta (Parafraseada)',
        content: 'Quando explicamos a ideia do autor com nossas palavras, chamamos de citação indireta. No formato APA, usamos Sobrenome e Ano.',
        question: 'Qual o formato correto para uma citação indireta entre parênteses?',
        options: [
          '(Skinner, 1953)',
          '(BURRHUS FREDERIC SKINNER, 1953)',
          '(Skinner; 1953)',
          '(B.F. Skinner, 1953)'
        ],
        correctOptionIndex: 0,
        hint: 'Apenas o primeiro sobrenome e o ano, separados por vírgula.'
      },
      {
        id: 'cite-2',
        title: 'Citação com Vários Autores',
        content: 'Para 3 ou mais autores, a APA 7 agora simplifica desde a primeira citação usando "et al.".',
        question: 'Como citar (Silva, Pereira, Santos, 2020) logo na primeira vez?',
        options: [
          'Silva, Pereira e Santos (2020)',
          'Silva et al. (2020)',
          'Silva e outros (2020)',
          '(Silva, Pereira, Santos, 2020)'
        ],
        correctOptionIndex: 1,
        hint: 'Use "et al." que significa "e outros".'
      }
    ]
  },
  {
    id: 'report-5',
    title: 'Introdução e Hipóteses',
    description: 'A arte de fundamentar seu experimento.',
    steps: [
      {
        id: 'intro-1',
        title: 'O Funil da Introdução',
        content: 'A introdução deve começar com o conceito amplo (ex: Condicionamento Operante) e "afunilar" até o seu problema específico.',
        question: 'Onde deve aparecer a definição de Reforçamento Positivo?',
        options: [
          'No título',
          'No início da introdução, ao apresentar os conceitos',
          'Apenas na discussão',
          'Nos anexos'
        ],
        correctOptionIndex: 1,
        hint: 'Conceitos base devem vir primeiro para o leitor entender o que vem depois.'
      },
      {
        id: 'intro-2',
        title: 'A Hipótese',
        content: 'A hipótese é sua previsão sobre o resultado baseada na teoria.',
        question: 'Qual seria uma hipótese válida para um treino de CRF (Reforçamento Contínuo)?',
        options: [
          'O rato ficará com sono',
          'As respostas aumentarão de frequência enquanto houver reforço',
          'O equipamento vai quebrar',
          'Não é possível prever o comportamento'
        ],
        correctOptionIndex: 1,
        hint: 'O reforço, por definição, aumenta a probabilidade da resposta.'
      }
    ]
  },
  {
    id: 'report-6',
    title: 'Procedimento: O Passo a Passo',
    description: 'Relatando o que você realmente fez no laboratório.',
    steps: [
      {
        id: 'proc-1',
        title: 'Nível de Operante (Linha de Base)',
        content: 'Antes de começar o treino, medimos quanto o rato pressiona a barra sem ganhar comida.',
        question: 'Como chamamos essa fase inicial sem intervenção?',
        options: [
          'Fase da alegria',
          'Reforço intermitente',
          'Nível de Operante ou Linha de Base',
          'Punição'
        ],
        correctOptionIndex: 2,
        hint: 'É o ponto de partida para comparação.'
      },
      {
        id: 'proc-2',
        title: 'Critério de Saciedade',
        content: 'O experimento termina quando o rato para de comer ou atinge o tempo limite.',
        question: 'Se o rato para de responder por estar "cheio", dizemos que houve:',
        options: [
          'Extinção',
          'Saciedade',
          'Privação',
          'Esquecimento'
        ],
        correctOptionIndex: 1,
        hint: 'A privação motiva, a saciedade diminui o valor do reforço.'
      }
    ]
  },
  {
    id: 'report-7',
    title: 'Ética e Bem-estar Animal',
    description: 'O respeito ao sujeito experimental.',
    steps: [
      {
        id: 'eth-1',
        title: 'Os 3 Rs',
        content: 'A ética com animais segue: Replacement (Substituição), Reduction (Redução) e Refinement (Refinamento).',
        question: 'O que significa "Redução" neste contexto?',
        options: [
          'Dar menos comida',
          'Usar o menor número possível de animais para um resultado estatístico válido',
          'Diminuir o tamanho da caixa de Skinner',
          'Reduzir a luz do laboratório'
        ],
        correctOptionIndex: 1,
        hint: 'Menos animais sofrendo é sempre o objetivo ético.'
      }
    ]
  },
  {
    id: 'report-8',
    title: 'Esquemas de Reforçamento',
    description: 'Como o tempo e a razão de respostas mudam o comportamento.',
    steps: [
      {
        id: 'sch-1',
        title: 'Razão Fixa (FR)',
        content: 'No esquema de Razão Fixa (FR), o reforço é entregue após um número fixo de respostas. Ex: FR 10 significa que a cada 10 pressões à barra, vem a comida.',
        question: 'Qual o efeito típico do FR no comportamento?',
        options: [
          'O rato para de responder completamente',
          'Alta taxa de resposta com pausas logo após o reforço (pausa pós-reforço)',
          'O rato responde de forma bem lenta e constante',
          'Não há mudança no comportamento'
        ],
        correctOptionIndex: 1,
        hint: 'Imagine o trabalhador que ganha por peça produzida: ele trabalha rápido, mas descansa um pouco assim que termina uma peça.'
      },
      {
        id: 'sch-2',
        title: 'Intervalo Fixo (FI)',
        content: 'No Intervalo Fixo (FI), a primeira resposta após um tempo fixo ser passado é reforçada. Ex: FI 1min.',
        question: 'Como chamamos o padrão de resposta no gráfico do FI?',
        options: [
          'Reta perfeita',
          'Padrão em "Escada"',
          'Padrão em "Vieira" (scallop)',
          'Padrão aleatório'
        ],
        correctOptionIndex: 2,
        hint: 'O rato aumenta a taxa de resposta conforme o tempo final do intervalo se aproxima.'
      }
    ]
  },
  {
    id: 'report-9',
    title: 'Modelagem (Shaping)',
    description: 'O processo de ensinar novos comportamentos.',
    steps: [
      {
        id: 'shp-1',
        title: 'Aproximações Sucessivas',
        content: 'A modelagem não espera o comportamento final, mas reforça aproximações sucessivas da resposta desejada.',
        question: 'Se queremos que o rato aperte a barra, o que reforçamos primeiro?',
        options: [
          'Apenas quando ele apertar a barra com força',
          'Quando ele olhar para a barra ou se aproximar dela',
          'Quando ele dormir no canto da caixa',
          'Não reforçamos nada'
        ],
        correctOptionIndex: 1,
        hint: 'Passos pequenos: primeiro olhar, depois chegar perto, depois tocar, depois apertar.'
      }
    ]
  },
  {
    id: 'report-10',
    title: 'APA vs ABNT: O Embate',
    description: 'Diferenças cruciais que você não pode esquecer.',
    steps: [
      {
        id: 'comp-1',
        title: 'Destaque de Título',
        content: 'Na APA, o título da revista ou livro fica em ITÁLICO. Na ABNT, o título da obra principal fica em NEGRITO (ou Itálico/Sublinhado, sendo o Negrito o mais comum).',
        question: 'Como você veria o título "Science and Human Behavior" na ABNT?',
        options: [
          '*Science and Human Behavior*',
          '**Science and Human Behavior**',
          'Science and Human Behavior',
          'SCIENCE AND HUMAN BEHAVIOR (em maiúsculo)'
        ],
        correctOptionIndex: 1,
        hint: 'A ABNT adora um negrito para destacar a fonte principal.'
      }
    ]
  },
  {
    id: 'report-11',
    title: 'Relato de Estatística (APA)',
    description: 'Como apresentar Média, Desvio Padrão e p-valor.',
    steps: [
      {
        id: 'stat-1',
        title: 'Média e Desvio Padrão',
        content: 'Em APA, as abreviações de termos estatísticos em latim (como M e SD) devem estar em itálico.',
        question: 'Qual a forma correta de relatar a média e desvio padrão?',
        options: [
          'A média foi 10 (DP=2)',
          'M = 10.0, SD = 2.0',
          '*M* = 10.0, *SD* = 2.0',
          'med = 10; desv = 2'
        ],
        correctOptionIndex: 2,
        hint: 'Use as siglas em inglês M (Mean) e SD (Standard Deviation) em itálico.'
      },
      {
        id: 'stat-2',
        title: 'O p-valor',
        content: 'O p-valor indica a significância estatística. Também deve estar em itálico e não leva o zero antes da vírgula se o valor não puder exceder 1.',
        question: 'Qual relato de p-valor segue a APA 7?',
        options: [
          'p < 0,05',
          '*p* < .05',
          'P < 5%',
          '*Sig* = .05'
        ],
        correctOptionIndex: 1,
        hint: 'Itálico no "p", ponto para decimais e sem o zero à esquerda.'
      }
    ]
  },
  {
    id: 'report-12',
    title: 'Esquemas de Razão e Intervalo Variável',
    description: 'Entendendo VR e VI para comportamentos persistentes.',
    steps: [
      {
        id: 'var-1',
        title: 'Razão Variável (VR)',
        content: 'No esquema VR, o reforço ocorre após um número médio de respostas. Ex: VR 10 significa que, na média, a cada 10 respostas vem o reforço (as vezes 2, as vezes 18).',
        question: 'Por que o VR gera uma taxa de resposta tão alta?',
        options: [
          'O rato fica confuso e desiste',
          'A imprevisibilidade mantém o organismo respondendo constantemente (efeito "caça-níquel")',
          'O reforço é maior em VR',
          'Não gera taxa alta'
        ],
        correctOptionIndex: 1,
        hint: 'Se você não sabe qual resposta será premiada, você responde o máximo possível.'
      },
      {
        id: 'var-2',
        title: 'Intervalo Variável (VI)',
        content: 'O VI reforça a primeira resposta após um tempo médio variável. Ex: VI 30s.',
        question: 'Como é a linha de resposta no gráfico do VI?',
        options: [
          'Cheia de pausas (escada)',
          'Uma reta ascendente constante e moderada',
          'Um padrão de vieira (scallop)',
          'Uma linha horizontal'
        ],
        correctOptionIndex: 1,
        hint: 'Como o reforço depende do tempo mas o tempo muda, o rato responde em ritmo constante para não perder a chance.'
      }
    ]
  },
  {
    id: 'report-13',
    title: 'Controle de Estímulos',
    description: 'Discriminação e Generalização no laboratório.',
    steps: [
      {
        id: 'stim-1',
        title: 'Discriminação (SD e SΔ)',
        content: 'Quando o reforço só ocorre na presença de um estímulo (ex: luz acesa), chamamos este estímulo de Estímulo Discriminativo (SD). O estímulo onde não há reforço é o S-delta (SΔ).',
        question: 'Se o rato só ganha comida com a luz ACESA, o que ele aprende?',
        options: [
          'Responder apenas quando a luz apaga',
          'Responder mais na presença da luz (SD) e diminuir na ausência (SΔ)',
          'Apertar a barra o tempo todo sem parar',
          'Esquecer como apertar a barra'
        ],
        correctOptionIndex: 1,
        hint: 'O comportamento passa a ser "ocorrido" ou "controlado" pelo contexto da luz.'
      }
    ]
  },
  {
    id: 'report-14',
    title: 'O Temido "Apud" (Citação de Citação)',
    description: 'Como usar a fonte secundária na ABNT e APA.',
    steps: [
      {
        id: 'apud-1',
        title: 'Quando usar APUD?',
        content: 'Usamos apud quando não tivemos acesso ao texto original (o "texto citado") e estamos lendo sobre ele em outro autor (o "texto citante").',
        question: 'Segundo a ABNT, como citar Skinner (1953) lido em Silva (2020)?',
        options: [
          'Skinner (1953) apud Silva (2020)',
          'Silva (2020) apud Skinner (1953)',
          'Skinner & Silva (2020)',
          'Skinner/Silva (1953/2020)'
        ],
        correctOptionIndex: 0,
        hint: 'A ordem é: Autor original [que você não leu] apud Autor que você leu.'
      }
    ]
  },
  {
    id: 'report-15',
    title: 'Erros Comuns de Redação',
    description: 'Evite o antropomorfismo e a falta de objetividade.',
    steps: [
      {
        id: 'err-1',
        title: 'Antropomorfismo',
        content: 'Atribuir sentimentos humanos a animais em relatórios científicos é um erro grave. Ex: "O rato ficou feliz ao ver a comida".',
        question: 'Qual frase é tecnicamente correta?',
        options: [
          'O rato tentou desesperadamente obter água',
          'O organismo apresentou aumento na taxa de resposta após o reforço',
          'O animal achou que a alavanca era legal',
          'O sujeito ficou ansioso na caixa'
        ],
        correctOptionIndex: 1,
        hint: 'Descreva o que você observa (fatos), não o que você acha que o animal sente.'
      }
    ]
  }
];
