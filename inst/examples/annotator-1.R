
if(interactive()) {

library(shiny)
library(annotator)

im <- system.file("sample_images", "PUFFIN", "010.jpg", package = "annotator")

ui <- shinyUI(fluidPage(
  annotatorOutput("annotation"),
  uiOutput(outputId = "annotator_output")
))

server <- function(input, output) {
  
 
  output$annotation <- renderAnnotator(
    annotate(im)
  )

  output$annotator_output <- renderUI(


  )





}

shinyApp(ui = ui, server = server)





}
