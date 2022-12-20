
# Basic example

library(annotator)
library(shiny)
library(glue)
library(terra)
library(sf)

im <- system.file("sample_images", "spatial", "meuse.png", package = "annotator")


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

    jsonlite::fromJSON(input$res_id)


  })



}


shinyApp(ui = ui, server = server) 