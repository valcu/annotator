
#' @import htmlwidgets
#' @export
#' @examples 
#' if(interactive()) {
#' im = system.file("sample_images", "PUFFIN","010.jpg" , package = "annotator")
#' annotate(im)
#' }

annotate <- function(im) {

  x <- list(
    im = knitr::image_uri(im)
  )

  htmlwidgets::createWidget(
    name = "fabric",
    x,
    package = "annotator", 
    elementId = "annotator"

  )



}