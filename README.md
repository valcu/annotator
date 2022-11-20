
[![CRAN_Status_Badge](https://www.r-pkg.org/badges/version/annotator?color=brightgreen)](https://cran.r-project.org/package=annotator)

 <!-- badges: start -->
  [![R-CMD-check](https://github.com/valcu/annotator/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/valcu/annotator/actions/workflows/R-CMD-check.yaml)
  <!-- badges: end -->


# Image annotation using free drawing.

`annotator` is based on [fabric.js](http://fabricjs.com/), a Javascript HTML5 canvas library and [htmlwidgets](http://www.htmlwidgets.org/) a package that provides a framework for creating R bindings to JavaScript libraries.

`annotator`  makes it easy to create annotation pipelines in shiny. 

The main function of the package is `annotate(path_to_image)`. The user can paint, and subsequently save, one or several polygons on the image. 

The shiny examples in the  `./examples/` directory shows how to create annotation pipelines.


Installation
------------

``` r
remotes::install_github("valcu/annotator")
```