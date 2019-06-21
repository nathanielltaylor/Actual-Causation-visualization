var finalOutputs = [];
var effects = [];

function causeAnchor1() {
  clean(false);
  var alpha;
  if (effects.length == 2) {
    alpha = 0.1922
    network.nodes[1].causeLevel = alpha;
    network.nodes[7].causeLevel = alpha;
    network.nodes[9].causeLevel = alpha;
  } else if (effects[0] == 'Output Node 1') {
    alpha = 0.4656;
    network.nodes[8].causeLevel = alpha; //remember outputs are switched from TF model
  } else if (effects[0] == 'Output Node 2') {
    alpha = 0.1636;
    network.nodes[9].causeLevel = alpha;
  }
  alphaBox.html('α = ' + str(alpha));
}

function causeAnchor2() {
  clean(false);
  var alpha;
  if (effects.length == 2) {
    alpha = 0.2839
    network.nodes[3].causeLevel = alpha;
    network.nodes[6].causeLevel = alpha;
    network.nodes[7].causeLevel = alpha;
  } else if (effects[0] == 'Output Node 1') {
    alpha = 0.5456;
    network.nodes[0].causeLevel = alpha; //remember outputs are switched from TF model
  } else if (effects[0] == 'Output Node 2') {
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
  var d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,d17, d18; 
  d0 = dist(mouseX, mouseY, 0, 0);
  d1 = dist(mouseX, mouseY, 0, 0);
  d2 = dist(mouseX, mouseY, 0, 0);
  d3 = dist(mouseX, mouseY, 0, 0);
  d4 = dist(mouseX, mouseY, 0, 0);
  d5 = dist(mouseX, mouseY, 0, 0);
  d6 = dist(mouseX, mouseY, 0, 0);
  d7 = dist(mouseX, mouseY, 0, 0);
  d8 = dist(mouseX, mouseY, 0, 0);
  d9 = dist(mouseX, mouseY, 0, 0);
  d10 = dist(mouseX, mouseY, 0, 0);
  d11 = dist(mouseX, mouseY, 0, 0);
  d12 = dist(mouseX, mouseY, 0, 0);
  d13 = dist(mouseX, mouseY, 0, 0);
  d14 = dist(mouseX, mouseY, 0, 0);
  d15 = dist(mouseX, mouseY, 0, 0);
  d16 = dist(mouseX, mouseY, 0, 0);
  d17 = dist(mouseX, mouseY, 640, 300);
  d18 = dist(mouseX, mouseY, 640, 390);
  fill(color(100, 50, 150));
  
  if (d17 < 16) {
    output1Selected();
  } else if (d18 < 16) {
    output2Selected();
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