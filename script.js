let nodeElement = (input) => {
  let result = document.createElement("div");
  result.textContent = input;
  result.classList.add("root");
  result.left = null
  result.right = null
  return result
}


class BinarySearchTree {
  constructor() {
    this.root = null
  }
  
  insert(input) {
    let newNode = nodeElement(input);     
    if (this.root === null) {
      this.root = newNode
      document.body.appendChild(newNode)  
    } else {
      this.insertNode(this.root,newNode)
    }
  }
    
  insertNode(node, newNode) {
    let nodeValue = node.textContent
       if (nodeValue.includes('*')){
        nodeValue = nodeValue.split('*')[0]
     }
   
    let edge = document.createElement("div");
    if (Number(newNode.textContent) > Number(nodeValue)) {
        if(node.left === null) {
          edge.classList.add("edge-left")
          edge.textContent = '*';
          node.appendChild(edge)
          node.left = newNode;
          edge.appendChild(newNode)
        } else {
          this.insertNode(node.left, newNode)
        }
    } else if (Number(newNode.textContent) < Number(nodeValue)) {
         if(node.right === null) {
          edge.classList.add("edge-right")
          edge.textContent = '*';
          node.appendChild(edge)
          node.right = newNode;
          edge.appendChild(newNode)
        } else {
          this.insertNode(node.right, newNode)
        }
     }
   }
  
  remove(value) {
    this.root = this.removeNode(this.root, value);
  }
  
  removeNode(node, value) {
    if (node === null) {
      return null;
    } else if (Number(value) > Number(node.textContent)) {
        node.left = this.removeNode(node.left, value);
        return node
    } else if (Number(value) < Number(node.textContent)) {
        node.right = this.removeNode(node.right, value);
    } else {
      if (node.left === null && node.right === null)  {
        node = null;
        return node;
      } if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
    }
  }
}


let class2 = new BinarySearchTree()

let addValue = document.getElementById("valueAdded").addEventListener("click", () => {
  let input = document.getElementById("value").value;
  let warning = document.createElement('div')
  warning.classList.add("warning")
  if (Number.isNaN(Number(input)) || input === "") {
    warning.textContent = 'the value should be an integer'
    document.body.appendChild(warning)
  } else {
    class2.insert(input)
  }
  document.getElementById("value").value = ' ';
});

let removeValue = document.getElementById("valueRemoved").addEventListener("click", () => {
  let removed = document.getElementById("value").value
  document.getElementById("value").value = ' '
  class2.remove(removed)
});


let removeWarning = document.getElementById("value").addEventListener("click", () => {
  if (document.getElementsByClassName("warning").length > 0) {
    document.body.removeChild(document.getElementsByClassName("warning")[0])
  }
});
