'use strict';

var List = require('../list.js');
var assert = require('assert');

function ListElement(i) {
  this.i = i;
  this.list = new List(this);
}

describe('list', function() {
  it('add element1, element2, element3, ..., element10', function() {
    var list = new List();

    for (var i = 1; i <= 10; ++i) {
      (new ListElement(i)).list.addTo(list);
    }

    var j = 10;

    list.forEachEntry(function(entry) {
      assert.equal(entry.i, j--);
    });
  });

  it('addToTail element1, element2, element3, ..., element10', function() {
    var list = new List();

    for (var i = 1; i <= 10; ++i) {
      (new ListElement(i)).list.addToTail(list);
    }

    var j = 1;

    list.forEachEntry(function(entry) {
      assert.equal(entry.i, j++);
    });
  });

  it('del one element', function() {
    var list = new List();

    for (var i = 1; i <= 3; ++i) {
      (new ListElement(i)).list.addToTail(list);
    }

    list.forEachSafe(function(one) {
      one.del();
    });

    assert(list.empty());
  });

  it('join two list', function() {
    var list1 = new List();
    var list2 = new List();
    var i = 1;

    for (; i <= 3; ++i) {
      (new ListElement(i)).list.addToTail(list1);
    }

    for (; i <= 6; ++i) {
      (new ListElement(i)).list.addToTail(list2);
    }

    list2.joinTail(list1);

    var j = 1;

    list1.forEachEntry(function(entry) {
      assert.equal(entry.i, j++);
    });
  });

  it('traverse a list in reverse order', function() {
    var list = new List();

    for (var i = 1; i <= 10; ++i) {
      (new ListElement(i)).list.addToTail(list);
    }

    var j = 10;

    list.forEachPrev(function(head) {
      assert.equal(head.entry.i, j--);
    });
  });
});
