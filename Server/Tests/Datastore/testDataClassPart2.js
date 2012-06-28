




var orderByError;

function orderByAscendingTestNumberValues_BTree(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByAscendingTestNumberValues_Cluster(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((8!== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByAscendingTestNumberValues_Keywords(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByAscendingTestNumberValues_Automatic(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByDescendingTestNumberValues_BTree(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByDescendingTestNumberValues_Cluster(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((9!== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByDescendingTestNumberValues_Keywords(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
function orderByDescendingTestNumberValues_Automatic(thisArg, iterator)
{
    switch(iterator+1)
    {
        case 1:
            //Y.Assert.areSame(7,thisArg.ID , "orderBy failed.");
            if ((1 !== thisArg.ID) && orderByError=="")
                orderByError = "orderBy failed.";
          break;
        case 2:
            //Y.Assert.areSame(2, thisArg.ID, "orderBy failed.");
            if ((4 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 3:
            //Y.Assert.areSame(6, thisArg.ID, "orderBy failed.");
            if ((6 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 4:
            //Y.Assert.areSame(3, thisArg.ID, "orderBy failed.");
            if ((2 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 5:
            //Y.Assert.areSame(4, thisArg.ID, "orderBy failed.");
            if ((10 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 6:
            //Y.Assert.areSame(1, thisArg.ID, "orderBy failed.");
            if ((9 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 7:
            //Y.Assert.areSame(5, thisArg.ID, "orderBy failed.");
            if ((7 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        case 8:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((5 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 9:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((3 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
		 case 10:
            //Y.Assert.areSame(8, thisArg.ID, "orderBy failed.");
            if ((8 !== thisArg.ID) && orderByError == "")
                orderByError = "orderBy failed.";
          break;
        default:
            //Y.Assert.fail("orderBy failed.");
            if (orderByError == "")
                orderByError = "orderBy failed.";
    }
};
var testCase = {
    name: "Datastore test(Part2)",
    
        _should: {
        ignore: {
        }
    },
	// Tests of indexed attributes
   //second param case sensivity
    testOrderBy_AscParamCaseSensivity_BTreeIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Btree Asc"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Btree Asc");
        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_BTree);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_AscParamCaseSensivity_ClusterIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Cluster Asc"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Cluster Asc");
        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_Cluster);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_AscParamCaseSensivity_KeywordsIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Keywords Asc"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Keywords Asc");
        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_Keywords);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_AscParamCaseSensivity_AutomaticIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Automatic Asc"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Automatic Asc");
        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_Automatic);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_DescParamCaseSensivity_BTreeIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Btree DESC"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Btree DESC");
        orderByError = "";
        entityColAsc.forEach(orderByDescendingTestNumberValues_BTree);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_DescParamCaseSensivity_ClusterIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Cluster DESC"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Cluster DESC");
        orderByError = "";
        entityColAsc.forEach(orderByDescendingTestNumberValues_Cluster);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_DescParamCaseSensivity_KeywordsIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Keywords DESC"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Keywords DESC");
        orderByError = "";
        entityColAsc.forEach(orderByDescendingTestNumberValues_Keywords);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_DescParamCaseSensivity_AutomaticIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy("cnum_Automatic DESC"), "Syntax failed : ds.MyClass1.orderBy('cnum_Btree','Asc').");
        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy("cnum_Automatic DESC");
        orderByError = "";
        entityColAsc.forEach(orderByDescendingTestNumberValues_Automatic);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    //Same param twice Asc
    testOrderBy_SameAttributeTwiceAsc_BTreeIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Btree,cnum_Btree'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Btree,cnum_Btree').");
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Btree, ds.MyClass_IndexedAttributes.cnum_Btree), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Btree, ds.MyClass1.cnum_Btree).");

        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy('cnum_Btree asc,cnum_Btree asc');

        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_BTree);
        if (orderByError != "")
            Y.Assert.fail(orderByError);

        entityColAsc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Btree, ds.MyClass_IndexedAttributes.cnum_Btree, 'asc');

        entityColAsc.forEach(orderByAscendingTestNumberValues_BTree);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceAsc_ClusterIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Cluster,cnum_Cluster'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Cluster,cnum_Cluster').");
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Cluster, ds.MyClass_IndexedAttributes.cnum_Cluster), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Cluster, ds.MyClass1.cnum_Cluster).");

        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy('cnum_Cluster asc,cnum_Cluster asc');

        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_Cluster);
        if (orderByError != "")
            Y.Assert.fail(orderByError);

        entityColAsc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Cluster, ds.MyClass_IndexedAttributes.cnum_Cluster, 'asc');

        entityColAsc.forEach(orderByAscendingTestNumberValues_Cluster);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceAsc_KeywordsIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Keywords,cnum_Keywords'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Keywords,cnum_Keywords').");
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Keywords, ds.MyClass_IndexedAttributes.cnum_Keywords), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Keywords, ds.MyClass1.cnum_Keywords).");

        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy('cnum_Keywords asc,cnum_Keywords asc');

        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_Keywords);
        if (orderByError != "")
            Y.Assert.fail(orderByError);

        entityColAsc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Keywords, ds.MyClass_IndexedAttributes.cnum_Keywords, 'asc');

        entityColAsc.forEach(orderByAscendingTestNumberValues_Keywords);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceAsc_AutomaticIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Automatic,cnum_Automatic'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Automatic,cnum_Automatic').");
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Automatic, ds.MyClass_IndexedAttributes.cnum_Automatic), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Automatic, ds.MyClass1.cnum_Automatic).");

        var entityColAsc = ds.MyClass_IndexedAttributes.orderBy('cnum_Automatic asc,cnum_Automatic asc');

        orderByError = "";
        entityColAsc.forEach(orderByAscendingTestNumberValues_Automatic);
        if (orderByError != "")
            Y.Assert.fail(orderByError);

        entityColAsc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Automatic, ds.MyClass_IndexedAttributes.cnum_Automatic, 'asc');

        entityColAsc.forEach(orderByAscendingTestNumberValues_Automatic);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
	//Same param twice Desc
    testOrderBy_SameAttributeTwiceDesc_BTreeIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Btree,cnum_Btree'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Btree,cnum_Btree').");
        

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy('cnum_Btree desc,cnum_Btree desc');

        orderByError = "";
        entityColDesc.forEach(orderByDescendingTestNumberValues_BTree);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
	testOrderBy_SameAttributeTwiceDesc_BTreeIndexedAttribute_AttributeList: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Btree, ds.MyClass_IndexedAttributes.cnum_Btree), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Btree, ds.MyClass1.cnum_Btree).");
		
        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Btree, ds.MyClass_IndexedAttributes.cnum_Btree, 'desc');

        entityColDesc.forEach(orderByDescendingTestNumberValues_BTree);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceDesc_ClusterIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Cluster,cnum_Cluster'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Cluster,cnum_Cluster').");

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy('cnum_Cluster desc,cnum_Cluster desc');

        orderByError = "";
        entityColDesc.forEach(orderByDescendingTestNumberValues_Cluster);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceDesc_ClusterIndexedAttribute_AttributeList: function() {
   
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Cluster, ds.MyClass_IndexedAttributes.cnum_Cluster), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Cluster, ds.MyClass1.cnum_Cluster).");

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Cluster, ds.MyClass_IndexedAttributes.cnum_Cluster, 'desc');

        entityColDesc.forEach(orderByDescendingTestNumberValues_Cluster);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceDesc_KeywordsIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Keywords,cnum_Keywords'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Keywords,cnum_Keywords').");

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy('cnum_Keywords desc,cnum_Keywords desc');

        orderByError = "";
        entityColDesc.forEach(orderByDescendingTestNumberValues_Keywords);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
	testOrderBy_SameAttributeTwiceDesc_KeywordsIndexedAttribute_AttributeList: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Keywords, ds.MyClass_IndexedAttributes.cnum_Keywords), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Keywords, ds.MyClass1.cnum_Keywords).");

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Keywords, ds.MyClass_IndexedAttributes.cnum_Keywords, 'desc');

        entityColDesc.forEach(orderByDescendingTestNumberValues_Keywords);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceDesc_AutomaticIndexedAttribute: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy('cnum_Automatic,cnum_Automatic'), "orderBy the same attribute twice failed : ds.MyClass1.orderBy('cnum_Automatic,cnum_Automatic').");

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy('cnum_Automatic desc,cnum_Automatic desc');

        orderByError = "";
        entityColDesc.forEach(orderByDescendingTestNumberValues_Automatic);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
    testOrderBy_SameAttributeTwiceDesc_AutomaticIndexedAttribute_AttributeList: function() {
        Y.Assert.isObject(ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Automatic, ds.MyClass_IndexedAttributes.cnum_Automatic), "orderBy the same attribute twice failed : ds.MyClass1.orderBy(ds.MyClass1.cnum_Automatic, ds.MyClass1.cnum_Automatic).");

        var entityColDesc = ds.MyClass_IndexedAttributes.orderBy(ds.MyClass_IndexedAttributes.cnum_Automatic, ds.MyClass_IndexedAttributes.cnum_Automatic, 'desc');

        entityColDesc.forEach(orderByDescendingTestNumberValues_Automatic);
        if (orderByError != "")
            Y.Assert.fail(orderByError);
    },
};