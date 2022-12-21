

test_that("annotate has the correct class", {

  class(annotate()) %in% c("annotator_fabric", "htmlwidget") |>
  all() |>
  expect_true()

})

test_that("annotate accepts an image", {
  im = system.file("sample_images", "aves", "1.jpg", package = "annotator")
  class(annotate(im)) %in% c("annotator_fabric", "htmlwidget") |>
  all() |>
  expect_true()

})

test_that("annotatorOutput returns a function", {
  expect_true(
    all(class(annotatorOutput("outputid")) %in% c("shiny.tag.list", "list"))
  )
})

test_that("renderAnnotate returns a function", {
  
  annotate() |>
  renderAnnotator() |>
  is.function() |>
  expect_true()
  
})
