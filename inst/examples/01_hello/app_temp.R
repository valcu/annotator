
# Basic example

library(shiny)
library(annotator)

im <- system.file("sample_images", "aves", "3.jpg", package = "annotator")


ui <-  fluidPage(

  sidebarLayout(
    sidebarPanel(




      ),

  mainPanel(
    annotatorOutput("annotation")
  )
 )


  )

server <- function(input, output) {

  output$annotation <- renderAnnotator({
    annotate(im, resultId = "res_id")

  })


  output$results <- renderTable({

    req(input$res_id)

    jsonlite::fromJSON(input$res_id)


  })



}


shinyApp(ui = ui, server = server)
