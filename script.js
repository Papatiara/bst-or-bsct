const NODE_CLASSNAME = "nodeStyle";

const nodeElement = (input) => {
  const element = document.createElement("div");
  element.textContent = input;
  element.classList.add(NODE_CLASSNAME);
  element.left = null;
  element.right = null;
  return element;
}


class BinarySearchTree {
  constructor() {
    this.root = null
  }
  
  insert(input) {
    const newNode = nodeElement(input);     
    if (this.root === null) {
      this.root = newNode
      document.body.appendChild(newNode); 
    } else {
      this.insertNode(this.root,newNode);
    }
  }
    
  insertNode(node, newNode) {
    let nodeValue = node.textContent
       if (nodeValue.includes('*')){
        nodeValue = nodeValue.split('*')[0];
     }
   
    const edge = document.createElement("div");
    if (Number(newNode.textContent) > Number(nodeValue)) {
        if(node.left === null) {
          edge.classList.add("edge-left")
          edge.textContent = '*';
          node.appendChild(edge);
          node.left = newNode;
          edge.appendChild(newNode);
        } else {
          this.insertNode(node.left, newNode);
        }
    } else if (Number(newNode.textContent) < Number(nodeValue)) {
         if(node.right === null) {
          edge.classList.add("edge-right");
          edge.textContent = '*';
          node.appendChild(edge)
          node.right = newNode;
          edge.appendChild(newNode);
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
    } 
    const formatingNodeValue = node.textContent.replace(/ /g,'').split('*');
    const nodeRootValue = formatingNodeValue[0]
    if (Number(value) > Number(nodeRootValue)) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (Number(value) < Number(nodeRootValue)) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node.remove();
        return node;      
      } if (node.left) {
         node.textContent = node.left.textContent;
         return node;
      } else if (node.right) {
         node.textContent = node.right.textContent;
         return node;
      }
    
    }
  }
}


const tree = new BinarySearchTree()

const addingNode = document.getElementById("valueAdded").addEventListener("click", () => {
  const toBeAdded = document.getElementById("value").value;
  const warning = document.createElement('div');
  warning.classList.add("warning");
  if (Number.isNaN(Number(toBeAdded)) || toBeAdded === "") {
    warning.textContent = 'the value should be an integer'
    document.body.appendChild(warning);
  } else {
    tree.insert(toBeAdded);
  }
  document.getElementById("value").value = ' ';
});

const removingNode = document.getElementById("valueRemoved").addEventListener("click", () => {
  const toBeRemoved = document.getElementById("value").value;
  document.getElementById("value").value = ' ';
  tree.remove(toBeRemoved);
});


const removeWarning = document.getElementById("value").addEventListener("click", () => {
  if (document.getElementsByClassName("warning").length > 0) {
    document.body.removeChild(document.getElementsByClassName("warning")[0]);
  }
});
