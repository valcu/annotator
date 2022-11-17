
# Basic examples


if(interactive()) {

library(shiny)
library(annotator)

im_id = paste0(sample(1:20, 1) |> stringr::str_pad(3, pad = 0), ".jpg")
im = system.file("sample_images", "PUFFIN", im_id , package = "annotator")

ui <-  fluidPage(

  tags$h4("Draw some polygons on the image"),

  annotatorOutput("annotation"),
  

  tags$h4("XY coordinates (pixels)"),

  verbatimTextOutput("results") 

)

server <- function(input, output) {

  O <<- list()
 
  output$annotation <- renderAnnotator(
    annotate(im, resultId = "res_id")
  )

  output$results <- renderPrint({

    req(input$res_id)

    o = input$res_id
    O <<- append(O, o)

      
    lapply(O, function(x)  jsonlite::fromJSON(x) )


  })



}



shinyApp(ui = ui, server = server)




}
