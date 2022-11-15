
#' @import htmlwidgets
#' @export

annotate <- function(data = NULL) {

  # forward options using x
  x <- list(
    data = data
  )

  # create widget
  htmlwidgets::createWidget(
    name = "fabric",
    x,
    package = "annotator"
  )

}