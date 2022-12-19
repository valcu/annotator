HTMLWidgets.widget({

  name: "fabric",
  type: "output",


  
  renderValue: function (el, x) {

    $('div.annotator-canvas').remove();
    $('#upper-canvas ').remove();
    $('#lower-canvas').remove();
    $('#annotator_canvas').remove();
    $('#clear_annotations').remove();
    
    $('<canvas id="annotator_canvas"> </canvas>').appendTo(el);
    $('<button id="clear_annotations" class="annotator"> Undo</button>').appendTo(el);

    annotator(el, x.im, x.resultId, x.brushWidth, x.brushColor, x.opacity, x.fill) 

    }
    

  })
