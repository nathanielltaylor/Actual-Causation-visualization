var finalOutputs = [];
var effects = [];

function causeAnchor1() {
  clearCauses();
  var alpha;
  if (effects.length == 2) {
    alpha = 0.1922
    network.nodes[1].causeLevel = alpha;
    network.nodes[7].causeLevel = alpha;
    network.nodes[9].causeLevel = alpha;
  } else if (effects[0] == 'Node 1') {
    alpha = 0.4656;
    network.nodes[8].causeLevel = alpha; //remember outputs are switched from TF model
  } else if (effects[0] == 'Node 2') {
    alpha = 0.1636;
    network.nodes[9].causeLevel = alpha;
  }
  alphaBox.html('α = ' + str(alpha));
}

function causeAnchor2() {
  clearCauses();
  var alpha;
  if (effects.length == 2) {
    alpha = 0.2839
    network.nodes[3].causeLevel = alpha;
    network.nodes[6].causeLevel = alpha;
    network.nodes[7].causeLevel = alpha;
  } else if (effects[0] == 'Node 1') {
    alpha = 0.5456;
    network.nodes[0].causeLevel = alpha; //remember outputs are switched from TF model
  } else if (effects[0] == 'Node 2') {
    alpha = 0.8022;
    network.nodes[9].causeLevel = alpha;
  }
  alphaBox.html('α = ' + str(alpha));
}

// function findActualCause() {
//   var alpha;
//   if (effects.length == 2) {
//     alpha = 0.1922
//     network.nodes[1].causeLevel = alpha;
//     network.nodes[7].causeLevel = alpha;
//     network.nodes[9].causeLevel = alpha;
//   } else if (effects[0] == 'Node 1') {
//     alpha = 0.4656;
//     network.nodes[8].causeLevel = alpha; //remember outputs are switched from TF model
//   } else if (effects[0] == 'Node 2') {
//     alpha = 0.1636;
//     network.nodes[9].causeLevel = alpha;
//   }
//   alphaBox.html('α = ' + str(alpha));  
// }

function clearCauses() {
  for (i=0;i<network.nodes.length;i++) {
    network.nodes[i].causeLevel = 0;
  }
  alphaBox.html('');
}

function mousePressed() {
  var d1, d2; 
  d1 = dist(mouseX, mouseY, 640, 300);
  d2 = dist(mouseX, mouseY, 640, 390);
  fill(color(100, 50, 150));
  if (d1 < 16) {
    clearCauses();
    network.nodes[17].selected = !network.nodes[17].selected;
    if (network.nodes[17].selected) {
      effects.unshift('Node 1');
    } else {
      effects = effects.filter(w => w != 'Node 1');
    }
  } else if (d2 < 16) {
    clearCauses();
    network.nodes[18].selected = !network.nodes[18].selected;
    if (network.nodes[18].selected) {
      effects.push('Node 2');
    } else {
      effects = effects.filter(w => w != 'Node 2');
    }
  }
  var nodeStrings = 'None';
  if (effects.length > 0) {
    nodeStrings = effects.join(' and ');
    causationButton.show();
    causationButton2.show();
  } else {
    causationButton.hide();
    causationButton2.hide();
  }
  causationBody.html('Selected nodes: ' + nodeStrings);
}

function run() {
  result.html('');
  finalOutputs = [];
  const vector = input.value();
  title.html('Input: ' + vector);
  input.value('');
  v = vector.split(',');
  for (i=0;i<10;i++) {
    v[i] = int(v[i]);
  }
  network.feedforward(...v);
}

function connectLayers(layer1, layer2, weights) {
    for (i=0;i<layer1.length;i++) {
        for (j=0;j<layer2.length;j++) {
         network.connect(layer1[i], layer2[j], weights[i][j]);
        }
    }
}

