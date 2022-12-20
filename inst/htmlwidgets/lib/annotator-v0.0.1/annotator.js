
function annotator(el, im, resultId, brushWidth, brushColor, opacity , fill) {
  
    // making sure image dims are read before canvas is initialized, or the img is not always displayed
    function imageDims(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve([img.width, img.height]);
        img.src = src;
      });
    }


  // fabric canvas ini
  let canvas = new fabric.Canvas("annotator_canvas", {
    containerClass: "annotator-canvas",
  });

  imageDims(im).then((v) => {
    canvas.setWidth(v[0]);
    canvas.setHeight(v[1]);
  });

  canvas.setBackgroundImage(im, canvas.renderAll.bind(canvas));

  canvas.isDrawingMode = true;

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

    // points to csv
    function fabricPoly2csv(pts) {
      polygon = Array.from(pts);

      polygon.forEach((item, i) => {
        polygon[i].pid = e.path.id;
      });
      //H - y is the conversion from image coords to cartesian coords
      polygonCartesian = polygon.map((item) => ({
        ...item,
        y: canvas.height - item.y,
      }));

      const header = Object.keys(polygonCartesian[0]);
      const csv = [
        header.join(","),
        ...polygonCartesian.map((row) =>
          header.map((fieldName) => JSON.stringify(row[fieldName])).join(",")
        ),
      ].join("\r\n");
      // TODO return R list
      return csv;
    }

    // place output depending on context
    var csv = `"${fabricPoly2csv(points)}"`  ;

    if (HTMLWidgets.shinyMode) {
      Shiny.setInputValue(resultId, csv);
    } else {
      var copyann = document.getElementById("copy_annotations");
      var clipboard = new ClipboardJS(copyann);

      // Pass result to clipboard

      $("#copy_annotations").attr("data-clipboard-text", csv);

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
