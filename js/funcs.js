var finalOutputs = [];
var effects = [];
var causalityLayers = [];
var causeNodesByLayer = {
  1: [],
  2: [],
  3: [],
  4: []
};
var layersFull = {
  1: false,
  2: false,
  3: false,
  4: false
};
var causePars = [];

function layerCauseAnchor() {
  var sampleAccount;
  if (network.currentSample == 'virginica') {
    sampleAccount = actual; 
  } else if (network.currentSample == 'versicolor') {
    sampleAccount = versicolorActual;
  } else if (network.currentSample == 'setosa') {
    sampleAccount = setosaActual;
  } else if (network.currentSample == 'noise') {
    sampleAccount = noiseActual;
  } else {
    alert('Select a sample to generate an account of actual causation.');
    return;
  }
  for (var i=0; i < causePars.length; i++) {
    causePars[i].html('')
  };
  sortedLayers = causalityLayers.sort();
  layersKey = int(sortedLayers.join(''));
  var ac = sampleAccount[layersKey].split('\n');
  for (var i=0; i < ac.length; i++) {
    var x = createElement('p', ac[i]);
    x.position(950, 320+i*10);
    causePars[i] = x;
  }
  alphaBox.html('');
}

function causeAnchor() {
  // clean(false);
  var sAlphas;
  if (network.currentSample == 'virginica') {
    sAlphas = alphas; 
  } else if (network.currentSample == 'versicolor') {
    sAlphas = versicolorAlphas;
  } else if (network.currentSample == 'setosa') {
    sAlphas = setosaAlphas;
  } else if (network.currentSample == 'noise') {
    sAlphas = noiseAlphas;
  } else {
    alert('Select a sample to compute this alpha.');
    return;
  }
  for (var i=0; i < causePars.length; i++) {
    causePars[i].html('')
  }
  alphaBox.html('');
  if (causalityLayers.length != 2) {
    alert('Select at least 1 node from 2 different layers to compute causality.')
  }
  var alpha, sortedLayers, layersKey, inNodes, outNodes;
  sortedLayers = causalityLayers.sort();
  layersKey = int(sortedLayers.join(''));
  inNodes = causeNodesByLayer[sortedLayers[0]].sort().join(', ');
  outNodes = causeNodesByLayer[sortedLayers[1]].sort().join(', ');
  alpha = sAlphas[layersKey][outNodes][inNodes];
  alphaBox.html('α = ' + str(alpha));
  // setVirginicaActivations();
}

