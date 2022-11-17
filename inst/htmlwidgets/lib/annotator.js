
function annotator(el, im, W, H, resultId) {


  $(' <canvas id="annotator_canvas"> </canvas>').appendTo(el);

  let canvas = new fabric.Canvas("annotator_canvas", {
  });
  canvas.setWidth(W);
  canvas.setHeight(H);

  canvas.setBackgroundImage(im, canvas.renderAll.bind(canvas));

  canvas.isDrawingMode = true

  canvas.freeDrawingBrush.width = 5
  canvas.freeDrawingBrush.decimate = 10
  canvas.freeDrawingBrush.color = 'rgba(255,93,0,1)'


  localStorage.removeItem('annot');


  canvas.on('path:created', function (e) {
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
      description: 'aaa',
      fill: 'gray'

    })

    canvas.add(shape)

    polygon = Array.from(points)

    //console.table(polygon)

    //output
    cartesianPolygon = polygon.map(item => ({ ...item, y: H - item.y }))

    var cartesianPolygon = JSON.stringify(cartesianPolygon)

    if (HTMLWidgets.shinyMode) {

      Shiny.setInputValue(resultId, cartesianPolygon)
    } else {
      var e = '<div id="' + resultId + '"> </div>'
      alert(e)
      $(e).appendTo(el);
      document.getElementById(resultId).innerHTML = "jsonlite::fromJSON('" + cartesianPolygon + "')"
      }
    

  })

}
