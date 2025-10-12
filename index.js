export const initPDFViewer = () => {
  $("#pdfViewerDiv").html("");

  pdfjsLib.getDocument("/Electricity and Magnetism/EMTheory_Resnick.pdf").promise.then(pdfDoc => {
    let numPages = pdfDoc.numPages;

    for (let i = 1; i <= numPages; i++) {
      pdfDoc.getPage(i).then(page => {
        const pdfCanvas = document.createElement("canvas");
        const context = pdfCanvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.2 });

        pdfCanvas.width = viewport.width;
        pdfCanvas.height = viewport.height;

        $("#pdfViewerDiv").append(pdfCanvas);

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      }).catch(pageErr => {
        console.error("Error rendering page:", pageErr);
      });
    }
  }).catch(pdfErr => {
    console.error("Error loading PDF:", pdfErr);
  });
};
