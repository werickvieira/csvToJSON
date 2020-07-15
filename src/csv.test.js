import csvToJSON from './csv';
import mockData from './__mocks__/data';
import service from '../src/service';

jest.mock('../src/service', () => (
  {
    detectSeparator: jest.fn(() => ';'),
    splitLines: jest.fn(() => [
      'ID,JOGADOR,SELECAO,ABREVIATURA SELECAO,COPA DO PENTEADO,COPAS QUE JOGOU,POSIÇÃO,IMAGEM,CARACTERISTICA',
      '1,Carlos Valderrama,Colômbia,COL,Cabelo em 1994,1990, 1994 e 1998,Meia,jogadores/valderrama_colombia,cabelo comprido, bigode',
    ]),
    parseToObject: jest.fn(() => ({
      id: 1,
      jogador: 'Carlos Valderrama',
      selecao: 'Colômbia',
      abreviacaoSeleca: 'COL',
      copaDoPenteado: 'Cabelo em 1994,1990, 1994 e 1998',
      copasQueJogou: '1994, 1990, 1994 e 1998',
      posicao: 'Meia',
      imagem: 'jogadores/valderrama_colombia',
      caracteristica: 'cabelo comprido, bigode',
    })),
  }
));

afterEach(() => {
  service.detectSeparator.mockClear();
  service.splitLines.mockClear();
  service.parseToObject.mockClear();
});

describe('function csvToJSON', () => {
  it('should return an error when all parameters are empty', () => {
    try {
      csvToJSON();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', "Function didn't receive a string file.");
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });

  it('should return success when the parameters are correct', () => {
    try {
      const response = csvToJSON(mockData, service);
      expect(service.detectSeparator).toHaveBeenCalled();
      expect(service.splitLines).toHaveBeenCalled();
      expect(service.parseToObject).toHaveBeenCalled();

      const expected = {
        id: 1,
        jogador: 'Carlos Valderrama',
        selecao: 'Colômbia',
        abreviacaoSeleca: 'COL',
        copaDoPenteado: 'Cabelo em 1994,1990, 1994 e 1998',
        copasQueJogou: '1994, 1990, 1994 e 1998',
        posicao: 'Meia',
        imagem: 'jogadores/valderrama_colombia',
        caracteristica: 'cabelo comprido, bigode',
      };

      expect(response).toEqual(expected);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it('should return an error when first parameter is empty Array', () => {
    try {
      csvToJSON([]);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', "Function didn't receive a string file.");
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });

  it('should return an error when parameter is undefined', () => {
    try {
      csvToJSON(undefined);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', "Function didn't receive a string file.");
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });

  it('should return an error when parameter is null', () => {
    try {
      csvToJSON(null);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', "Function didn't receive a string file.");
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });

  it('should return an error when all parameters are null', () => {
    try {
      csvToJSON(null, null);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', "Function didn't receive a string file.");
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });


  it('should return an error when the second parameter is null', () => {
    try {
      csvToJSON(mockData, null);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'Function missing dependency.');
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });

  it('should return an error when the second parameter is empty object', () => {
    try {
      csvToJSON(mockData, {});
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'Function missing dependency.');
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });

  it('should return an error when the second parameter is empty Array', () => {
    try {
      csvToJSON(mockData, []);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', 'Function missing dependency.');
      expect(service.detectSeparator).not.toHaveBeenCalled();
      expect(service.splitLines).not.toHaveBeenCalled();
      expect(service.parseToObject).not.toHaveBeenCalled();
    }
  });
});
