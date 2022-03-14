import assert = require('assert');
import { ErrorAPIResponse } from 'src/main/APIResponse';

describe('ErrorAPIResponse', () => {
    describe('#constructor(string)', () => {
        it('should convert string to Error object.', () => {
            const response = new ErrorAPIResponse('Test Error');
            assert.equal(response.success, false);
            assert.equal(response.error!.message, 'Test Error');
        });
    });
});
