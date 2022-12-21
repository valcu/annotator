
# Basic example

library(shiny)
library(annotator)
library(jsonlite)

im <- system.file("sample_images", "aves", "1.jpg", package = "annotator")

ui <-  fluidPage(

  mainPanel(
      tags$h4("Draw some polygons on the image"),
      annotatorOutput("annotation")
    ),
   sidebarPanel(
      tags$h4("XY cartesian coordinates (pixels)"),
      tableOutput("results")
    )
  )

server <- function(input, output) {
  
  output$annotation <- renderAnnotator({
    annotate(im, resultId = "res_id")
  
  })


  output$results <- renderTable({

    req(input$res_id)

    parse(text=input$res_id)|>eval()



  })



}


shinyApp(ui = ui, server = server) 