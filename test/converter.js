var expect    = require("chai").expect;
var should = require("should");
var converter = require("../app/converter");


describe('bubbleSort', function() {
  
  it('should exist', function() {
    should.exist(converter.bubbleSort);
  });

  it('should be a function', function() {
    converter.bubbleSort.should.be.a.Function;
  });

  // Note: Any comparison here needs to use eql. Otherwise Mocha will test for
  // exact equality (identity)

  it('should sort an array numerically', function() {
    var input = [1, 2, 43, 100, 100, 21, 21];
    var expected = [1, 2, 21, 21, 43, 100, 100];
    converter.bubbleSort(input).should.eql(expected);
  });

  it('should sort arrays with decimal numbers', function() {
    var input = [24.7, 24.3, 23, 9, 3, 3, 100, 25, 100];
    var expected = [3, 3, 9, 23, 24.3, 24.7, 25, 100, 100];
    converter.bubbleSort(input).should.eql(expected);
  });

  it('should sort reverse sorted arrays', function() {
    converter.bubbleSort([5, 4, 3, 2, 1]).should.eql([1, 2, 3, 4, 5]);
  });

  it('should handle presorted arrays', function() {
    converter.bubbleSort([1, 2, 3, 4, 5]).should.eql([1, 2, 3, 4, 5]);
  });

  it('should sort arrays with negative numbers', function() {
    var input = [20, -10, -10.1, 2, 4, 299];
    var expected = [-10.1, -10, 2, 4, 20, 299];
    converter.bubbleSort(input).should.eql(expected);
  });
});

describe('mergeSort', function() {
  it('should exist', function() {
    should.exist(converter.mergeSort);
  });

  it('should be a function', function() {
    converter.mergeSort.should.be.a.Function;
  });

  it('should return an array', function() {
    var result = converter.mergeSort([1]);
    should.exist(result);
    result.should.be.an.instanceof(Array);
  });

  it('should return an array with a single number', function() {
    var result = converter.mergeSort([1]);
    result.should.be.eql([1]);
  });

  it('should sort a short array of integers', function() {
    var result = converter.mergeSort([8, 7, 3, 6, 9, 2, 4, 5, 1]);
    result.should.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should not use Array.sort', function() {
    var _sort = Array.prototype.sort;
    Object.defineProperty(Array.prototype, 'sort', {enumerable: false,
      value: function () {
        should.fail(null, null, 'Array.sort called! That\'s cheating.', null);
      }
    });
    var result = converter.mergeSort([8, 7, 3, 6, 9, 2, 4, 5, 1]);
    Object.defineProperty(Array.prototype, 'sort', {enumerable: false,
      value: _sort
    });
  });

});