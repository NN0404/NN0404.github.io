export const initPDFViewer = (pdfPath, pdfjsLib) => {
  $("#pdfViewerDiv").html("<p>Loading PDF...</p>");

  pdfjsLib.getDocument(pdfPath).promise.then(pdfDoc => {
    $("#pdfViewerDiv").html(""); // clear “Loading” text
    const numPages = pdfDoc.numPages;

    for (let i = 1; i <= numPages; i++) {
      pdfDoc.getPage(i).then(page => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        $("#pdfViewerDiv").append(canvas);

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    }
  }).catch(err => {
    console.error("PDF load error:", err);
    $("#pdfViewerDiv").html(`<p style="color:red;">Failed to load PDF.</p>`);
  });
};
