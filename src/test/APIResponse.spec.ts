import { ErrorAPIResponse } from 'src/main/APIResponse';
import { expect } from 'chai';

describe('ErrorAPIResponse', () => {
    describe('#constructor(string)', () => {
        it('should convert string to Error object.', () => {
            const response = new ErrorAPIResponse('Test Error');
            expect(response.success).to.equal(false);
            expect(response.error!.message).to.equal('Test Error');
        });
    });
});
