  function Connection(from, to, w) {
    this.a = from;
    this.b = to;
    this.weight = w;
    this.sending = false;
    this.sender = null;
    this.output = 0;
    
    
    this.feedforward = function(val) {
      this.output = val*this.weight;
      this.sender = this.a.position.copy();
      // console.log(this.output);
      // this.sender.r = Math.abs(this.output*75);
      // this.sender.r = 64;
      this.sending = true;
    }
    
    this.update = function() {
      if (this.sending) {
        this.sender.x = lerp(this.sender.x, this.b.position.x, 0.1);
        this.sender.y = lerp(this.sender.y, this.b.position.y, 0.1);
        var d = p5.Vector.dist(this.sender, this.b.position);
        if (d < 1) {
          this.b.feedforward(this.output);
          this.sending = false;
        }
      }
    }
    
    this.display = function() {
      stroke(0);
      strokeWeight(this.weight+.2);
      line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
      
      if (this.sending) {
        fill(0);
        ellipse(this.sender.x, this.sender.y, 16, 16);
      }
    }
  }
  
  function Network(x, y) { 
    this.nodes = [];
    this.connections = [];
    this.position = createVector(x, y);
    
    this.addNode = function(n) {
      this.nodes.push(n);
    }
    
    this.connect = function(a, b, weight) {
      var c = new Connection(a, b, weight);
      a.addOutConnection(c);
      b.addInConnection(c);
      this.connections.push(c);
    }
    
    this.feedforward = function() {
      for (var i = 0; i < arguments.length; i++) {
          var n = this.nodes[i];
          n.feedforward(arguments[i], 1);
      }
    }
    
    this.update = function() {
      for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].update();
      }
    }
    
    this.display = function() {
      push();
      translate(this.position.x, this.position.y);

      for (var i = 0; i < this.connections.length; i++) {
        this.connections[i].display();
      }

      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].display();
      }
      pop();
    }
  }
  
  function Node(x, y, func, l, r, default_r = 32) { 
    this.position = createVector(x, y);
    this.in_connections = [];
    this.out_connections = [];
    this.inputs_received = 0;
    this.sum = 0;
    this.r = r;
    this.func = func;
    this.selected = false;
    this.causeLevel = 0;
    this.on = false;
    this.layer = l;
    this.default_r = default_r;
    
    this.addInConnection = function(c) {
      this.in_connections.push(c);
    }

    this.addOutConnection = function(c) {
      this.out_connections.push(c);
    }
    
    this.feedforward = function(input) {
      this.inputs_received += 1;
      this.sum += input;
      if (this.in_connections.length == this.inputs_received || this.func == 'input') {
        this.fire();
        this.inputs_received = 0;
        this.sum = 0;
      }
    }
    
    this.fire = function() {
      var out;
      if (this.func == 'tanh') {
        out = Math.tanh(this.sum);
        if (out > 0) {
          this.on = true;
        }
      } else if (this.func == 'sigmoid') {
        out = 1/(1+Math.E**(this.sum*-1));
        if (out > 0.5) {
          this.on = true;
        }
      } else {
        out = this.sum;
        if (out == 1) {
          this.on = true;
        }
      }
      if (this.out_connections.length != 0) {
        for (var i = 0; i < this.out_connections.length; i++) {
          this.out_connections[i].feedforward(out);
        }
      } else {
        finalOutputs.push(out);
        if (finalOutputs.length > 1) {
          printLabels();
        }
      }
      //Currently rendering circle pulse in proportion to signal
      //not sure if I like this
      this.r = 64 * Math.abs(out);
    }
    
    this.display = function() {
      stroke(0);
      strokeWeight(1);
      //var b = map(this.sum,0,1,255,0);
      // if (this.selected == true && this.layer == 1) {
      //   fill('yellow');
      // } else if (this.selected == true && this.layer == 2) {
      //   fill('orange');
      // } else if (this.selected == true && this.layer == 3) {
      //   fill('red')
      // } else if (this.selected == true && this.layer == 4) {
      //   fill(168, 6, 6);
      if (this.selected == true && this.layer == causalityLayers[0]) {
        stroke('blue');
        strokeWeight(5);
      } else if (this.selected == true && this.layer == causalityLayers[1]) {
        stroke('green');
        strokeWeight(5);
      }
      if (this.on == true) {
        fill('black');
      } else {
        fill('white');
      }
      if (this.causeLevel != 0) {
        // //blue color scheme
        // fill(color(255-255*this.causeLevel, 255-255*this.causeLevel, 255));
        //red color scheme -> 0.7 coefficient captures diversity across range of values over 1
        fill(color(255, 255-255*this.causeLevel*.7, 255-255*this.causeLevel*.7));
      }
      ellipse(this.position.x, this.position.y, this.r, this.r);
      this.r = lerp(this.r,this.default_r,0.1);
    }
  }

