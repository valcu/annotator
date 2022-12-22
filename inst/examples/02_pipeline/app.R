
# A simple pipeline: using all images in a directory.


library(annotator)
library(shiny)
library(bslib)
library(colourpicker)
library(DT)
library(keys)
library(glue)
library(terra)
library(sf)

ims = system.file("sample_images", "aves", package = "annotator") |> list.files(full.names = TRUE)
names(ims) = basename(ims)


annotation_output <- function(x = input$res_id, pid = input$pid) {
      d = parse(text = x) |>
        eval() |>
        data.frame()
      ds = st_as_sf(d, coords = c("x", "y")) |>
        st_combine() |>
        st_cast("LINESTRING") |>
        st_cast("POLYGON")

      id = isolate(d$id[1])

      r = rast(pid)

      x = extract(r, vect(ds))

      avcol = sapply(x, median, 2)[-1]
      avcol = glue_collapse(avcol, sep = ",")
      avcol = glue("rgb({avcol})")



      o = data.frame(
        average_col = avcol, 
        file        = basename(input$pid), 
        polygon_id  = id, 
        polygon     = st_as_text(ds)|>substr(1, 20)|>paste("...") ,
        N_pixels    = st_area(ds) 

      )

 
      if(exists("anout", .GlobalEnv))
        anout <<- rbind(anout, o) else
        anout <<- o

}


ui <- fluidPage(
  title = "Image annotation pipeline",
  
  theme = bs_theme(
    version = 5, 
    base_font = font_collection(font_google("Fira Code", local = FALSE), "Roboto", "sans-serif"),
    bootswatch = "darkly"),
  
  useKeys(),
 
  keysInput("keys", c("left", "right")),

    tags$h6(
      HTML('Draw one or several polygons on the image using the mouse or a stylus pen. <br>
          Use the <kbd>Next photo</kbd> buton or the left and right arrow keys to navigate. <br>
          <a href="https://github.com/valcu/annotator" class="link-primary" target="_blank">
          Github source code.</a>

          ')
    ),


  sidebarLayout(
    sidebarPanel(width = 3,

    selectInput("pid", "photo", choices = ims),
    actionButton("next_photo", "Next photo", class = "btn-primary m-2"), 

    h3("Settings"), 
    hr(), 

    sliderInput("brushWidth", "Brush width:", 1, 10, 2),
    colourInput("brushCol", "Brush color:", "#e45705"),
    colourInput("polyCol", "Polygon color:", "#7a7978", allowTransparent = TRUE)


    ),
    mainPanel(width = 9,

    fluidRow(
      annotatorOutput(outputId = "annotation")
    ), 
    fluidRow(
      DT::DTOutput(outputId = "results")
    )


    )
  )

)


server <- function(input, output, session) {

  onStop(function() {
    if(exists("anout", .GlobalEnv))
      rm("anout", envir = .GlobalEnv)
  })
  
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
    annotate(
      input$pid,
      resultId = "res_id", 
      brushWidth = input$brushWidth, 
      brushColor = input$brushCol,
      fill = input$polyCol
      )
  })

  output$results <- DT::renderDT({
    
    assign("input", input |> reactiveValuesToList(), .GlobalEnv)

    annotation_output()
    x = get("anout", .GlobalEnv)
    req(input$res_id)

    datatable(x,
      rownames = FALSE,
      style = "bootstrap5",
      class = "compact", 
      options = list(ordering = FALSE, paging = FALSE, searching = FALSE)
    ) |>
    formatStyle(
      "average_col",
      backgroundColor = styleEqual(
        x$average_col, x$average_col
      )
    ) |>
    formatRound(columns = c("N_pixels"), digits = 1)

 }) |>
    bindEvent(input$res_id)


}

shinyApp(ui = ui, server = server)