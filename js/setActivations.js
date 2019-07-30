function setVirginicaActivations() {
    turnAllOff();
    for (var i=0; i < causePars.length; i++) {
      causePars[i].html('')
    };
    result.html('');
    network.feedforward(1,0,1,0,1,1,0,1,1,0);
    showInputSample.html('Input sample: 1,0,1,0,1,1,0,1,1,0');
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
    showInputSample.html('Input sample: 1,0,1,0,1,1,0,1,0,1');
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
    result.html('');
    for (var i=0; i < causePars.length; i++) {
      causePars[i].html('')
    };
    network.feedforward(1,0,0,1,0,0,1,0,0,0);
    showInputSample.html('Input sample: 1,0,0,1,0,0,1,0,0,0');
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
    network.feedforward(0,0,0,0,0,1,0,0,0,0);
    showInputSample.html('Input sample: 0,0,0,0,0,1,0,0,0,0');
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