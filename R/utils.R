
#' this is an 800x600 transparent png 
empty_png <- function() {
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAA8CAQAAAA0hRaeAAAAw0lEQVR42u3VIQEAAAzDsM+/6TsYGE4klDQHAINIAICBAGAgABgIAAYCAAYCgIEAYCAAGAgABgIABgKAgQBgIAAYCAAGAgAGAoCBAGAgABgIAAYCAAYCgIEAYCAAGAgABgIABgKAgQBgIAAYCAAGAgAGAoCBAGAgABgIAAYCAAYCgIEAYCAAGAgAGAgABgKAgQBgIAAYCAAYCAAGAoCBAGAgABgIABgIAAYCgIEAYCAAGAgAGAgABgKAgQBgIAAYCAB0Dy6UAD0SIPrpAAAAAElFTkSuQmCC"

}


#' Run Shiny Examples
#'
#' Launch Shiny example applications bundled in annotator. 
#'
#' @param example The name of the example to run. Available are: `01_hello`, `02_pipeline`
#' @param ... further arguments to pass to  [shiny::runApp()]
#' @return No return value, called for its side effects.
#' @examples
#' ## Only run this example in interactive R sessions
#' if (interactive()) {
#'  annotator::runExample("01_hello")
#'  annotator::runExample("02_pipeline")
#'
#'  # Print the directory containing the code for all examples
#'  system.file("examples", package = "annotator")
#' }
#' @md 
#' @export
runExample <- function(example, ...) {
  
  
  examplesDirs = system.file("examples", package = "annotator") |>
    list.files(full.names = TRUE)

  examplesDir = examplesDirs[which(basename(examplesDirs) == example)]
  
  runApp(appDir = examplesDir, ...)

}
