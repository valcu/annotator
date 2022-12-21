
function annotator(el, im, resultId, brushWidth, brushColor, opacity , fill) {
  // making sure image dims are read before canvas is initialized, or the img is not always displayed
  function imageDims(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve([img.width, img.height]);
      img.src = src;
    });
  }

  let canvas = new fabric.Canvas("annotator_canvas", {
    containerClass: "annotator-canvas",
  });

  imageDims(im).then((v) => {
    canvas.setWidth(v[0]);
    canvas.setHeight(v[1]);
  });

  canvas.setBackgroundImage(im, canvas.renderAll.bind(canvas));

  canvas.isDrawingMode = true;

  // Each point that is less than decimate pixel distant from another will be omitted.
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  canvas.freeDrawingBrush.decimate = 5;
  canvas.freeDrawingBrush.width = brushWidth;
  canvas.freeDrawingBrush.color = brushColor;


  canvas.on("path:created", function (e) {
    e.path.id = fabric.Object.__uid++;

    var path = e.path.path;
    var points = [];
    for (var i = 0; i < path.length; i++) {
      point = {
        x: path[i][1],
        y: path[i][2],
      };
      points.push(point);
    }

    shape = new fabric.Polygon(points, {
      stroke: brushColor,
      opacity: opacity,
      strokeWidth: brushWidth,
      fill: fill,
    });

    canvas.add(shape);

    // add pid within polygon
    let pidLoc = shape.getCenterPoint();

    var text = new fabric.Text(e.path.id.toString(), {
      fontSize: 16,
      fontWeight: "bold",
    });

    text.setPositionByOrigin(pidLoc, "center", "center");
    canvas.add(text);

    // create output
    function array2rlist(pts) {
      var x = pts.map((u) => u.x).join(", ");
      //canvas.height - u.y is the conversion from image coords to cartesian coords
      var y = pts.map((u) => canvas.height - u.y).join(", ");
      var pid = Array(pts.length).fill(e.path.id).join(", ");

      var o = `pid${e.path.id} = list(x=c(${x}), y=c(${y}), id=c(${pid}))`;

      return o;
    }

    out = array2rlist(points);

    // place output depending on context
    if (HTMLWidgets.shinyMode) {
      Shiny.setInputValue(resultId, out);
    } else {
      var copyann = document.getElementById("copy_annotations");
      var clipboard = new ClipboardJS(copyann);

      // Pass result to clipboard
      $("#copy_annotations").attr("data-clipboard-text", out);

      // feeback on copy
      clipboard.on("success", function () {
        $("#copy_annotations").html("Polygon " + e.path.id + " copied!");

        setTimeout(() => {
          $("#copy_annotations").html("Copy");
        }, 2000);
      });
    }
  }); // end canvas.on

  // clear canvas and remove polygons
  $("#clear_annotations").on("click", function () {
    canvas.remove.apply(canvas, canvas.getObjects().concat());
    canvas.renderAll();

    $("#" + resultId).empty();
  });
}
