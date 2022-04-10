import { SubmitHandler } from "react-hook-form"
import { PDFDocument } from "pdf-lib"

export interface mergePDFData {
  files: File[]
}

const mergePDF = async (
  data: mergePDFData,
  setMergedFileURL: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  //   console.log({ data, event })

  const files = [...data.files]
  // Create new empty PDF document
  const mergedPdf = await PDFDocument.create()

  for (const fileBuf of files) {
    const file = await PDFDocument.load(await fileBuf.arrayBuffer())

    const copiedPages = await mergedPdf.copyPages(file, file.getPageIndices())
    // Add pages to pdf
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  // Save pdf
  const mergedPdfBuf = await mergedPdf.save()
  const mergedFileURL = URL.createObjectURL(
    new Blob([mergedPdfBuf], { type: "application/pdf" })
  )
  //   console.log(mergedFileURL)
  setMergedFileURL(mergedFileURL)
}

export default mergePDF
