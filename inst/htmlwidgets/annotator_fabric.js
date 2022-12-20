HTMLWidgets.widget({

  name: "annotator_fabric",
  type: "output",


  
  renderValue: function (el, x) {

    // cleanup
    $('div.annotator-canvas').remove();
    $('#upper-canvas ').remove();
    $('#lower-canvas').remove();
    $('#annotator_canvas').remove();
    $('#clear_annotations').remove();
    $("#copy_annotations").remove();
    
    // canvas
    $('<canvas id="annotator_canvas"> </canvas>').appendTo(el);

    // controls
    $('<button id="clear_annotations" class="annotator"> Undo</button>').appendTo(el);
    
    if (!HTMLWidgets.shinyMode) {
      $('<button id="copy_annotations" class="annotator" > Copy</button >').appendTo(el);
    }

    
    
    annotator(el, x.im, x.resultId, x.brushWidth, x.brushColor, x.opacity, x.fill) 

    }
    

  })
