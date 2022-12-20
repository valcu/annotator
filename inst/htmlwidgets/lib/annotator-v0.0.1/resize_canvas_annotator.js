
  // resize canvas
  function resizeAnnotatorCanvas(scale) {

    canvas.remove.apply(canvas, canvas.getObjects().concat());
    canvas.renderAll();

    $("#" + resultId).empty();    
    //////////////////////////

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

  //resize on mouse wheel

  $(document).ready(function () {
    $(this).bind("wheel mousewheel", function (e) {
      var delta;

      if (e.originalEvent.wheelDelta !== undefined)
        delta = e.originalEvent.wheelDelta;
      else delta = e.originalEvent.deltaY * -1;

      if (delta > 0) {
        resizeAnnotatorCanvas(1.05);
      } else {
        resizeAnnotatorCanvas(0.95);
      }
    });
  });
