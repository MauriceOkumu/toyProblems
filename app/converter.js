exports.bubbleSort = function(arr) {
	var swap = function (index1, index2, array) {
	  var temp = arr[index1];
	  array[index1] = arr[index2];
	  array[index2] = temp;
	  return arr;
	}
  // do {
  // 	var swapped = false;
  // 	for ( var i = 0; i < copyArray.length; i++) {
  // 	  if (copyArray[i] > copyArray[i + 1]) {
  // 	  	var temp = copyArray[i];
  // 	  	copyArray[i] = copyArray[i + 1];
  // 	  	copyArray[i + 1] = temp;
  // 	  	swapped = true;
  // 	  }
  // 	}

  // }while( swapped )
  for ( var i = 0; i < arr.length; i++) {
  	var swaps = 0;
  	for ( var j = 0; j< arr.length - 1 - i; j++) {
  		if (arr[j] > arr[j +1]) {
  			swaps++
  			swap(j, j+1, arr)
  		}
  	}
  }
  return arr;
}

 var stitch = function (left, right) {
   var result = [];
   while(left.length && right.length) {
   	if(left[0] <= right[0]) {
   	  result.push(left.shift());
   	}else{
   	  result.push(right.shift())
   	}
   }
  return [...result,...left,...right]
 }
exports.mergeSort = function(arr) {
  if ( arr.length < 2) { return arr;}
 var middle = Math.floor(arr.length / 2);
 var left = arr.slice(0, middle);
 var right = arr.slice(middle, arr.length);
 var sortedLeft = this.mergeSort(left);
 var sortedRight = this.mergeSort(right);

  return stitch(sortedLeft, sortedRight);
}

exports.asyncMap = function(tasks, callback) {
  var results = [];
  var count = 0;
  for ( var i = 0; i < tasks.length; i++) {
    (function(i) {
      tasks[i](function(value) {
        results[i] = value;
        count++;
        if ( count === tasks.length) {
          callback(results);
        }
      })
    })(i)
  }
}

exports.nthFibonacci = function(n) {
  var fibs = [0, 1];
  for(;n > 1; n--) {
    fibs.push(fibs.shift() + fibs[0])
  }
  return fibs[n];
}

var getIndexBelowMaxForKey = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

exports.makeHashTable = function() {
   var hashTable = {};
   var result = [];
   var storageLimit = 1000;

   hashTable.insert = function(key, value) {

    var index = getIndexBelowMaxForKey(key, storageLimit);
    result[index] = result[index] || [];
    var pairs = result[index];
    var pair; 
    var replaced = false;
    for( var i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      if ( pair[0] === key) {
        pair[1] = value;
        replaced = true;
      }
    }
    if(!replaced) {
      pairs.push([key, value])
    } 
   };

   hashTable.retrieve = function(key) {
    var index = getIndexBelowMaxForKey(key, storageLimit);
    var pairs = result[index];
    if (!pairs) { return;} 
    var pair;
    for ( var i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      if( pair && pair[0] === key) {
        return pair[1];
      }
    }
   };

   hashTable.remove = function(key) {
    var index = getIndexBelowMaxForKey(key, storageLimit);
    var pairs = result[index];
    var pair;

    for ( var i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      if (pair[0] === key) {
        var value = pair[1];
        delete pairs[i];
        return value;
      }
    }
   };



   return hashTable;
}