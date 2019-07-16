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

function setVirginicaActivations() {
  turnAllOff();
  for (var i=0; i < causePars.length; i++) {
    causePars[i].html('')
  };
  result.html('');
  network.feedforward(1,0,1,0,1,1,0,1,1,0);
  network.currentSample = 'virginica';
  virginicaButton.class('selected_sample');
  versicolorButton.class('unselected_sample');
  setosaButton.class('unselected_sample');
  noiseButton.class('unselected_sample');
  clearCauses(false, heatmap);
  colorLayer(actual, heatIL, 12, 0);
  colorLayer(actual, heatL1, 23, 10);
  colorLayer(actual, heatL2, 34, 14);
  finalOutputs = [];
}

function setVersicolorActivations() {
  turnAllOff();
  result.html('');
  for (var i=0; i < causePars.length; i++) {
    causePars[i].html('')
  };
  network.feedforward(1,0,1,0,1,1,0,1,0,1);
  network.currentSample = 'versicolor';
  virginicaButton.class('unselected_sample');
  versicolorButton.class('selected_sample');
  setosaButton.class('unselected_sample');
  noiseButton.class('unselected_sample');
  clearCauses(false, heatmap);
  colorLayer(versicolorActual, heatIL, 12, 0);
  colorLayer(versicolorActual, heatL1, 23, 10);
  colorLayer(versicolorActual, heatL2, 34, 14);
  finalOutputs = [];
}

function setSetosaActivations() {
  turnAllOff();
  result.html();
  for (var i=0; i < causePars.length; i++) {
    causePars[i].html('')
  };
  network.feedforward(1,0,0,1,0,0,1,0,0,0);
  network.currentSample = 'setosa';
  virginicaButton.class('unselected_sample');
  versicolorButton.class('unselected_sample');
  setosaButton.class('selected_sample');
  noiseButton.class('unselected_sample');
  clearCauses(false, heatmap);
  colorLayer(setosaActual, heatIL, 12, 0);
  colorLayer(setosaActual, heatL1, 23, 10);
  colorLayer(setosaActual, heatL2, 34, 14);
  finalOutputs = [];
}

function setNoiseActivations() {
  turnAllOff();
  result.html('');
  for (var i=0; i < causePars.length; i++) {
    causePars[i].html('')
  };
  network.feedforward(0,0,0,0,0,1,0,0,0,0)
  network.currentSample = 'noise';
  virginicaButton.class('unselected_sample');
  versicolorButton.class('unselected_sample');
  setosaButton.class('unselected_sample');
  noiseButton.class('selected_sample');
  clearCauses(false, heatmap);
  colorLayer(noiseActual, heatIL, 12, 0);
  colorLayer(noiseActual, heatL1, 23, 10);
  colorLayer(noiseActual, heatL2, 34, 14);
  finalOutputs = [];
}

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
    x.position(950, 340+i*10);
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

function printLabels() {
  var cl, clString;
  console.log(finalOutputs);
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
  clearCauses(clearSelectedOutputs, network);
  turnAllOff();
}

function nodeSelected(node) {
  clean(false);
  //setVirginicaActivations();
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

function labelNodes() {
  fill('#2aa198');
  textSize(15);
  //5 down from the center of each circle so text is centered on node
  text('n0', 40, 35);
  text('n1', 40, 105);
  text('n2', 40, 175);
  text('n3', 40, 245);
  text('n4', 40, 315);
  text('n5', 40, 385);
  text('n6', 40, 455);
  text('n7', 40, 525);
  text('n8', 40, 595);
  text('n9', 40, 665);

  text('n10', 240, 161);
  text('n11', 240, 287);
  text('n12', 240, 413);
  text('n13', 240, 539);

  text('n14', 440, 255.5);
  text('n15', 440, 350);
  text('n16', 440, 444.5);

  text('n17', 640, 305);
  text('n18', 640, 395);
}

function twoLayersSelected(l) {
  if (causalityLayers.length == 2 && !causalityLayers.includes(l)) {
    alert('Cannot select nodes from more than 2 layers simultaneously.');
    return true;
  }
}

function selectWholeLayer(l, start, end, sb, cb) {
  if (!twoLayersSelected(l)) {
    for (var i = start; i < end; i++) {
      network.nodes[i].selected = true;
      if (!causeNodesByLayer[l].includes(i)) {
        causeNodesByLayer[l].push(i);
      }
      if (!effects.includes(str(i))) {
        effects.push(str(i));
      }
    }
    if (!causalityLayers.includes(l)) {
      causalityLayers.push(l);
      causalityLayers.sort();
    }
    layersFull[l] = true;
    printSelectedNodes();
    sb.hide();
    cb.show();
  }
}

function selectLayer1() {
  selectWholeLayer(1, 0, 10, layer1Button, dlayer1Button);
}

function selectLayer2() {
  selectWholeLayer(2, 10, 14, layer2Button, dlayer2Button);
}

function selectLayer3() {
  selectWholeLayer(3, 14, 17, layer3Button, dlayer3Button);
}

function selectLayer4() {
  selectWholeLayer(4, 17, 19, layer4Button, dlayer4Button);
}

function deselectWholeLayer(l, start, end, sb, cb) {
  for (var i = start; i < end; i++) {
    network.nodes[i].selected = false;
    effects = effects.filter(w => w != str(i));
  }
  causeNodesByLayer[l] = [];
  causalityLayers = causalityLayers.filter(w => w != l);
  layersFull[l] = false;
  printSelectedNodes();
  sb.show();
  cb.hide();
  alphaBox.html('');
}

function deselectLayer1() {
  deselectWholeLayer(1, 0, 10, layer1Button, dlayer1Button);
}

function deselectLayer2() {
  deselectWholeLayer(2, 10, 14, layer2Button, dlayer2Button);
}

function deselectLayer3() {
  deselectWholeLayer(3, 14, 17, layer3Button, dlayer3Button);
}

function deselectLayer4() {
  deselectWholeLayer(4, 17, 19, layer4Button, dlayer4Button);
}

function printSelectedNodes() {
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
      causePars[i].html('')
    }
  }
}