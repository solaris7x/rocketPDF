import { Icon } from "@iconify/react"
import { lazy, Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { mergePDFData } from "../functions/mergePDF"
import { dragItemType } from "./MergePage/DropList"

// Lazy Loading
const DropList = lazy(() => import("./MergePage/DropList"))
// const mergePDF = lazy(() => import("../functions/mergePDF"))

const MergePage = () => {
  const { register, handleSubmit, watch } = useForm<mergePDFData>()
  // Input field "files" attributes
  const filesInputHandler = register("files", { required: true })

  // Response from mergePDF function
  const [mergedFileURL, setMergedFileURL] = useState<string | undefined>()
  const [mergeError, setMergeError] = useState<string | undefined>()

  // Watch uploaded files stateful
  const [inputFiles, setInputFiles] = useState<dragItemType[]>([])

  useEffect(() => {
    setMergeError(undefined)
    const watchFiles = [...watch("files")].map((file, index) => ({
      id: `${file.name}-${index}`,
      file: file,
    }))
    setInputFiles(watchFiles)
  }, [watch("files")])

  useEffect(() => {
    // console.log("MergeURL reset")
    setMergedFileURL(undefined)
  }, [inputFiles])

  return (
    <main className="min-h-[100vh] px-6">
      {/* Page Header */}
      <div className="min-h-[40vh] py-8 text-center flex flex-col justify-center items-center">
        <div className="flex items-center justify-center gap-2">
          <Icon icon="carbon:direction-merge-filled" className="text-4xl" />
          <h2 className="text-2xl font-semibold">Merge PDF</h2>
        </div>
        <div className="">The easiest way to combine PDF Files</div>
      </div>
      {/* File Upload Box */}
      <form
        className="md:px-[20%]"
        onSubmit={handleSubmit(async (data, event) => {
          setMergedFileURL(undefined)
          // Lazy load mergePDF function
          const { default: mergePDF } = await import("../functions/mergePDF")
          mergePDF(
            inputFiles.map((files) => files.file),
            setMergedFileURL,
            setMergeError
          )
        })}
      >
        <label
          className="bg-amber-500 border-8 border-amber-400 w-full p-12 flex flex-col gap-4 items-center justify-center"
          htmlFor="files"
        >
          <Icon icon="codicon:files" className="text-4xl" />
          <div className="p-2 bg-white text-black rounded-lg font-semibold flex items-center justify-center gap-2">
            <Icon icon="ant-design:file-add-outlined" />
            <input
              className="hidden"
              type="file"
              id="files"
              accept="application/pdf"
              multiple
              required
              {...filesInputHandler}
              onChange={(event) => {
                setMergedFileURL(undefined)
                filesInputHandler.onChange(event)
              }}
            />
            Choose your files
          </div>
          <div className="text-sm">Valid files: *.pdf</div>
        </label>
        {/* Only view when files selected */}
        {inputFiles.length > 0 && (
          <>
            {/* Current Files */}
            <div className="w-full my-2 flex flex-col items-start justify-center ">
              <div className="self-center text-amber-500">Current Files:</div>
              <Suspense fallback={<div>Loading...</div>}>
                <DropList items={inputFiles} setInputFiles={setInputFiles} />
              </Suspense>
            </div>
            {/* Submit */}
            <div className="w-full my-4 flex justify-center">
              <button type="submit" className="p-2 bg-amber-500 rounded-lg">
                Submit
              </button>
            </div>
          </>
        )}
        {/* Merge Error */}
        {mergeError && (
          <div className="w-full my-4 flex justify-center">
            <div className="p-2 bg-red-500 rounded-lg">{`Error: Couldn't load PDF, file may be encrypted or not supported`}</div>
          </div>
        )}
      </form>
      {/* Download merged file */}
      {mergedFileURL && (
        <div className="my-4 flex gap-4 items-center justify-center">
          <div className="p-2 bg-amber-500 rounded-lg">
            <a
              href={mergedFileURL}
              download={`RocketPDF-${new Date().toISOString()}.pdf`}
            >
              Download Merged File
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
export default MergePage
