
    initPDFViewer=()=>{
        $("pdfViewerDiv").html("")
        pdfjsLib.getDocument("/Electricity and Magnetism/EMTheory_Resnick.pdf").promise.then(pdfDoc=>{

            let pages = pdfDoc._pdfInfo.numPages
            for(let i=1;i<=pages;i++) {

                pdfDoc.getPage(i).then(page=>{

                    let pdfCanvas = document.createElement("canvas")
                    let context = pdfCanvas.getContext("2d")
                    let pageViewPort = page.getViewport({scale:1})

                    pdfCanvas.width = pageViewPort.width
                    pdfCanvas.height = pageViewPort.height
                    $("#pdfViewerDiv").append(pdfCanvas)
                    page.render({
                        canvasContext:context,
                        viewport:pageViewPort
                    })
                }).catch(pageErr=>{
                    console.log(pageErr)
                })
            }

        }).catch(pdfErr=>{
        console.log(pdfErr)
        })
    }



    $(function(){
        initPDFViewer()
    })