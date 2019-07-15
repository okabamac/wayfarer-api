
import { assert } from 'chai';
import { AssertionError } from 'assert';
import General from '../utilities/general.util';

describe('Testing Error States', () => {
  it('Throws an error when called with missing arguments for date helper', () => {
    try {
      General.dateHelper(); // this should fail
      assert.fail('expected exception not thrown'); // this throws an AssertionError
    } catch (e) { // this catches all errors, those thrown by the function under test
      // and those thrown by assert.fail
      if (e instanceof AssertionError) {
        // bubble up the assertion error
        throw e;
      }
      assert.equal(e.message, 'Cannot read property \'getFullYear\' of undefined');
    }
  });
  it('Throws an error when called with missing arguments for hash password', () => {
    try {
      General.hash(); // this should fail
      assert.fail('expected exception not thrown'); // this throws an AssertionError
    } catch (e) { // this catches all errors, those thrown by the function under test
      // and those thrown by assert.fail
      if (e instanceof AssertionError) {
        // bubble up the assertion error
        throw e;
      }
      assert.equal(e.message, 'Illegal arguments: undefined, string');
    }
  });
});
