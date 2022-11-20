
[![CRAN_Status_Badge](https://www.r-pkg.org/badges/version/annotator?color=brightgreen)](https://cran.r-project.org/package=annotator)
[![R-CMD-check](https://github.com/valcu/annotator/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/valcu/annotator/actions/workflows/R-CMD-check.yaml)



# Image annotation using free drawing.

`annotator` is based on [fabric.js](http://fabricjs.com/), a Javascript HTML5 canvas library and [htmlwidgets](http://www.htmlwidgets.org/), a package that provides a framework for creating R bindings to JavaScript libraries.

The main function of the package is `annotate(path_to_image)`. Polygons can be outlined on the image and polygon's coordinates are returned after each draw. 

`annotator`  makes it easy to create annotation pipelines in  [shiny](https://shiny.rstudio.com).


Installation
------------

``` r
remotes::install_github("valcu/annotator")
```