
#' @import htmlwidgets
#' @export

annotate <- function(img) {

  imgstring = knitr::image_uri(img)

  # forward options using x
  x <- list(
    img = imgstring
  )

  # create widget
  htmlwidgets::createWidget(
    name = "fabric",
    x,
    package = "annotator"
  )

}