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