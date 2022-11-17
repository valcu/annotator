
#' @import htmlwidgets
#' @export
#' @examples 
#' if(interactive()) {
#' im = system.file("sample_images", "PUFFIN","010.jpg" , package = "annotator")
#' annotate(im)
#' }

annotate <- function(im) {

  ii = load.image(im)
  W = width(ii)
  H = height(ii)

  x <- list(
    im = knitr::image_uri(im), 
    W = W,
    H = H
  )

  htmlwidgets::createWidget(
    name = "fabric",
    x,
    package   = "annotator", 
    width = W,
    height = H,

  )



}



#' @export
annotatorOutput <- function(outputId, width = "100%", height = "400px") {
  
  shinyWidgetOutput(outputId, "fabric", width, height, package = "annotator")

}


#' @export
renderAnnotator <- function(expr, env = parent.frame(), quoted = FALSE) {

  if (!quoted) {
    expr <- substitute(expr)
  } 
  shinyRenderWidget(expr, annotatorOutput, env, quoted = TRUE)

}