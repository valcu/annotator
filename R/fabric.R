
#' @import htmlwidgets
#' @export

fabric <- function(data = list(), elementId = NULL) {
  items <- data

  # forward options using x
  x <- list(
    items = items
  )

  # create widget
  htmlwidgets::createWidget(
    name = "fabric",
    x,
    package = "annotator",
    elementId = elementId
  )
}