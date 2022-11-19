HTMLWidgets.widget({

  name: "fabric",
  type: "output",


  
  renderValue: function (el, x) {

    $('div.canvas-container').remove();
    $('#upper-canvas ').remove();
    $('#lower-canvas').remove();
    $('#annotator_canvas').remove();
    
    $(' <canvas id="annotator_canvas"> </canvas>').appendTo(el);


  
     annotator(el, x.im, x.W, x.H, x.resultId) 

    }
    

  })
