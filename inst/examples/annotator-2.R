
# Basic examples


if(interactive()) {

library(shiny)
library(annotator)

im_ids = paste0(1:20 |> stringr::str_pad(3, pad = 0), ".jpg")
ims = sapply(im_ids, function(i) system.file("sample_images", "PUFFIN", i, package = "annotator"))

ui <-  fluidPage(

  tags$h4("Draw some polygons on the image"),

  selectInput("pid", "photo", choices = ims),

  annotatorOutput("annotation"),
  
  tags$h4("XY coordinates (pixels)"),

  verbatimTextOutput("results") 

)

server <- function(input, output) {

  # observe(print(reactiveValuesToList(input)))

  O <<- list()


 
  output$annotation <- renderAnnotator({
   
    annotate(input$pid, resultId = "res_id")


 })


     



  output$results <- renderPrint({

    req(input$res_id)

    o = input$res_id
    O <<- append(O, o)

      
    lapply(O, function(x)  jsonlite::fromJSON(x) )


  })



}



shinyApp(ui = ui, server = server) |> runApp(launch.browser = TRUE)




}
