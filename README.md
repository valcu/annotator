
[![CRAN_Status_Badge](https://www.r-pkg.org/badges/version/annotator?color=brightgreen)](https://cran.r-project.org/package=annotator)
[![R-CMD-check](https://github.com/valcu/annotator/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/valcu/annotator/actions/workflows/R-CMD-check.yaml)



# Image annotation using free drawing.

`annotator` provides functions to create image annotations through polygon outlining. Annotator has the same function as `graphics::locator()` but achieves its purpose through drawing, rather than multiple mouse clicks. 

`annotator` is based on [fabric.js](https://fabricjs.com/), a Javascript HTML5 canvas library and [htmlwidgets](https://www.htmlwidgets.org/), a package that provides a framework for creating R bindings to JavaScript libraries.

The main function of the package is `annotate(path_to_image)`. Polygons can be outlined on the image and polygon's coordinates are returned after each draw. 

![annotate widget](annotator_widget.gif)


`annotator`  makes it easy to create annotation pipelines in  [shiny](https://shiny.posit.co/). A minimal Shiny app demonstrating a simple pipeline can be found on [shinyapps.io](https://mihaiv.shinyapps.io/annotator/). 

![annotate widget](annotator_shiny.gif)


Installation
------------

Stable version from CRAN:  
``` r
install.packages("annotator")
```
Developement version from GITHUB:  
``` r
remotes::install_github("valcu/annotator")
```
