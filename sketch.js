var network;
let il, hl1, hl2, ol, weights1, weights2, weights3, input, button, title, result;

weights1 = [
  [-0.2811654 , -0.36876372, -0.19776508, -0.31375873],
  [-1.148887  , -0.5479878 , -1.1339006 ,  0.16764727],
  [ 1.3770278 ,  0.53476024, -1.0114052 , -0.17715394],
  [ 1.8477372 ,  1.0137312 , -0.02374263,  0.9401175 ]
]

weights2 = [
  [ 0.8035842 , -1.4213372 , -0.7694416 ],
  [ 0.6442775 ,  1.2488205 ,  1.4130265 ],
  [ 1.0548642 , -0.5402939 ,  0.23218893],
  [-0.02070524, -0.73209924, -0.75683004]
]

weights3 = [
  [ 1.9256688 ,  3.0619571 ],
  [-2.9531674 , -0.09858043],
  [-3.1945324 ,  3.0199397 ]
]

function setup() { 
  createCanvas(1280, 640);

  input = createInput();
  input.position(20, 65);

  button = createButton('Submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(run);

  title = createElement('h2', 'Enter a 4 digit number');
  title.position(20, 5);

  result = createElement('h2', '');
  result.position(20, 600);

  causationTitle = createElement('h2', 'Actual Causation (input 8573)');
  causationTitle.position(850, 65);

  causationBody = createElement('p', '');
  causationBody.position(850, 100);

  causationButton = createButton('Find Causes of Selected Nodes');
  causationButton.position(850, 200);
  causationButton.mousePressed(findActualCause);
  causationButton.hide();

  alphaBox = createElement('h4', '');
  alphaBox.position(850, 240);

  textAlign(CENTER);
  textSize(50);

  network = new Network(width/2, height/2);
  
  il = [
    new Node(-600, -200, 'input'),
    new Node(-600, -100, 'input'),
    new Node(-600, 0, 'input'),
    new Node(-600, 100, 'input')
  ]
  
  hl1 = [
    new Node(-400, -200, 'tanh'),
    new Node(-400, -100, 'tanh'),
    new Node(-400, 0, 'tanh'),
    new Node(-400, 100, 'tanh')
  ]

  hl2 = [
      new Node(-200, -125, 'tanh'),
      new Node(-200, -50, 'tanh'),
      new Node(-200, 25, 'tanh')
  ]

  ol = [
    new Node(0, -100, 'sigmoid'),
    new Node(0, 0, 'sigmoid')
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
  background(255);
  network.update();
  network.display();
}