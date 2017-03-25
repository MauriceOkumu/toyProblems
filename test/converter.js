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
    should.exist(converter.nthFibonacci);
  });

  it('should be a function', function() {
    should.exist(converter.nthFibonacci);
    converter.nthFibonacci.should.be.a.Function;
  });

  it('should return integers', function() {
    var result = converter.nthFibonacci(0);
    should.exist(result);
    result.should.be.a.Number;
  });

  it('should handle the base cases with ease', function() {
    converter.nthFibonacci(0).should.equal(0);
    converter.nthFibonacci(1).should.equal(1);
  });

  it('should return the nth Fibonacci number for a given n', function() {
    converter.nthFibonacci(5).should.equal(5);
    converter.nthFibonacci(10).should.equal(55);
    converter.nthFibonacci(20).should.equal(6765);
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
      converter.nthFibonacci(i++);
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

});

describe('makeHashTable', function() {
  it('should exist', function() {
    should.exist(converter.makeHashTable);
  });
  it('should be a function', function() {
    converter.makeHashTable.should.be.a.Function;
  });
  it('should return a hash table', function() {
    var hashTable = converter.makeHashTable();
    should.exist(hashTable);
    hashTable.should.be.an.Object;
  });
  it('should return different instances of hash tables each time', function() {
    var hashTable1 = converter.makeHashTable();
    should.exist(hashTable1);

    var hashTable2 = converter.makeHashTable();
    should.exist(hashTable2);
    hashTable1.should.not.be.equal(hashTable2);
    // `converter.makehashTable()` should create a new hash table object instance
    // everytime but it's not!
  });
});

describe('hashTable', function() {
  describe('#insert', function() {
    it('should exist as a method of hashtable instances', function() {
      var hashTable = converter.makeHashTable();
      should.exist(hashTable.insert);
    });
    it('should take exactly two arguments. a key and a value', function() {
      var hashTable = converter.makeHashTable();
      hashTable.insert.length.should.equal(2);
      /**
        a hashtable gets its awesomeness from associating data. it wouldn't be
        very useful if you just gave it data without any association.
        ie, bad hash table:
        you: hey hashtable, can you please remember "sarah" (key)?
        hashtable: um... okay?
        ... sometime later...
        you: hey hastable, when's "sarah"'s (key) birthday?
        hashtable: "sarah"
        you: Um.. this is awkward...
        ie, good hashtable:
        you: hey hashtable, please remember that "sarah"s (key) birthday is
        "January 23rd" (value)
        hashtable: okay, friend. you got it!
        ... sometime later ...
        you: hey hashtable, when's "sarah"'s (key) birthday?
        hashtable: "January 23rd"
        you: thanks hashtable, you're awesome!
        hashtable: i know
      */
    });
    it('should not throw an error with valid input', function() {
      (function() {
        var hashTable = converter.makeHashTable();
        hashTable.insert('keanu reeves best movie', 'The Matrix');
        // calling insert should not throw an error
      }).should.not.throw();
    });
    it('should allow keys to be reinserted with new values', function() {
      var hashTable = converter.makeHashTable();
      (function() {
        hashTable.insert('keanu reeves best movie', 'Bill & Ted\'s Excellent Adventure');
        hashTable.insert('keanu reeves best movie', 'The Matrix');
      }).should.not.throw();
    });
  });

  describe('#retrieve', function() {
    it('should be a method of hashTable instances', function() {
      var hashTable = converter.makeHashTable();
      should.exist(hashTable.retrieve);
    });
    it('should be a function', function() {
      var hashTable = converter.makeHashTable();
      hashTable.retrieve.should.be.a.Function;
    });
    it('should take exactly one argument', function() {
      var hashTable = converter.makeHashTable();
      // the retrieve function should only take a single `key` argument
      hashTable.retrieve.length.should.equal(1);
    });
    it('should return values previously inserted', function() {
      var hashTable = converter.makeHashTable();
      hashTable.insert('William Shatner\'s most well known role', 'Captain Kirk');
      var value = hashTable.retrieve('William Shatner\'s most well known role');
      should.exist(value);
      value.should.be.equal('Captain Kirk');
    });
    it('should return undefined for unknown keys', function() {
      var hashTable = converter.makeHashTable();
      should.not.exist(hashTable.retrieve('echo?'));
    });
  });

  describe('#insert', function() {
    it('should allow values to be updated', function() {
      var hashTable = converter.makeHashTable();
      hashTable.insert('Tarantino\'s best movie', 'Jackie Brown');
      hashTable.insert('Tarantino\'s best movie', 'Pulp Fiction');
      var value = hashTable.retrieve('Tarantino\'s best movie');
      should.exist(value);
      value.should.be.equal('Pulp Fiction');
    });
  });

  describe('#remove', function() {
    it('should exist as a method of the hashTable instance', function() {
      var hashTable = converter.makeHashTable();
      should.exist(hashTable.remove);
    });
    it('should be a function', function() {
      var hashTable = converter.makeHashTable();
      hashTable.remove.should.be.a.Function;
    });
    it('should take exactly one argument', function() {
      var hashTable = converter.makeHashTable();
      // the remove function should only take a single `key` argument
      hashTable.remove.length.should.equal(1);
    });
    it('should allow values to be removed', function() {
      var hashTable = converter.makeHashTable();
      hashTable.insert('Spielberg\'s best movie', 'Jaws');
      hashTable.remove('Spielberg\'s best movie');
      var value = hashTable.retrieve('Spielberg\'s best movie');
      should.not.exist(value);
    });
  });

  describe('#insert', function() {
    it('should handle collisions', function() {
      var hashTable = converter.makeHashTable();
      (function() {
        var n = 1000;
        for (var i = 0; i < n; i++) {
          hashTable.insert('userid:' + (i++), 'Jamie Hyneman');
        }
      }).should.not.throw();
    });
  });
});