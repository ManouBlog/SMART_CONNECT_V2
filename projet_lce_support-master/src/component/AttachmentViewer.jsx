import React from "react"

const imageExt = ["jpg","jpeg","png","gif","webp"]
const pdfExt = ["pdf"]
const excelExt = ["xls","xlsx","csv"]

const getFileType = (url) => {
  const ext = url.split(".").pop().toLowerCase()
  if (imageExt.includes(ext)) return "image"
  if (pdfExt.includes(ext)) return "pdf"
  if (excelExt.includes(ext)) return "excel"
  return "other"
}

const AttachmentViewer = ({ attachments = [] }) => {
  const [previewFile, setPreviewFile] = React.useState(null)
  const [previewType, setPreviewType] = React.useState(null)

  const openPreview = (file) => {
    const type = getFileType(file)

    if (type === "other") {
      window.open(file, "_blank")
      return
    }

    setPreviewFile(file)
    setPreviewType(type)
  }

  const closePreview = () => {
    setPreviewFile(null)
    setPreviewType(null)
  }
    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePreview()
    }
  }

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-3 pt-2 border-t border-white/30">
        {attachments.slice(0,3).map((file,index)=>{
          const type = getFileType(file)

          return (
            <div
              key={index}
              onClick={()=>openPreview(file)}
              className="group relative w-20 h-20 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex items-center justify-center bg-slate-100"
            >

              {type === "image" && (
                <img
                  src={file}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              )}

              {type === "pdf" && (
                <div className="flex flex-col items-center text-red-500">
                  <span className="text-2xl">📄</span>
                  <span className="text-xs">PDF</span>
                </div>
              )}

              {type === "excel" && (
                <div className="flex flex-col items-center text-green-600">
                  <span className="text-2xl">📊</span>
                  <span className="text-xs">Excel</span>
                </div>
              )}

              {type === "other" && (
                <div className="flex flex-col items-center text-slate-600">
                  <span className="text-2xl">📎</span>
                  <span className="text-xs">File</span>
                </div>
              )}

            </div>
          )
        })}

        {attachments.length > 3 && (
          <div className="flex items-center justify-center px-3 py-2 bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl">
            +{attachments.length - 3}
          </div>
        )}
      </div>

      {previewFile && (
        <div 
         onClick={handleOverlayClick} 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden">

            <button
              onClick={closePreview}
              className="absolute top-3 right-3 z-10 bg-black cursor-pointer rounded-full px-3 py-1 shadow"
            >
              ✕
            </button>

            {previewType === "image" && (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={previewFile}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            {previewType === "pdf" && (
              <iframe
                src={previewFile}
                className="w-full h-full"
              />
            )}

            {previewType === "excel" && (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewFile)}`}
                className="w-full h-full"
              />
            )}

          </div>

        </div>
      )}
    </>
  )
}

export default AttachmentViewer