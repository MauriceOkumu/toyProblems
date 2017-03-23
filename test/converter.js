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

describe('asyncMap', function() {

  it('should exist', function() {
    should.exist(converter.asyncMap);
  });

  it('should be a function', function() {
    converter.asyncMap.should.be.a.Function;
  });

  it('should take two arguments', function() {
    converter.asyncMap.length.should.equal(2);
  });

  it('should pass the completed tasks to its callback', function(done) {

    var wait2For2 = function(callback) {
      setTimeout(function () {
        callback(2);
      }, 200);
    };

    var wait3For1 = function(callback) {
      setTimeout(function() {
        callback(1);
      }, 300);
    };

    converter.asyncMap([wait2For2, wait3For1], function(results) {
      /* This should work regardless of order because of
       * the time it takes to execute these 2 functions
       */
      results.should.eql([2, 1]);
      results.length.should.equal(2);
      done();
    });

  });

  it('should pass the completed tasks to its callback in the correct order', function(done) {

    var wait3For1 = function (callback) {
      setTimeout(function() {
        callback(1);
      }, 300);
    };

    var wait2For2 = function (callback) {
      setTimeout(function() {
        callback(2);
      }, 200);
    };

    converter.asyncMap([wait3For1, wait2For2], function(results) {
      results.should.eql([1, 2]);
      done();
    });

  });

  it('should handle more than two async functions in the correct order', function(done) {
    var wait2For2 = function (callback) {
      setTimeout(function() {
        callback(2);
      }, 200);
    };

    var wait5For4 = function (callback) {
      setTimeout(function() {
        callback(4);
      }, 500);
    };

    var wait1For3 = function (callback) {
      setTimeout(function() {
        callback(3);
      }, 100);
    };

    var wait3For1 = function (callback) {
      setTimeout(function() {
        callback(1);
      }, 300);
    };

    var wait1For5 = function (callback) {
      setTimeout(function() {
        callback(5);
      }, 100);
    };

    converter.asyncMap([wait3For1, wait2For2, wait1For3, wait5For4, wait1For5], function(results) {
      results.should.eql([1, 2, 3, 4, 5]);
      done();
    });

  });

});

describe('nthFibonacci', function() {
  it('should exist', function() {
    should.exist(nthFibonacci);
  });

  it('should be a function', function() {
    should.exist(nthFibonacci);
    nthFibonacci.should.be.a.Function;
  });

  it('should return integers', function() {
    var result = nthFibonacci(0);
    should.exist(result);
    result.should.be.a.Number;
  });

  it('should handle the base cases with ease', function() {
    nthFibonacci(0).should.equal(0);
    nthFibonacci(1).should.equal(1);
  });

  it('should return the nth Fibonacci number for a given n', function() {
    nthFibonacci(5).should.equal(5);
    nthFibonacci(10).should.equal(55);
    nthFibonacci(20).should.equal(6765);
  });

  it('should produce values in linear time', function() {
    // all this crazyness does it check if your solution is better than
    // the naive, exponential solution.
    var diffs = [];
    var start = 0;
    var end = 0;
    var i = 0;
    var maxDiff = 100;
    var maxDur = 1000;
    var init = new Date;

    while ( end - start < maxDiff && end - init < maxDur) {
      start = new Date();
      nthFibonacci(i++);
      end = new Date();
      diffs.push(end - start);
    }
    var avg = function(array) {
      var n = 0;
      var sum = 0;
      for (var i = 0; i < array.length; i++) {
        sum += array[i];
      }
      return sum / array.length;
    };
    var expectedDurRatio = i / (end - init);
    var actualDurRatio = diffs[diffs.length - 1] / (end - init);
    // if the computational duration is increasing linearly, the last computation
    // should make up less than 10% of the total computation.
    actualDurRatio.should.be.below(0.1);
  });

  it('should not use recursion', function() {
    // if you've gotten this far, you're doing great!
    // this is checking if your `nthFibonacci` function is at some point
    // calling itself (making it a recursive function)
    // Note: this test may produce a false positive if you have a comment 
    // in your `nthFibonacci` function that contains the string literal 
    // "nthFibonacci" somewhere within it.
    nthFibonacci.toString().match(/nthFibonacci/).should.not.have.length.above(1);
  });

});