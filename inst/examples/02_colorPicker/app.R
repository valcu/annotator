
# A simple pipeline: using all images in a directory.


library(annotator)
library(shiny)
library(keys)
library(glue)
library(terra)
library(sf)

ims = system.file("sample_images", "aves", package = "annotator") |> list.files(full.names = TRUE)
names(ims) = basename(ims)

imgsrc = system.file("sample_images", "datasource.txt", package = "annotator")|>read.delim()

ui <-  fluidPage(
    useKeys(), 
     keysInput("keys", c("left", "right")),

    tags$h4(
      HTML("Draw some polygons on the image. <br>
          Use the left and right arrow keys to navigate.")
    )
    ,

    selectInput("pid", "photo", choices = ims),
    actionButton("next_photo", "Next photo"),

    fluidRow(
    column(6,
      align = "right",
      annotatorOutput(outputId = "annotation")
    ), 
    
    column(6,
      align = "left",
      uiOutput("results")
    )
  )
)

server <- function(input, output, session) {
  observeEvent(input$next_photo, {
    which_pid = which(ims == input$pid)

    updateSelectInput(session, "pid", selected = ims[which_pid + 1])
  })

  observeEvent(input$keys, {
    
    which_pid = which(ims == input$pid)

    switch(input$keys,
      "left"  = updateSelectInput(session, "pid", selected = ims[which_pid - 1]),
      "right" = updateSelectInput(session, "pid", selected = ims[which_pid + 1])
    )
  
  })







  output$annotation <- renderAnnotator({
    annotate(input$pid, resultId = "res_id")
  })

  output$results <- renderUI({
    assign("input", input |> reactiveValuesToList(), .GlobalEnv)

    req(input$res_id)

    d = input$res_id |> jsonlite::fromJSON()
    ds = st_as_sf(d, coords = c("x", "y")) |>
      st_combine() |>
      st_cast("LINESTRING") |>
      st_cast("POLYGON")

    pid = isolate(d$pid[1])

    r = rast(input$pid)

    x = extract(r, vect(ds))

    avcol = sapply(x, median, 2)[-1]
    avcol = glue_collapse(avcol, sep = ",")
    avcol = glue("rgb({avcol})")

    thissrc = basename(input$pid) |> stringr::str_remove("\\.jpg")

    glue('
    <a class="badge badge-primary">PID {pid}</a>
    <h3>
    <code>{st_as_text(ds)}</code>
    <h3>

    <h1>
      Image size = {prod(dim(r)[1:2])} pixels <br>
      Selected area = {st_area(ds) |> round(2)} pixels <br>
      <p style="color:{avcol};"> Median color = {avcol} <br>
      <svg width="500" height="50">
        <rect width="500" height="50" style="fill:{avcol};" />
      </svg>
    </h1>

 

    ') |> HTML()
  })
}

shinyApp(ui = ui, server = server)