
if(interactive()) {

library(shiny)
library(annotator)

im <- system.file("sample_images", "PUFFIN", "010.jpg", package = "annotator")

ui <- shinyUI(fluidPage(
  annotatorOutput("annotation"),
  
  verbatimTextOutput("results"), 

  tags$div(id = "annotator_output"),
  tags$script('
    var x = document.getElementById("annotator_output")
    Shiny.onInputChange("annotator_output", x)

  ')




))

server <- function(input, output) {
  
 
  output$annotation <- renderAnnotator(
    annotate(im)
  )

    output$results <- renderPrint({
      input$annotator_output
    })






}

shinyApp(ui = ui, server = server)





}
