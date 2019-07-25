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
      // sb.hide();
      // cb.show();
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
    // sb.show();
    // cb.hide();
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