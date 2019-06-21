function output1Selected() {
    clean(false);
    network.nodes[17].selected = !network.nodes[17].selected;
    if (network.nodes[17].selected) {
      effects.unshift('Output Node 1');
    } else {
      effects = effects.filter(w => w != 'Output Node 1');
    }
  }
  
  function output2Selected() {
    clean(false);
    network.nodes[18].selected = !network.nodes[18].selected;
    if (network.nodes[18].selected) {
      effects.push('Output Node 2');
    } else {
      effects = effects.filter(w => w != 'Output Node 2');
    }
  }