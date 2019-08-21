// function drawHeatMap() {
//     heatmap = new Network(width*.5, height*.7);
//     var cornW = -30;
//     var cornH = -90;
//     var heatR = 15;
//     heatIL = [
//       new Node(cornW, cornH, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+25, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+50, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+75, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+100, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+125, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+150, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+175, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+200, 'input', 101, heatR, heatR),
//       new Node(cornW, cornH+225, 'input', 101, heatR, heatR)
//     ];
//     heatL1 = [
//       new Node(cornW+60, cornH+45, 'tanh', 102, heatR, heatR),
//       new Node(cornW+60, cornH+90, 'tanh', 102, heatR, heatR),
//       new Node(cornW+60, cornH+135, 'tanh', 102, heatR, heatR),
//       new Node(cornW+60, cornH+180, 'tanh', 102, heatR, heatR)
//     ];
//     heatL2 = [
//       new Node(cornW+120, cornH+45+33.75, 'tanh', 103, heatR, heatR),
//       new Node(cornW+120, cornH+45+67.5, 'tanh', 103, heatR, heatR),
//       new Node(cornW+120, cornH+45+101.25, 'tanh', 103, heatR, heatR)
//     ];
//     heatOL = [
//       new Node(cornW+180, cornH+45+33.75+22.5, 'sigmoid', 104, heatR, heatR),
//       new Node(cornW+180, cornH+45+33.75+45, 'sigmoid', 104, heatR, heatR)
//     ];
//     connectLayers(heatmap, heatIL, heatL1, weights1);
//     connectLayers(heatmap, heatL1, heatL2, weights2);
//     connectLayers(heatmap, heatL2, heatOL, weights3);
//     heatNodes = heatIL.concat(heatL1, heatL2, heatOL);
//     for (i=0;i<heatNodes.length;i++) {
//       heatmap.addNode(heatNodes[i]);
//     }
// }
  
//   function colorLayer(actual_account, layer, idx, offset) {
//     var trans = actual_account[idx].split('\n').filter(x => x != "    ");
//     for (var i=0; i<trans.length; i++) {
//       var r = parseCausationLine(trans[i]);
//       for (var j=0; j<layer.length; j++) {
//         if (r['nodes'].includes(j+offset)) {
//           layer[j].causeLevel += r['alpha'];
//         }
//       }
//     }
//   }
  
//   function parseCausationLine(line) {
//     var alpha = float(line.split('[')[0].split('=')[1]);
//     var causeNodes = line.split('[')[1].split(']')[0].split(',').map(x => int(x.replace(/\s+/, "").substring(1)));
//     return {
//       'alpha': alpha / causeNodes.length,
//       'nodes': causeNodes
//     }
//   }