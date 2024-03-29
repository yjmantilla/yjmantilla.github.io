function gaussianRand() {
    var rand = 0;
    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }
    return (rand / 6)-0.5;
  }
  
  var X = [],
      Y = [],
      n = 100000,
      i;
  
  for (i = 0; i < n; i += 1) {
    X.push(gaussianRand());
    Y.push(gaussianRand());
  }
  
  var data = [{
      type: "scattergl",
      mode: "markers",
      marker: {
          line: {
              width: 1,
              color: '#404040'}
      },
      x: X,
      y: Y
  }]
  
  Plotly.newPlot('myDiv', data)