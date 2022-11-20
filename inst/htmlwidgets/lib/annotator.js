
function annotator(el, im, W, H, resultId) {

  
  // $('#annotator_canvas').remove();
  // $(' <canvas id="annotator_canvas"> </canvas>').appendTo(el);

  let canvas = new fabric.Canvas("annotator_canvas", {
  });
  canvas.setWidth(W);
  canvas.setHeight(H);

  canvas.setBackgroundImage(im, canvas.renderAll.bind(canvas));

  canvas.isDrawingMode = true

  canvas.freeDrawingBrush.width = 5
  canvas.freeDrawingBrush.decimate = 10
  canvas.freeDrawingBrush.color = 'rgba(255,93,0,1)'

  
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
      stroke: 'rgba(255,93,0,1)',
      opacity: 0.5,
      strokeWidth: 5,
      fill: 'gray'

    })

    canvas.add(shape)

    polygon = Array.from(points)

    polygon.forEach((item, i) => {
      polygon[i].pid = e.path.id;
    });    
  
    //console.table(polygon)

    //output
    cartesianPolygon = polygon.map(item => ({ ...item, y: H - item.y }))

    var cartesianPolygon = JSON.stringify(cartesianPolygon)

    
    if (HTMLWidgets.shinyMode) {
      
      $("#pid").on("change", function () {
        //Shiny.onInputChange(canvas.dispose() ) ;
      
      })

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



}
