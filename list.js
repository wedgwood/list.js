'use strict';

function List(entry) {
  this.init();
  this.entry = entry;
}

List.prototype.init = function() {
  this.next = this.prev = this;
};

List.prototype.empty = function() {
  return this.next === this.prev;
};

List.prototype.add_ = function(prev, next) {
  prev.next = next.prev = this;
  this.prev = prev;
  this.next = next;
};

List.prototype.addTo = function(head) {
  this.add_(head, head.next);
};

List.prototype.addToTail = function(head) {
  this.add_(head.prev, head);
};

function del(prev, next) {
  next.prev = prev;
  prev.next = next;
}

List.prototype.del = function() {
  del(this.prev, this.next);
  this.next = this.prev = null;
};

List.prototype.delInit = function(list) {
  del(this.prev, this.next);
  this.init();
};

List.prototype.move = function(head) {
  del(this.prev, this.next);
  this.add(head);
};

List.prototype.moveTail = function(list) {
  del(this.prev, this.next);
  this.addTail(list);
};

List.prototype.isLast = function(head) {
  return this.next === head;
};

List.prototype.splice_ = function(head) {
  var first = this.next;
  var last = this.prev;
  var at = head.next;

  first.prev = head;
  head.next = first;
  last.next = at;
  at.prev = last;
};

List.prototype.join = List.prototype.splice = function(head) {
  if (!this.empty()) {
    this.splice_(head);
  }
};

List.prototype.joinInit = List.prototype.spliceInit = function(head) {
  if (!this.empty()) {
    this.splice_(head);
    this.init();
  }
};

List.prototype.joinTail = function(head) {
  head.splice(head.prev);
};

List.prototype.joinTailInit = function(head) {
  head.spliceInit(head.prev);
};

List.prototype.forEach = function(cb) {
  for (var pos = this.next; pos !== this; pos = pos.next) {
    if (false === cb(pos)) {
      break;
    }
  }
};

List.prototype.forEachPrev = function(cb) {
  for (var pos = this.prev; pos !== this; pos = pos.prev) {
    if (false === cb(pos)) {
      break;
    }
  }
};

List.prototype.forEachEntry = function(cb) {
  this.forEach(function(pos) {
    return cb(pos.entry);
  });
};

List.prototype.forEachSafe = function(cb) {
  var pos = this.next;
  var n = pos.next;

  for (; pos !== this; pos = n, n = pos.next) {
    if (false === cb(pos)) {
      break;
    }
  }
};

module.exports = List;
