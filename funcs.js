var finalOutputs = [];
var effects = [];
var causalityLayers = [];
var causeNodesByLayer = {
  1: [],
  2: [],
  3: [],
  4: []
}

function causeAnchor1() {
  clean(false);
  // var alpha;
  // if (effects.length == 2) {
  //   alpha = 0.1922
  //   network.nodes[1].causeLevel = alpha;
  //   network.nodes[7].causeLevel = alpha;
  //   network.nodes[9].causeLevel = alpha;
  // } else if (effects[0] == 'Output Node 1') {
  //   alpha = 0.4656;
  //   network.nodes[8].causeLevel = alpha; //remember outputs are switched from TF model
  // } else if (effects[0] == 'Output Node 2') {
  //   alpha = 0.1636;
  //   network.nodes[9].causeLevel = alpha;
  // }
  // alphaBox.html('α = ' + str(alpha));
  if (causalityLayers.length != 2) {
    alert('Select at least 1 node from 2 different layers to compute causality.')
  } else {
    alphaBox.html('To be computed');
  }
}

function causeAnchor2() {
  clean(false);
  // var alpha;
  // if (effects.length == 2) {
  //   alpha = 0.2839
  //   network.nodes[3].causeLevel = alpha;
  //   network.nodes[6].causeLevel = alpha;
  //   network.nodes[7].causeLevel = alpha;
  // } else if (effects[0] == 'Output Node 1') {
  //   alpha = 0.5456;
  //   network.nodes[0].causeLevel = alpha; //remember outputs are switched from TF model
  // } else if (effects[0] == 'Output Node 2') {
  //   alpha = 0.8022;
  //   network.nodes[9].causeLevel = alpha;
  // }
  // alphaBox.html('α = ' + str(alpha));
  if (causalityLayers.length != 2) {
    alert('Select at least 1 node from 2 different layers to compute causality.')
  } else {
    alphaBox.html('To be computed');
  }
}

function clearCauses(clearSelectedOutputs) {
  for (i=0;i<network.nodes.length;i++) {
    network.nodes[i].causeLevel = 0;
    if (clearSelectedOutputs == true) {
      network.nodes[i].selected = false;
    }
  }
  alphaBox.html('');
}

function mousePressed() {
  var d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,d17,d18; 
  d0 = dist(mouseX, mouseY, 40, 30);
  d1 = dist(mouseX, mouseY, 40, 100);
  d2 = dist(mouseX, mouseY, 40, 170);
  d3 = dist(mouseX, mouseY, 40, 240);
  d4 = dist(mouseX, mouseY, 40, 310);
  d5 = dist(mouseX, mouseY, 40, 380);
  d6 = dist(mouseX, mouseY, 40, 450);
  d7 = dist(mouseX, mouseY, 40, 520);
  d8 = dist(mouseX, mouseY, 40, 590);
  d9 = dist(mouseX, mouseY, 40, 660);

  d10 = dist(mouseX, mouseY, 240, 156);
  d11 = dist(mouseX, mouseY, 240, 282);
  d12 = dist(mouseX, mouseY, 240, 408);
  d13 = dist(mouseX, mouseY, 240, 534);

  d14 = dist(mouseX, mouseY, 440, 250.5);
  d15 = dist(mouseX, mouseY, 440, 345);
  d16 = dist(mouseX, mouseY, 440, 439.5);

  d17 = dist(mouseX, mouseY, 640, 300);
  d18 = dist(mouseX, mouseY, 640, 390);
  
  fill(color(100, 50, 150));
  var node;
  if (d0 < 16) {
    node = 0;
    selectLayer(1, node);
  } else if (d1 < 16) {
    node = 1;
    selectLayer(1, node);
  } else if (d2 < 16) {
    node = 2;
    selectLayer(1, node);
  } else if (d3 < 16) {
    node = 3;
    selectLayer(1, node);
  } else if (d4 < 16) {
    node = 4;
    selectLayer(1, node);
  } else if (d5 < 16) {
    node = 5;
    selectLayer(1, node);
  } else if (d6 < 16) {
    node = 6;
    selectLayer(1, node);
  } else if (d7 < 16) {
    node = 7;
    selectLayer(1, node);
  } else if (d8 < 16) {
    node = 8;
    selectLayer(1, node);
  } else if (d9 < 16) {
    node = 9;
    selectLayer(1, node);
  } else if (d10 < 16) {
    node = 10;
    selectLayer(2, node);
  } else if (d11 < 16) {
    node = 11;
    selectLayer(2, node);
  } else if (d12 < 16) {
    node = 12;
    selectLayer(2, node);
  } else if (d13 < 16) {
    node = 13;
    selectLayer(2, node);
  } else if (d14 < 16) {
    node = 14;
    selectLayer(3, node);
  } else if (d15 < 16) {
    node = 15;
    selectLayer(3, node);
  } else if (d16 < 16) {
    node = 16;
    selectLayer(3, node);
  } else if (d17 < 16) {
    node = 17;
    selectLayer(4, node);
  } else if (d18 < 16) {
    node = 18;
    selectLayer(4, node);
  }

  var nodeObject = network.nodes[node];
  if (causalityLayers.includes(nodeObject.layer)) {
    nodeSelected(node);
    if (nodeObject.selected == false) {
      if (causeNodesByLayer[nodeObject.layer].length == 0) {
        causalityLayers = causalityLayers.filter(w => w != nodeObject.layer);
      }
    }
  }

  var nodeStrings = 'None';
  if (effects.length > 0) {
    nodeStrings = effects.join(', ');
    causationButton.show();
    causationButton2.show();
  } else {
    causationButton.hide();
    causationButton2.hide();
  }
  causationBody.html('Selected nodes: ' + nodeStrings);
}

function selectLayer(layer, node) {
  var nodeObject = network.nodes[node];
  if (causalityLayers.length < 2) {
    if (!causalityLayers.includes(layer)) {
      causalityLayers.push(layer);
    }
  } else if (!causalityLayers.includes(nodeObject.layer)) {
    alert('Cannot select nodes from more than 2 layers simultaneously.');
  }
}

function run() {
  clean();
  result.html('');
  finalOutputs = [];
  const vector = input.value();
  title.html('Input: ' + vector);
  input.value('');
  v = vector.split(',');
  if (v.length != 10) {
    alert('Invald input. Enter 10 comma-separated binary digits.');
    return;
  }
  for (i=0;i<10;i++) {
    v[i] = int(v[i]);
    if (Number.isNaN(v[i])) {
      alert('Invald input. Enter 10 comma-separated binary digits.');
      return;
    }
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

function turnAllOff() {
  for (var i=0; i < network.nodes.length; i++) {
    network.nodes[i].on = false;
  }
}

function clean(clearSelectedOutputs = true) {
  clearCauses(clearSelectedOutputs);
  turnAllOff();
}