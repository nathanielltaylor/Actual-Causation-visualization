var network;
let il, hl1, hl2, ol, weights1, weights2, weights3, input, button, title, result;

weights1 = [
  [ 0.82810175,  0.431847  , -0.6114574 ,  0.26991272],
  [ 0.38643757,  0.0724497 ,  0.11731126,  0.532698  ],
  [-0.22434753,  0.18346816, -0.5205485 ,  0.20109114],
  [ 0.26289812,  0.70143336, -0.3273399 , -0.58420587],
  [ 0.17094621,  0.05579785, -0.2422998 ,  0.08053707],
  [ 0.03981959, -0.9085541 ,  0.6328834 , -0.0238213 ],
  [-0.46575934,  1.2543691 ,  0.23838411, -1.5902231 ],
  [-0.1890925 ,  0.52258563,  0.43458605, -0.3423414 ],
  [-0.7142476 , -0.06031533,  0.44454348, -0.21594076],
  [ 0.35396498, -0.66391367, -0.68615705,  0.29617062]
]

weights2 = [
  [ 0.42995495, -0.40290686, -1.8035071 ],
  [ 1.3750908 ,  1.523359  , -0.22550218],
  [-0.05440376,  0.16083112,  1.8929248 ],
  [-0.67914736, -1.2037599 , -1.0936055 ]
]

weights3 = [
  [-2.4198363 , -0.8200313 ],
  [-1.9390317 ,  1.0962626 ],
  [-0.40043405,  3.3466845 ]
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

  info = createElement('p', 'Default activations based on on an input of 1,0,1,0,1,1,0,1,1,0');
  info.position(400, 90);

  resetButton = createButton('Reset to Defaults');
  resetButton.position(400, 110);
  resetButton.hide();
  resetButton.mousePressed(setVirginicaActivations);

  classTitle = createElement('h2', 'Sample classification');
  classTitle.position(400, 30);

  result = createElement('h4', '');
  result.position(400, 145);

  causationTitle = createElement('h2', 'Actual Causation');
  causationTitle.position(950, 30);

  causationBody = createElement('p', 'Causation calculations are based on an input of 1,0,1,0,1,1,0,1,1,0');
  causationBody.position(950, 80);

  causationBody = createElement('p', '');
  causationBody.position(950, 140);

  causationButton = createButton('Compute Causal Link');
  causationButton.class('cause_button');
  causationButton.position(1000, 210);
  causationButton.mousePressed(causeAnchor);
  causationButton.hide();

  layerCausationButton = createButton('Compute Full Causal Account');
  layerCausationButton.class('cause_button');
  layerCausationButton.id('layers');
  layerCausationButton.position(1150, 210);
  layerCausationButton.mousePressed(layerCauseAnchor);
  layerCausationButton.hide();

  // accountBox = createElement('div', '');
  // accountBox.position(950, 310);

  alphaBox = createElement('h3', '');
  alphaBox.position(950, 270);

  textAlign(CENTER);
  textSize(50);

  creditBox = createElement('p', 'Visualization by Nathaniel Taylor.');
  creditBox.position(20, 675);
  creditBox2 = createElement('div', 'Signal pulse animation is adapted from open source code released by Simon Tiger.');
  creditBox2.position(20, 715);

  network = new Network(width/2, height/2-100);
  //centerpoint is (640, 300)
  
  il = [
    new Node(-600, -270, 'input', 1),
    new Node(-600, -200, 'input', 1),
    new Node(-600, -130, 'input', 1),
    new Node(-600, -60, 'input', 1),
    new Node(-600, 10, 'input', 1),
    new Node(-600, 80, 'input', 1),
    new Node(-600, 150, 'input', 1),
    new Node(-600, 220, 'input', 1),
    new Node(-600, 290, 'input', 1),
    new Node(-600, 360, 'input', 1)
  ]
  
  hl1 = [
    new Node(-400, -144, 'tanh', 2),
    new Node(-400, -18, 'tanh', 2),
    new Node(-400, 108, 'tanh', 2),
    new Node(-400, 234, 'tanh', 2)
  ]

  hl2 = [
      new Node(-200, -49.5, 'tanh', 3),
      new Node(-200, 45, 'tanh', 3),
      new Node(-200, 139.5, 'tanh', 3)
  ]

  ol = [
    //slightly wider spaced than other layers
    new Node(0, 0, 'sigmoid', 4),
    new Node(0, 90, 'sigmoid', 4)
  ]
  
  connectLayers(il, hl1, weights1);
  connectLayers(hl1, hl2, weights2);
  connectLayers(hl2, ol, weights3);

  allNodes = il.concat(hl1, hl2, ol);
  for (i=0;i<allNodes.length;i++) {
      network.addNode(allNodes[i]);
  }
  setVirginicaActivations();
} 

function draw() { 
  background('#eee');
  network.update();
  network.display();
}