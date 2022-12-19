



function annotator(el, im, resultId, brushWidth, brushColor, opacity , fill) {
  
  // making sure image dims are read before canvas is initialized, or the img is not always displayed
  function imageDims(src) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve([img.width, img.height])
      img.src = src
    })
  }


  let canvas = new fabric.Canvas("annotator_canvas", {
    containerClass: 'annotator-canvas' 
  })
  


  imageDims(im).then(v => {

    canvas.setWidth(v[0]);
    canvas.setHeight(v[1]);

  });

  canvas.setBackgroundImage(im,
    canvas.renderAll.bind(canvas)
  )

  canvas.isDrawingMode = true

  canvas.freeDrawingBrush.width = brushWidth
  canvas.freeDrawingBrush.color = brushColor

  canvas.on('path:created', function (e) {

    e.path.id = fabric.Object.__uid++

    var path = e.path.path
    var points = []
    for (var i = 0; i < path.length; i++) {
      point = {
        x: (path[i][1]),
        y: (path[i][2])
      }
      points.push(point)

    }

    shape = new fabric.Polygon(points, {
      stroke: brushColor,
      opacity: opacity,
      strokeWidth: brushWidth,
      fill: fill

    })
    
    canvas.add(shape)

    polygon = Array.from(points)

    polygon.forEach((item, i) => {
      polygon[i].pid = e.path.id;
    });    
  

    //output: H - y is the conversion from image to cartesian coords
    cartesianPolygon = polygon.map(item => ({ ...item, y: canvas.height - item.y }))
      
    var cartesianPolygon = JSON.stringify(cartesianPolygon)


    
    if (HTMLWidgets.shinyMode) {
      

      Shiny.setInputValue(resultId, cartesianPolygon)

    } else {
      // TODO: pass result to clipboard rather than div. popup for info
      var e = '<div id="' + resultId + '" class="annotator-output" > </div>'

      $(e).appendTo(el);
      document.getElementById(resultId).innerHTML = "jsonlite::fromJSON('" + cartesianPolygon + "')"
      }

  })

  $('#clear_annotations').on('click', function () {
    canvas.remove.apply(canvas, canvas.getObjects().concat());
    canvas.renderAll();

    $("#" + resultId).empty();

  });

  // resize canvas
  function resizeAnnotatorCanvas(scale) {

    var objects = canvas.getObjects();
    for (var i in objects) {
      objects[i].scaleX = objects[i].scaleX * scale;
      objects[i].scaleY = objects[i].scaleY * scale;
      objects[i].left = objects[i].left * scale;
      objects[i].top = objects[i].top * scale;
      objects[i].setCoords();
    }

    canvas.backgroundImage.scaleX = canvas.backgroundImage.scaleX * scale;
    canvas.backgroundImage.scaleY = canvas.backgroundImage.scaleY * scale;

    canvas.discardActiveObject();
    canvas.setWidth(canvas.getWidth() * scale);
    canvas.setHeight(canvas.getHeight() * scale);
    canvas.renderAll();
    canvas.calcOffset();


  }

  // todo: should depend on key bindings instead of DOM

  $(document).ready(function () {
    
    $('#resize').click(function () {
      resizeAnnotatorCanvas($('#resize-width').val());
      $('#resize-width').val('');
    });
  
  });

 

}
