
#' this is an 800x600 transparent png 
empty_png <- function() {
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAA8CAQAAAA0hRaeAAAAw0lEQVR42u3VIQEAAAzDsM+/6TsYGE4klDQHAINIAICBAGAgABgIAAYCAAYCgIEAYCAAGAgABgIABgKAgQBgIAAYCAAGAgAGAoCBAGAgABgIAAYCAAYCgIEAYCAAGAgABgIABgKAgQBgIAAYCAAGAgAGAoCBAGAgABgIAAYCAAYCgIEAYCAAGAgAGAgABgKAgQBgIAAYCAAYCAAGAoCBAGAgABgIABgIAAYCgIEAYCAAGAgAGAgABgKAgQBgIAAYCAB0Dy6UAD0SIPrpAAAAAElFTkSuQmCC"

}


#' Run Shiny Examples
#'
#' Launch Shiny example applications bundled in annotator. 
#'
#' @param example The name of the example to run. Available are: `01_hello`, `02_pipelineSimple`
#' @param ... further arguments to pass to  [shiny::runApp()]
#' @md 
#' @examples
#' ## Only run this example in interactive R sessions
#' if (interactive()) {
#'  annotator::runExample("01_hello")
#'  annotator::runExample("02_pipelineSimple")
#'
#'  # Print the directory containing the code for all examples
#'  system.file("examples", package = "annotator")
#' }
#' @export
runExample <- function(example, ...) {
  
  
  examplesDirs = system.file("examples", package = "annotator") |>
    list.files(full.names = TRUE)

  examplesDir = examplesDirs[which(basename(examplesDirs) == example)]
  
  runApp(appDir = examplesDir, ...)

}
