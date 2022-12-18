



function annotator(el, im, resultId, brushWidth, brushColor, opacity , fill) {
  
  // making sure image dims are read before canvas is initialized
  function imageDims(src) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve([img.width, img.height])
      img.src = src
    })
  }




  let canvas = new fabric.Canvas("annotator_canvas", {
  })
  


  imageDims(im).then(v => {

    canvas.setWidth(v[0]);
    canvas.setHeight(v[1]);

  });

  canvas.setBackgroundImage(im, canvas.renderAll.bind(canvas))

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
      var e = '<div id="' + resultId + '"> </div>'

      $(e).appendTo(el);
      document.getElementById(resultId).innerHTML = "jsonlite::fromJSON('" + cartesianPolygon + "')"
      }

  })

  $('#clear_annotations').on('click', function () {
    canvas.remove.apply(canvas, canvas.getObjects().concat());
    canvas.renderAll();
  });

  // resize canvas (https://jsfiddle.net/zsk7785t/)

  $(document).ready(function () {
    $('#resize').click(function () {
      GetCanvasAtResoution($('#resize-width').val());
      $('#resize-width').val("");
    });
  });

  // https://jsfiddle.net/zsk7785t/
  function GetCanvasAtResoution(newWidth) {
    if (canvas.width != newWidth) {
      var scaleMultiplier = newWidth ;
      var objects = canvas.getObjects();
      for (var i in objects) {
        objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
        objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
        objects[i].left = objects[i].left * scaleMultiplier;
        objects[i].top = objects[i].top * scaleMultiplier;
        objects[i].setCoords();
      }
      var obj = canvas.backgroundImage;
      if (obj) {
        obj.scaleX = obj.scaleX * scaleMultiplier;
        obj.scaleY = obj.scaleY * scaleMultiplier;
      }

      canvas.discardActiveObject();
      canvas.setWidth(canvas.getWidth() * scaleMultiplier);
      canvas.setHeight(canvas.getHeight() * scaleMultiplier);
      canvas.renderAll();
      canvas.calcOffset();
    }
  }




}
