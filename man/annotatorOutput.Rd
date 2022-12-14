% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/annotator.R
\name{annotatorOutput}
\alias{annotatorOutput}
\title{Widget output function for use in Shiny}
\usage{
annotatorOutput(outputId, width = "auto", height = "auto", ...)
}
\arguments{
\item{outputId}{The name of the input.}

\item{width}{in CSS units, default to "auto".}

\item{height}{in CSS units, default to "auto".}

\item{...}{further arguments to pass to \code{\link[htmlwidgets:htmlwidgets-shiny]{htmlwidgets::shinyWidgetOutput()}} e.g. \code{inline}.}
}
\value{
An object generated by \code{\link[htmlwidgets:htmlwidgets-shiny]{htmlwidgets::shinyWidgetOutput()}}.
}
\description{
Widget output function for use in Shiny
}
\examples{
# Print the directory containing the code for all examples to see this function in use.
system.file("examples", package = "annotator")
}
\seealso{
\code{\link[=runExample]{runExample()}}
}
