
function annotator(el, img) {

  let imgEl = '<img src="' + img + '" id="activeImg" style="display:none">'
  console.log(imgEl)

  $(imgEl).appendTo(el);
  $(' <canvas id="canvasId" style="border:1px solid #000000"> </canvas>').appendTo(el);
  $('<p id="out"></p>').appendTo(el);


  // Initiate and set the canvas
  let canvas = new fabric.Canvas(document.getElementById('canvasId'))

  //fabric.Object.prototype.originY = 'bottom'

  canvas.isDrawingMode = true

  canvas.freeDrawingBrush.width = 5
  canvas.freeDrawingBrush.decimate = 10
  canvas.freeDrawingBrush.color = 'rgba(255,93,0,1)'


  // Add image to canvas (set size to fit the photo )

  let image = document.getElementById('activeImg')

  let activeImg = new fabric.Image(image)


  canvas.add(activeImg)

  canvas.setDimensions({
    width: image.naturalWidth,
    height: image.naturalHeight
  })




  // convert path to polygon
  // https://stackoverflow.com/questions/67405972/converting-a-the-outlines-of-a-free-drawn-path-to-a-polygon    
  canvas.on('path:created', function (el) {
    var path = el.path.path
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


    // output a converted polygon: from <canvas> coordinates to cartesian
    polygon = Array.from(points)

    console.table(polygon)

    cartesianPolygon = polygon.map(item => ({ ...item, y: image.naturalHeight - item.y }))

    var cartesianPolygon = JSON.stringify(cartesianPolygon)

    document.getElementById("out").innerHTML = cartesianPolygon



  })



}
