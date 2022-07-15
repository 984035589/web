/**
 * 单向链表
 */
class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null;
    this.size = 0;
  }

  add(index, node) {
    if (arguments.length === 1) {
      node = index;
      index = this.size;
    }
    if (index < 0 || index > this.size) {
      throw Error("越界了");
    }
    if (index === 0) {
      const head = this.head;
      this.head = new Node(node, head);
    } else {
      const preNode = this.get(index - 1);
      preNode.next = new Node(node, preNode.next);
    }
    this.size++;
  }

  get(index) {
    if (index < 0 || index >= this.size) {
      throw Error("越界了");
    }
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  remove(index) {
    let rmNode;
    if (index === 0) {
      rmNode = this.head;
      if (!rmNode) {
        return undefined;
      }
      this.head = rmNode.next;
    } else {
      const preNode = this.get(index - 1);
      rmNode = preNode.next;
      preNode.next = rmNode.next;
    }
    this.size--;
    return rmNode;
  }

  set(index, node) {
    if (index < 0 || index >= this.size) {
      throw Error("越界了");
    }
    this.get(index).element = node;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}

// const linkedList = new LinkedList();
// linkedList.add("node1");
// linkedList.add("node3");
// linkedList.add(1, "node2");
// linkedList.remove(2);
// linkedList.set(1, "node2-2");
// linkedList.clear();
// console.log(linkedList);

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enQueue(node) {
    this.linkedList.add(node);
  }

  deQueue() {
    return this.linkedList.remove(0);
  }
}

module.exports = Queue;

// const queue = new Queue();
// queue.enQueue("1");
// queue.enQueue("2");
// console.log(queue.deQueue());
// console.log(queue.deQueue());
// console.log(queue.deQueue());
// console.log(queue);
