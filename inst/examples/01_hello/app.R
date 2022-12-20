
# Basic example

library(shiny)
library(annotator)

im <- system.file("sample_images", "aves", "1.jpg", package = "annotator")

ui <-  fluidPage(

  fluidRow(
    column(6,
      tags$h4("Draw some polygons on the image"),
      align = "right",
      annotatorOutput("annotation")
    ),
    column(6,
      tags$h4("XY cartesian coordinates (pixels)"),
      align = "left",
      tableOutput("results")
    )
  ), 


  )

server <- function(input, output) {
  
  output$annotation <- renderAnnotator({
    annotate(im, resultId = "res_id")
  
  })


  output$results <- renderTable({

    req(input$res_id)

    data.table::fread(input$res_id)


  })



}


shinyApp(ui = ui, server = server) 