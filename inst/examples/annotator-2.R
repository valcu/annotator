
# Basic examples


if(interactive()) {

library(shiny)
library(annotator)
library(glue)
library(terra)
library(sf)

ims = system.file("sample_images", "aves", package = "annotator") |> list.files(full.names = TRUE)
names(ims) = basename(ims)

ui <-  fluidPage(

  tags$h4("Draw some polygons on the image"),

  selectInput("pid", "photo", choices = ims),

fluidRow(
  column(6,
    align = "right",
    annotatorOutput("annotation")
  ), 
  
  column(6,
    align = "left",
    uiOutput("results")
  )



)
)

server <- function(input, output) {


  output$annotation <- renderAnnotator({
   
    annotate(input$pid, resultId = "res_id")


 })

  output$results <- renderUI({

    req(input$res_id)

    o = input$res_id |>
      jsonlite::fromJSON() |>
      st_as_sf(coords = c("x", "y")) |>
      st_combine() |>
      st_cast("LINESTRING") |>
      st_cast("POLYGON")
    

    assign("o", o, .GlobalEnv) 
    assign("r", rast(input$pid), .GlobalEnv)
    
    x = extract(r, vect(o))

    avcol = sapply(x, median, 2)[-1]
    avcol = glue_collapse(avcol, sep = ",")
    avcol = glue("rgb({avcol})")
    

    A = glue("<h3><code>{st_as_text(o)}</code><h3>") 

    B = glue('<h1>
    Image size = {prod(dim(r)[1:2])} pixels <br>
    Selected area = {st_area(o) |> round(2)} pixels <br>
    <p style="color:{avcol};"> Median color = {avcol} <br>
    <svg width="200" height="30">
      <rect width="200" height="30" style="fill:{avcol};" />
    </svg>
    </h1>

    ')

    glue_collapse(c(A, B), sep = "<hr>") |> HTML()

  })



}



shinyApp(ui = ui, server = server) |> runApp(launch.browser = TRUE)




}
