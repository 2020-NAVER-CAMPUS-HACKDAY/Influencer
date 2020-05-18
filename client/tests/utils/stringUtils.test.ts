import { addCommaStringFromThreeCntNum } from '../../utils/stringUtils';

describe('stringUtil', () => {
  describe('formatStringFromNum', () => {
    const VALID_NUM = {
      VALID_TYPE: 1112,
      VALID_NUM_LENGTH_FIVE: 12345,
      VALID_NUM_LENGTH_THREE: 123,
      VALID_NUM_LENGTH_TEN: 1234567890,
      VALID_NUM_LENGTH_ZERO: 0,
    };

    it('valid format', () => {
      expect(addCommaStringFromThreeCntNum(VALID_NUM.VALID_NUM_LENGTH_FIVE))
        .toEqual('12,345');
      expect(addCommaStringFromThreeCntNum(VALID_NUM.VALID_NUM_LENGTH_TEN))
        .toEqual('1,234,567,890');
      expect(addCommaStringFromThreeCntNum(VALID_NUM.VALID_TYPE))
        .toEqual('1,112');
      expect(addCommaStringFromThreeCntNum(VALID_NUM.VALID_NUM_LENGTH_THREE))
        .toEqual('123');
      expect(addCommaStringFromThreeCntNum(VALID_NUM.VALID_NUM_LENGTH_ZERO))
        .toEqual('0');
    });

    const INVALID_NUM = {
      INVALID_NUMBER: -1,
    };

    it('invalid format', () => {
      expect(addCommaStringFromThreeCntNum(INVALID_NUM.INVALID_NUMBER))
        .toBeNull();
    });
  });
});
