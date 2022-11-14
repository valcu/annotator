HTMLWidgets.widget({

  name: "fabric",

  type: "output",

  factory: function (el, width, height) {
    



    return {

      renderValue: function (x) {

        let image = document.getElementById(x.activeImg)
        let fabricImg = new fabric.Image(image)

        let canvas = new fabric.Canvas(el.canvasId, {
          hoverCursor: 'pointer',
          selection: true,
          isDrawingMode: true,
          backgroundColor: null
        });

        canvas.freeDrawingBrush.width = 5
        canvas.freeDrawingBrush.decimate = 10
        canvas.freeDrawingBrush.color = 'rgba(255,93,0,1)'
        canvas.add(fabricImg)
        canvas.setDimensions({
          width: image.naturalWidth,
          height: image.naturalHeight
        })



        // convert path to polygon
        // https://stackoverflow.com/questions/67405972/converting-a-the-outlines-of-a-free-drawn-path-to-a-polygon    
        canvas.on('path:created', function (elm) {
          let path = elm.path.path
          let points = []
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

          cartesianPolygon = polygon.map(item => ({ ...item, y: image.naturalHeight - item.y }))

          console.table(cartesianPolygon)

          var cartesianPolygon = JSON.stringify(cartesianPolygon)

          document.getElementById("out").innerHTML = cartesianPolygon



        })






      },

      resize: function (width, height) {

      },

    
    };


  }
});