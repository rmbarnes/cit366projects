function Set() {
	
	
	this.intersection = function(listA, listB) {

	   var resultList = [];

	   if (listA === null || listB === null) {
           return null;
       }

       for (var i = 0; i < listA.length; i++) {
	   		var nextValue = listA[i];

	   		for (var j = 0; j < listB.length; j++) {
	   			if (listB[j] === nextValue) {
	   				resultList.push(listB[j]);
	   				break;
				}
			}
	   }
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        var symmDiff = this.symmetricDifference(listA, listB);
        var intersection = this.intersection(listA, listB);

        resultList = this.copy(resultList, symmDiff);
        resultList = this.copy(resultList, intersection);

	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];
            var found = false;

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    found = true;
                    break;
                }

            }
            if (!found) {
                resultList.push(nextValue);
            }
        }

        return resultList;

    }



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }


        var relCompA = this.relativeComplement(listA, listB);
        var relCompB = this.relativeComplement(listB, listA);


        resultList = this.copy(resultList, relCompA);
        resultList = this.copy(resultList, relCompB);



        return resultList;
	}
	

	this.copy = function(resultList, list) {
        for (i = 0; i < list.length; i++) {
            resultList.push(list[i]);

        }
        return resultList;
    }
}
