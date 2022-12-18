



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
      var e = '<div id="' + resultId + '"> </div>'

      $(e).appendTo(el);
      document.getElementById(resultId).innerHTML = "jsonlite::fromJSON('" + cartesianPolygon + "')"
      }

  })

  $('#clear_annotations').on('click', function () {
    canvas.remove.apply(canvas, canvas.getObjects().concat());
    canvas.renderAll();

    $("#" + resultId).empty();

  });


 

}