function clearCauses(clearSelectedOutputs, nw) {
  for (i=0;i<nw.nodes.length;i++) {
    nw.nodes[i].causeLevel = 0;
    if (clearSelectedOutputs == true) {
      nw.nodes[i].selected = false;
    }
  }
  if (clearSelectedOutputs) {
    causalityLayers = [];
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
  causalityLayers.sort();

  var nodeStrings = 'None';
  if (effects.length > 0) {
    nodeStrings = effects.join(', ');
    if (causalityLayers.length == 2) {
      causationButton.show();
    } else {
      causationButton.hide();
    }
  } else {
    causationButton.hide();
  }
  causationBody.html('Selected nodes: ' + nodeStrings);
  if (twoLayersFull()) {
    layerCausationButton.show();
  } else {
    layerCausationButton.hide();
    for (var i=0; i < causePars.length; i++) {
      causePars[i].html('');
    }
  }
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
  // info.html('');
  // resetButton.show();
  causationButton.hide();
  layerCausationButton.hide();
  causationBody.html('Selected nodes: None');
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

function connectLayers(nw, layer1, layer2, weights) {
    for (i=0;i<layer1.length;i++) {
        for (j=0;j<layer2.length;j++) {
         nw.connect(layer1[i], layer2[j], weights[i][j]);
        }
    }
}

function turnAllOff() {
  for (var i=0; i < network.nodes.length; i++) {
    network.nodes[i].on = false;
  }
}

function clean(clearSelectedOutputs = true) {
  clearCauses(clearSelectedOutputs, network);
  turnAllOff();
}

function nodeSelected(node) {
  // clean(false);
  //setVirginicaActivations();
  alphaBox.html('');
  var nodeObject = network.nodes[node];
  nodeObject.selected = !nodeObject.selected;
  if (nodeObject.selected) {
    effects.push(str(node));
  } else {
    effects = effects.filter(w => w != str(node));
  }
  if (nodeObject.selected == true) {
    causeNodesByLayer[nodeObject.layer].push(node); 
  } else {
    causeNodesByLayer[nodeObject.layer] = causeNodesByLayer[nodeObject.layer].filter(w => w != node);
  }
  if (nodeObject.layer == 1) {
    if (causeNodesByLayer[1].length == 10) {
      layersFull[1] = true;
    } else {
      layersFull[1] = false;
    }
  } else if (nodeObject.layer == 2) {
    if (causeNodesByLayer[2].length == 4) {
      layersFull[2] = true;
    } else {
      layersFull[2] = false;
    }
  } else if (nodeObject.layer == 3) {
    if (causeNodesByLayer[3].length == 3) {
      layersFull[3] = true;
    } else {
      layersFull[3] = false;
    }
  } else if (nodeObject.layer == 4) {
    if (causeNodesByLayer[4].length == 2) {
      layersFull[4] = true;
    } else {
      layersFull[4] = false;
    }
  }    
}

function twoLayersFull() {
  var x = 0;
  for (var i=1; i<5; i++) {
    if (layersFull[i]) {
      x++;
    }
  }
  if (x == 2) {
    return true;
  } else {
    return false;
  }
}

function drawHeatMap() {
  heatmap = new Network(width*.5, height*.7);
  var cornW = -30;
  var cornH = -90;
  var heatR = 15;
  heatIL = [
    new Node(cornW, cornH, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+25, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+50, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+75, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+100, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+125, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+150, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+175, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+200, 'input', 101, heatR, heatR),
    new Node(cornW, cornH+225, 'input', 101, heatR, heatR)
  ];
  heatL1 = [
    new Node(cornW+60, cornH+45, 'tanh', 102, heatR, heatR),
    new Node(cornW+60, cornH+90, 'tanh', 102, heatR, heatR),
    new Node(cornW+60, cornH+135, 'tanh', 102, heatR, heatR),
    new Node(cornW+60, cornH+180, 'tanh', 102, heatR, heatR)
  ];
  heatL2 = [
    new Node(cornW+120, cornH+45+33.75, 'tanh', 103, heatR, heatR),
    new Node(cornW+120, cornH+45+67.5, 'tanh', 103, heatR, heatR),
    new Node(cornW+120, cornH+45+101.25, 'tanh', 103, heatR, heatR)
  ];
  heatOL = [
    new Node(cornW+180, cornH+45+33.75+22.5, 'sigmoid', 104, heatR, heatR),
    new Node(cornW+180, cornH+45+33.75+45, 'sigmoid', 104, heatR, heatR)
  ];
  connectLayers(heatmap, heatIL, heatL1, weights1);
  connectLayers(heatmap, heatL1, heatL2, weights2);
  connectLayers(heatmap, heatL2, heatOL, weights3);
  heatNodes = heatIL.concat(heatL1, heatL2, heatOL);
  for (i=0;i<heatNodes.length;i++) {
    heatmap.addNode(heatNodes[i]);
  }
}

function colorLayer(actual_account, layer, idx, offset) {
  var trans = actual_account[idx].split('\n').filter(x => x != "    ");
  for (var i=0; i<trans.length; i++) {
    var r = parseCausationLine(trans[i]);
    for (var j=0; j<layer.length; j++) {
      if (r['nodes'].includes(j+offset)) {
        layer[j].causeLevel += r['alpha'];
      }
    }
  }
}

function parseCausationLine(line) {
  var alpha = float(line.split('[')[0].split('=')[1]);
  var causeNodes = line.split('[')[1].split(']')[0].split(',').map(x => int(x.replace(/\s+/, "").substring(1)));
  return {
    'alpha': alpha / causeNodes.length,
    'nodes': causeNodes
  }
}