function printLabels() {
  var cl, clString;
  cl = str(Math.round(finalOutputs[0])) + str(Math.round(finalOutputs[1]));
  if (cl == '00') {
    clString = 'Iris setosa';
  } else if (cl == '01') {
    clString = 'Iris versicolor';
    cl = '10'; //make label order match TF model
  } else if (cl == '10') {
    clString = 'Iris virginica';
    cl = '01';
  } else {
    clString = 'Not a known species';
  }
  result.html('Classification: ' + cl + ', ' + clString);
}

function Connection(from, to, w) {
    this.a = from;
    this.b = to;
    this.weight = w;
    this.sending = false;
    this.sender = null;
    this.output = 0;
    
    
    this.feedforward = function(val) {
      this.output = val*this.weight;
      this.sender = this.a.position.copy();
      console.log(this.output);
      // this.sender.r = Math.abs(this.output*75);
      // this.sender.r = 64;
      this.sending = true;
    }
    
    this.update = function() {
      if (this.sending) {
        this.sender.x = lerp(this.sender.x, this.b.position.x, 0.1);
        this.sender.y = lerp(this.sender.y, this.b.position.y, 0.1);
        var d = p5.Vector.dist(this.sender, this.b.position);
        if (d < 1) {
          this.b.feedforward(this.output);
          this.sending = false;
        }
      }
    }
    
    this.display = function() {
      stroke(0);
      strokeWeight(this.weight+.2);
      line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
      
      if (this.sending) {
        fill(0);
        ellipse(this.sender.x, this.sender.y, 16, 16);
      }
    }
  }
  
  function Network(x, y) { 
    this.nodes = [];
    this.connections = [];
    this.position = createVector(x, y);
    
    this.addNode = function(n) {
      this.nodes.push(n);
    }
    
    this.connect = function(a, b, weight) {
      var c = new Connection(a, b, weight);
      a.addOutConnection(c);
      b.addInConnection(c);
      this.connections.push(c);
    }
    
    this.feedforward = function() {
      for (var i = 0; i < arguments.length; i++) {
          var n = this.nodes[i];
          n.feedforward(arguments[i], 1);
      }
    }
    
    this.update = function() {
      for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].update();
      }
    }
    
    this.display = function() {
      push();
      translate(this.position.x, this.position.y);
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].display();
      }
      
      for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].display();
      }
      pop();
    }
  }
  
  function Node(x, y, func) { 
    this.position = createVector(x, y);
    this.in_connections = [];
    this.out_connections = [];
    this.inputs_received = 0;
    this.sum = 0;
    this.r = 32;
    this.func = func;
    this.selected = false;
    this.causeLevel = 0;
    
    this.addInConnection = function(c) {
      this.in_connections.push(c);
    }

    this.addOutConnection = function(c) {
      this.out_connections.push(c);
    }
    
    this.feedforward = function(input) {
      this.inputs_received += 1;
      this.sum += input;
      if (this.in_connections.length == this.inputs_received || this.func == 'input') {
        this.fire();
        this.inputs_received = 0;
        this.sum = 0;
      }
    }
    
    this.fire = function() {
      var out;
      if (this.func == 'tanh') {
        out = Math.tanh(this.sum);
      } else if (this.func == 'sigmoid') {
        out = 1/(1+Math.E**(this.sum*-1));
      } else {
        out = this.sum;
      }
      if (this.out_connections.length != 0) {
        for (var i = 0; i < this.out_connections.length; i++) {
          this.out_connections[i].feedforward(out);
        }
      } else {
        finalOutputs.push(out);
        if (finalOutputs.length > 1) {
          printLabels();
        }
      }
      //Currently rendering circle pulse in proportion to signal
      //not sure if I like this
      this.r = 64 * Math.abs(out);
    }
    
    this.display = function() {
      stroke(0);
      strokeWeight(1);
      var b = map(this.sum,0,1,255,0);
      fill(b);
      if (this.selected == true) {
        fill('red');
      } else if (this.causeLevel != 0) {
        fill(color(255-255*this.causeLevel, 255-255*this.causeLevel, 255));
      }
      ellipse(this.position.x, this.position.y, this.r, this.r);
      
      this.r = lerp(this.r,32,0.1);
    }
  }

