var network;
let il, hl1, hl2, ol, weights1, weights2, weights3, input, button, title, result;

weights1 = [
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
  [ 2.9806962 , -0.47667038, -0.05533997],
  [ 1.7298535 ,  1.8376377 ,  0.28910208],
  [-0.60753185,  0.74215406, -2.7312975 ],
  [-0.95498747,  1.6362475 , -0.8924519 ]
]

weights3 = [
  [ 0.18212856, -3.6634855 ],
  [-3.2627506 , -0.26446375],
  [ 2.2612166 , -0.40060785]
]

function setup() { 
  createCanvas(1140, 800);
  background('#eee');

  //Allow classification of user-provided samples
  // input = createInput();
  // input.position(400, 135);

  // button = createButton('Submit');
  // button.id('submit_button')
  // button.position(input.x + input.width, 135);
  // button.mousePressed(run);

  title = createElement('p', 'Select one of the following Iris samples to perform analysis.');
  title.position(400, 63);

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

  showInputSample = createElement('p', '');
  showInputSample.position(400, 120);

  result = createElement('p', '');
  result.position(400, 145);

  causationTitle = createElement('h2', 'Actual Causation');
  causationTitle.position(950, 30);

  causationDescription = createElement('p', 'To display the strength of a specific causal link select a sample and two sets of node from two different layers in the graph. For all actual causes select a sample and full two layers.');
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

  alphaBox = createElement('h3', '');
  alphaBox.position(950, 340);

  layer1Button = createButton('Select Layer 1');
  layer1Button.position(950, 660);
  layer1Button.mousePressed(selectLayer1);
  layer1Button.class('layer_button');

  layer2Button = createButton('Select Layer 2');
  layer2Button.position(1050, 660);
  layer2Button.mousePressed(selectLayer2);
  layer2Button.class('layer_button');

  layer3Button = createButton('Select Layer 3');
  layer3Button.position(1150, 660);
  layer3Button.mousePressed(selectLayer3);
  layer3Button.class('layer_button');

  layer4Button = createButton('Select Layer 4');
  layer4Button.position(1250, 660);
  layer4Button.mousePressed(selectLayer4);
  layer4Button.class('layer_button');

  dlayer1Button = createButton('Clear Layer 1');
  dlayer1Button.position(950, 700);
  dlayer1Button.mousePressed(deselectLayer1);
  dlayer1Button.class('dlayer_button');
  // dlayer1Button.hide();

  dlayer2Button = createButton('Clear Layer 2');
  dlayer2Button.position(1050, 700);
  dlayer2Button.mousePressed(deselectLayer2);
  dlayer2Button.class('dlayer_button');
  // dlayer2Button.hide();

  dlayer3Button = createButton('Clear Layer 3');
  dlayer3Button.position(1150, 700);
  dlayer3Button.mousePressed(deselectLayer3);
  dlayer3Button.class('dlayer_button');
  // dlayer3Button.hide();

  dlayer4Button = createButton('Clear Layer 4');
  dlayer4Button.position(1250, 700);
  dlayer4Button.mousePressed(deselectLayer4);
  dlayer4Button.class('dlayer_button');
  // dlayer4Button.hide();

  textAlign(CENTER);
  textSize(50);

  creditBox = createElement('p', 'Visualization by Nathaniel Taylor.');
  creditBox.position(20, 675);

  creditBox2 = createElement('div', 'Signal pulse animation is adapted from open source code released by Simon Tiger.');
  creditBox2.position(20, 715);

  network = new Network(width/2, height/2-100);
  r = 32;
  //centerpoint is (640, 300)
  
  il = [
    //+140
    new Node(-530, -270, 'input', 1, r),
    new Node(-530, -200, 'input', 1, r),
    new Node(-530, -130, 'input', 1, r),
    new Node(-530, -60, 'input', 1, r),
    new Node(-530, 10, 'input', 1, r),
    new Node(-530, 80, 'input', 1, r),
    new Node(-530, 150, 'input', 1, r),
    new Node(-530, 220, 'input', 1, r),
    new Node(-530, 290, 'input', 1, r),
    new Node(-530, 360, 'input', 1, r)
  ]
  
  hl1 = [
    new Node(-330, -144, 'tanh', 2, r),
    new Node(-330, -18, 'tanh', 2, r),
    new Node(-330, 108, 'tanh', 2, r),
    new Node(-330, 234, 'tanh', 2, r)
  ]

  hl2 = [
      new Node(-130, -49.5, 'tanh', 3, r),
      new Node(-130, 45, 'tanh', 3, r),
      new Node(-130, 139.5, 'tanh', 3, r)
  ]

  ol = [
    //slightly wider spaced than other layers
    new Node(70, 0, 'sigmoid', 4, r),
    new Node(70, 90, 'sigmoid', 4, r)
  ]
  
  connectLayers(network, il, hl1, weights1);
  connectLayers(network, hl1, hl2, weights2);
  connectLayers(network, hl2, ol, weights3);

  allNodes = il.concat(hl1, hl2, ol);
  for (i=0;i<allNodes.length;i++) {
      network.addNode(allNodes[i]);
  }
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