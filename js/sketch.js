var network;
let il, hl1, hl2, ol, weights1, weights2, weights3, input, button, title, result;

weights1 = [
  // [ 0.82810175,  0.431847  , -0.6114574 ,  0.26991272],
  // [ 0.38643757,  0.0724497 ,  0.11731126,  0.532698  ],
  // [-0.22434753,  0.18346816, -0.5205485 ,  0.20109114],
  // [ 0.26289812,  0.70143336, -0.3273399 , -0.58420587],
  // [ 0.17094621,  0.05579785, -0.2422998 ,  0.08053707],
  // [ 0.03981959, -0.9085541 ,  0.6328834 , -0.0238213 ],
  // [-0.46575934,  1.2543691 ,  0.23838411, -1.5902231 ],
  // [-0.1890925 ,  0.52258563,  0.43458605, -0.3423414 ],
  // [-0.7142476 , -0.06031533,  0.44454348, -0.21594076],
  // [ 0.35396498, -0.66391367, -0.68615705,  0.29617062]
  [ 0.7017474 ,  0.72755164,  0.11551751, -0.45833752],
  [ 0.32857415,  0.22942406, -0.26565427,  0.03623967],
  [ 0.03793271,  0.47218153, -0.4352291 ,  0.01359654],
  [ 0.6361415 ,  0.65328306,  0.2127736 ,  1.38634   ],
  [ 0.70550054, -0.06472789, -0.29194075,  0.32473427],
  [-0.6606997 , -1.0553268 ,  0.1539855 , -0.5277388 ],
  [-0.7781235 , -0.06791577,  2.146416  ,  0.8969705 ],
  [-0.23123613, -0.40373075,  0.947467  ,  0.2095717 ],
  [-0.48347244,  0.16283299,  0.16909541,  0.23165363],
  [ 1.7576371 , -1.3015809 , -0.5757755 , -1.3373333 ]
]

weights2 = [
  // [ 0.42995495, -0.40290686, -1.8035071 ],
  // [ 1.3750908 ,  1.523359  , -0.22550218],
  // [-0.05440376,  0.16083112,  1.8929248 ],
  // [-0.67914736, -1.2037599 , -1.0936055 ]
  [ 2.9806962 , -0.47667038, -0.05533997],
  [ 1.7298535 ,  1.8376377 ,  0.28910208],
  [-0.60753185,  0.74215406, -2.7312975 ],
  [-0.95498747,  1.6362475 , -0.8924519 ]
]

weights3 = [
  // [-2.4198363 , -0.8200313 ],
  // [-1.9390317 ,  1.0962626 ],
  // [-0.40043405,  3.3466845 ]
  [ 0.18212856, -3.6634855 ],
  [-3.2627506 , -0.26446375],
  [ 2.2612166 , -0.40060785]
]

