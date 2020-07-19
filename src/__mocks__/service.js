
const mockDetectSeparator = jest.fn(() => ';');

const mockSplitLines = jest.fn(() => [
  'ID,JOGADOR,SELECAO,ABREVIATURA SELECAO,COPA DO PENTEADO,COPAS QUE JOGOU,POSIÇÃO,IMAGEM,CARACTERISTICA',
  '1,Carlos Valderrama,Colômbia,COL,Cabelo em 1994,1990, 1994 e 1998,Meia,jogadores/valderrama_colombia,cabelo comprido, bigode',
]);

const mockParseToObject = jest.fn(() => ({
  id: 1,
  jogador: 'Carlos Valderrama',
  selecao: 'Colômbia',
  abreviacaoSeleca: 'COL',
  copaDoPenteado: 'Cabelo em 1994,1990, 1994 e 1998',
  copasQueJogou: '1994, 1990, 1994 e 1998',
  posicao: 'Meia',
  imagem: 'jogadores/valderrama_colombia',
  caracteristica: 'cabelo comprido, bigode',
}));

export default {
  detectSeparator: mockDetectSeparator,
  splitLines: mockSplitLines,
  parseToObject: mockParseToObject,
};
