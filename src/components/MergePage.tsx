import { Icon } from "@iconify/react"

const MergePage = () => {
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
      <div className="md:px-[20%]">
        <div className="bg-amber-500 border-8 border-amber-400 w-full p-12 flex flex-col gap-4 items-center justify-center">
          <Icon icon="codicon:files" className="text-4xl" />
          <button className="p-2 bg-white text-black rounded-lg font-semibold flex items-center justify-center gap-2">
            <Icon icon="ant-design:file-add-outlined" />
            Choose your files
          </button>
          <div className="text-sm">Valid files: *.pdf</div>
        </div>
      </div>
    </main>
  )
}
export default MergePage