function setup() { 
  createCanvas(1280, 800);
  background('#eee');

  input = createInput();
  input.position(400, 135);

  button = createButton('Submit');
  button.id('submit_button')
  button.position(input.x + input.width, 135);
  button.mousePressed(run);

  title = createElement('h4', 'Enter 10 comma-separated binary digits');
  title.position(400, 60);

  // info = createElement('p', 'Default activations based on an input of 1,0,1,0,1,1,0,1,1,0');
  // info.position(400, 90);

  virginicaButton = createButton('Run Virginica');
  virginicaButton.position(400, 105);
  virginicaButton.class('unselected_sample');
  virginicaButton.mousePressed(setVirginicaActivations);

  versicolorButton = createButton('Run Versicolor');
  versicolorButton.position(490, 105);
  versicolorButton.mousePressed(setVersicolorActivations);
  versicolorButton.class('unselected_sample');

  setosaButton = createButton('Run Setosa');
  setosaButton.position(585, 105);
  setosaButton.mousePressed(setSetosaActivations);
  setosaButton.class('unselected_sample');

  noiseButton = createButton('Run Noise');
  noiseButton.position(663, 105);
  noiseButton.mousePressed(setNoiseActivations);
  noiseButton.class('unselected_sample');

  classTitle = createElement('h2', 'Sample classification');
  classTitle.position(400, 30);

  result = createElement('h4', '');
  result.position(400, 145);

  causationTitle = createElement('h2', 'Actual Causation');
  causationTitle.position(950, 30);

  causationDescription = createElement('p', 'To display the strength of a specific causal link select two sets of node from two different layers in the graph. For all actual causes select full two layers.');
  causationDescription.position(950, 80)

  causationBody = createElement('p', 'Causation calculations are based on the currently selected sample.');
  causationBody.position(950, 150);

  causationBody = createElement('p', '');
  causationBody.position(950, 210);

  causationButton = createButton('Compute Causal Link');
  causationButton.class('cause_button');
  causationButton.position(1000, 280);
  causationButton.mousePressed(causeAnchor);
  causationButton.hide();

  layerCausationButton = createButton('Compute Full Causal Account');
  layerCausationButton.class('cause_button');
  layerCausationButton.id('layers');
  layerCausationButton.position(1150, 280);
  layerCausationButton.mousePressed(layerCauseAnchor);
  layerCausationButton.hide();

  // accountBox = createElement('div', '');
  // accountBox.position(950, 310);

  alphaBox = createElement('h3', '');
  alphaBox.position(950, 340);

  layer1Button = createButton('Select Layer 1');
  layer1Button.position(950, 700);
  layer1Button.mousePressed(selectLayer1);
  layer1Button.class('layer_button');

  layer2Button = createButton('Select Layer 2');
  layer2Button.position(1050, 700);
  layer2Button.mousePressed(selectLayer2);
  layer2Button.class('layer_button');

  layer3Button = createButton('Select Layer 3');
  layer3Button.position(1150, 700);
  layer3Button.mousePressed(selectLayer3);
  layer3Button.class('layer_button');

  layer4Button = createButton('Select Layer 4');
  layer4Button.position(1250, 700);
  layer4Button.mousePressed(selectLayer4);
  layer4Button.class('layer_button');

  dlayer1Button = createButton('Clear Layer 1');
  dlayer1Button.position(950, 700);
  dlayer1Button.mousePressed(deselectLayer1);
  dlayer1Button.class('dlayer_button');
  dlayer1Button.hide();

  dlayer2Button = createButton('Clear Layer 2');
  dlayer2Button.position(1050, 700);
  dlayer2Button.mousePressed(deselectLayer2);
  dlayer2Button.class('dlayer_button');
  dlayer2Button.hide();

  dlayer3Button = createButton('Clear Layer 3');
  dlayer3Button.position(1150, 700);
  dlayer3Button.mousePressed(deselectLayer3);
  dlayer3Button.class('dlayer_button');
  dlayer3Button.hide();

  dlayer4Button = createButton('Clear Layer 4');
  dlayer4Button.position(1250, 700);
  dlayer4Button.mousePressed(deselectLayer4);
  dlayer4Button.class('dlayer_button');
  dlayer4Button.hide();

  textAlign(CENTER);
  textSize(50);

  creditBox = createElement('p', 'Visualization by Nathaniel Taylor.');
  creditBox.position(20, 675);
  //decide where to move this to make room for heatmap
  // creditBox2 = createElement('div', 'Signal pulse animation is adapted from open source code released by Simon Tiger.');
  // creditBox2.position(20, 715);

  network = new Network(width/2, height/2-100);
  r = 32;
  //centerpoint is (640, 300)
  
  il = [
    new Node(-600, -270, 'input', 1, r),
    new Node(-600, -200, 'input', 1, r),
    new Node(-600, -130, 'input', 1, r),
    new Node(-600, -60, 'input', 1, r),
    new Node(-600, 10, 'input', 1, r),
    new Node(-600, 80, 'input', 1, r),
    new Node(-600, 150, 'input', 1, r),
    new Node(-600, 220, 'input', 1, r),
    new Node(-600, 290, 'input', 1, r),
    new Node(-600, 360, 'input', 1, r)
  ]
  
  hl1 = [
    new Node(-400, -144, 'tanh', 2, r),
    new Node(-400, -18, 'tanh', 2, r),
    new Node(-400, 108, 'tanh', 2, r),
    new Node(-400, 234, 'tanh', 2, r)
  ]

  hl2 = [
      new Node(-200, -49.5, 'tanh', 3, r),
      new Node(-200, 45, 'tanh', 3, r),
      new Node(-200, 139.5, 'tanh', 3, r)
  ]

  ol = [
    //slightly wider spaced than other layers
    new Node(0, 0, 'sigmoid', 4, r),
    new Node(0, 90, 'sigmoid', 4, r)
  ]
  
  connectLayers(network, il, hl1, weights1);
  connectLayers(network, hl1, hl2, weights2);
  connectLayers(network, hl2, ol, weights3);

  allNodes = il.concat(hl1, hl2, ol);
  for (i=0;i<allNodes.length;i++) {
      network.addNode(allNodes[i]);
  }
  // setVirginicaActivations();
  drawHeatMap();
} 

function draw() { 
  background('#eee');
  network.update();
  network.display();
  heatmap.update();
  heatmap.display();
  labelNodes();
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
      // if (idx != 12) {
      //   console.log(r['nodes']);
      // }
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