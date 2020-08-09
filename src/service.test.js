import service from '../src/service';

describe('function service', () => {
  describe('detectSeparator', () => {
    const _ = service();
    it('should return an empty array when argument is not defined', () => {
      expect(_.detectSeparator()).toEqual([]);
      expect(_.detectSeparator()).toHaveLength(0);
    });

    it('should failed when argument is not valid and return an undefined value', () => {
      expect(_.detectSeparator('abc')).toBeUndefined();
    });
  });

  describe('splitLines', () => {
    const _ = service();
    it('should return an empty array when argument is not defined', () => {
      expect(_.splitLines()).toEqual([]);
      expect(_.splitLines()).toHaveLength(0);
    });

    it('should return an array with 0 element', () => {
      expect(_.splitLines('')).toBeDefined();
      expect(_.splitLines('')).toEqual([]);
    });

    it('should return an array with 1 element', () => {
      expect(_.splitLines('abc')).toBeDefined();
      expect(_.splitLines('abc')).toEqual(['abc']);
    });

    it('should return an array with 2 elements', () => {
      expect(_.splitLines('abc\ndef')).toBeDefined();
      expect(_.splitLines('abc\ndef')).toEqual(['abc', 'def']);
    });
  });

  describe('parseToObject', () => {
    it('should return an error when parameter is empty', () => {
      const _ = service();
      try {
        _.parseToObject();
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toHaveProperty('message', "Function didn't receive an array.");
      }
    });

    it('should return an error when parameter is empty array', () => {
      const _ = service();
      try {
        _.parseToObject([]);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toHaveProperty('message', "Cannot read property 'map' of undefined");
      }
    });
  });
});
