
#' Create an annotation widget
#' 
#' This function creates an annotation using [htmlwidgets]. 
#' The widget can be rendered on HTML pages generated from Shiny or
#' other applications.
#'  
#' @param im the input image. If missing, a transparent 800x600 png is used.
#' @param resultId the id of the div in the UI where the annotation (the drawn polygon) is stored. 
#' Only relevant when the widget is used in shiny. Defaults to "annot_id".
#' @md
#' @export
#' @examples 
#' if(interactive()) {
#' require(annotator)
#' im = system.file("sample_images", "aves","10.jpg" , package = "annotator")
#' annotate(im)
#' }

annotate <- function(im, resultId = "annot_id") {

  if (missing(im)) {
    im64 = empty_png()
    W = 600
    H = 800
  } else {
    ii = load.image(im)
    W = width(ii)
    H = height(ii)
    im64 = knitr::image_uri(im)

    }
  

  x <- list(
    im = im64, 
    W = W,
    H = H, 
    resultId = resultId
  )

  createWidget(
    name = "fabric",
    x,
    package   = "annotator", 
    width = W,
    height = H

  )



}


#' Widget output function for use in Shiny
#'
#' @param outputId The name of the input.
#' @param width   in CSS units, default to "auto".
#' @param height  in CSS units, default to "auto".
#' @param ...  further arguments to pass to [htmlwidgets::shinyWidgetOutput()] e.g. `inline`.
#' @md 
#' @export
annotatorOutput <- function(outputId, width = "auto", height = "auto", ...) {
  
  shinyWidgetOutput(outputId, "fabric", width, height, package = "annotator", ...)

}

#' Widget render function for use in Shiny
#' @param expr An annotator expression.
#' @param env A environment. Default to `parent.frame()`.
#' @param quoted  A boolean value.
#' @export
renderAnnotator <- function(expr, env = parent.frame(), quoted = FALSE) {

  if (!quoted) {
    expr <- substitute(expr)
  } 
  shinyRenderWidget(expr, annotatorOutput, env, quoted = TRUE)

}