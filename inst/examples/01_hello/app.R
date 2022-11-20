
# Basic example

library(shiny)
library(annotator)

im <- system.file("sample_images", "aves", "3.jpg", package = "annotator")
imgsrc <- system.file("sample_images", "datasource.txt", package = "annotator") |> read.delim()


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

  HTML(glue::glue("
      <footer>
      {
        imgsrc[3, ]
      }
      </footer>
  
  "))



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