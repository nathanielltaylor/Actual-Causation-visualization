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
  input.position(400, 85);

  button = createButton('Submit');
  button.id('submit_button')
  button.position(input.x + input.width, 85);
  button.mousePressed(run);

  title = createElement('h3', 'Enter 10 comma-separated binary digits');
  title.position(400, 30);

  result = createElement('h3', '');
  result.position(400, 100);

  causationTitle = createElement('h2', 'Actual Causation (1,0,1,0,1,1,0,1,1,0)');
  causationTitle.position(950, 30);

  causationBody = createElement('p', '');
  causationBody.position(950, 100);

  causationButton = createButton('Find Causes of Selected Nodes');
  causationButton.position(950, 150);
  causationButton.mousePressed(findActualCause);
  causationButton.hide();

  alphaBox = createElement('h4', '');
  alphaBox.position(950, 170);

  textAlign(CENTER);
  textSize(50);

  network = new Network(width/2, height/2-100);
  //centerpoint is (640, 300)
  
  il = [
    new Node(-600, -270, 'input'),
    new Node(-600, -200, 'input'),
    new Node(-600, -130, 'input'),
    new Node(-600, -60, 'input'),
    new Node(-600, 10, 'input'),
    new Node(-600, 80, 'input'),
    new Node(-600, 150, 'input'),
    new Node(-600, 220, 'input'),
    new Node(-600, 290, 'input'),
    new Node(-600, 360, 'input')
  ]
  
  hl1 = [
    new Node(-400, -144, 'tanh'),
    new Node(-400, -18, 'tanh'),
    new Node(-400, 108, 'tanh'),
    new Node(-400, 234, 'tanh')
  ]

  hl2 = [
      new Node(-200, -49.5, 'tanh'),
      new Node(-200, 45, 'tanh'),
      new Node(-200, 139.5, 'tanh')
  ]

  ol = [
    //slightly wider spaced than other layers
    new Node(0, 0, 'sigmoid'),
    new Node(0, 90, 'sigmoid')
  ]
  
  connectLayers(il, hl1, weights1);
  connectLayers(hl1, hl2, weights2);
  connectLayers(hl2, ol, weights3);

  allNodes = il.concat(hl1, hl2, ol);
  for (i=0;i<allNodes.length;i++) {
      network.addNode(allNodes[i]);
  }
} 

function draw() { 
  background('#eee');
  network.update();
  network.display();
}