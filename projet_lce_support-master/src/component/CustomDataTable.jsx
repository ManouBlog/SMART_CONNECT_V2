import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "./Button";
import { addUserWithFileExcel } from "../store/slices/utilisateurSlice";
import { useDispatch } from "react-redux";

export default function CustomDataTable({
  data,
  columns,
  rowKey = "id",
  actionsTemplate,
  paginator = false,
  rows = 10,
  isExportCSV = false,
  showSearch = false,
  onDeleteSelected, 
  selectionMode = "multiple", 
  isColunmSelected=false,
  isSelectedCompany = false,
  isBtnImportFileExcel=false
}) {
  const dispatch = useDispatch();
  const [showImportModal, setShowImportModal] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState(
    selectionMode === "single" ? null : []
  );

  const dt = useRef(null);

  const companies = [
  ...new Set(data?.map((item) => item.company?.name).filter(Boolean)),
];
const filteredData = data?.filter((item) => {
  if (!selectedCompany) return true;
  return item.company?.name === selectedCompany;
});

const exportCSV = () => {
 if (!filteredData || filteredData.length === 0) return;

  const separator = ";";

  // headers
  const headers = columns.map((col) => col.header || "");

  // rows
  const rows = filteredData.map((row) =>
    columns.map((col) => {
      let value = "";

      // priorité 1 : body
      if (col.body) {
        const bodyResult = col.body(row);

        // si c'est un élément React (JSX)
        if (bodyResult && bodyResult.props && bodyResult.props.children !== undefined) {
          value = bodyResult.props.children;
        } else {
          // sinon convertir en texte
          value = String(bodyResult);
        }
      }
      // priorité 2 : field
      else if (col.field && row[col.field] !== undefined) {
        value = row[col.field];
      }

      // nettoyer null/undefined
      if (value === null || value === undefined) value = "";

      // échappement pour CSV
      return `"${String(value).replace(/"/g, '""')}"`;
    })
  );

  // créer le CSV
  const csv =
    "\uFEFF" + // BOM UTF-8 pour Excel
    [headers.join(separator), ...rows.map((r) => r.join(separator))].join("\n");

  // télécharger
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "export.csv";
  link.click();
  link.remove();
};

  const handleDeleteSelected = () => {
    if (!selectedRows || selectedRows.length === 0) return;
    onDeleteSelected && onDeleteSelected(selectedRows);
  };

  const renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5em",
        }}
      >

        <div className="flex gap-2">
           {isBtnImportFileExcel && <Button 
          onClick={() => setShowImportModal(true)}
          label="Importer Excel"
          className="bg-orange-400 text-white"
        />}
        
          {isExportCSV && (
            <Button onClick={exportCSV} label="Exporter en Excel" />
          )}
          {isSelectedCompany && <select
  value={selectedCompany}
  onChange={(e) => setSelectedCompany(e.target.value)}
  className="border rounded-lg px-3 py-2"
>
  <option value="">Toutes les entreprises</option>
  {companies.map((company, index) => (
    <option key={index} value={company}>
      {company}
    </option>
  ))}
</select> }
          
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          )}

           {selectedRows &&
            selectionMode === "multiple" &&
            selectedRows.length > 0 && (
              isColunmSelected && (
                 <div className="flex gap-4 mx-4">
                         <Button
                onClick={handleDeleteSelected}
                label={`Approuvés`}
                className="bg-green-500 text-white"
                 />
                     <Button
                onClick={handleDeleteSelected}
                label={`Réjetés`}
                className="bg-red-500 text-white"
              />
              </div>  
              )
               
            )}
        </div>
      </div>
    );
  };
  const ImportExcelModal = () => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
   if (selectedFile) {
  const formData = new FormData();
  formData.append("file", selectedFile);

  dispatch(addUserWithFileExcel(formData));
  //console.log("Import du fichier:", selectedFile);
  setShowImportModal(false);
  setSelectedFile(null);
}
  };

  return (
    showImportModal && (
    <>
  {/* Backdrop */}
  <div 
    className="fixed"
    style={{background:"#0000005c",top:0,bottom:0,left:0,right:0,zIndex:99}}
    onClick={() => setShowImportModal(false)}
  />
  
  {/* Modal */}
  <div className="fixed inset-0 flex items-center justify-center z-9999 p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Importer fichier Excel</h3>
        <button
          onClick={() => setShowImportModal(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>
    <Button
  onClick={() => {
    const link = document.createElement('a');
    link.href = '/lcesupport.xlsx';  
    link.download = 'modele-import.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
  label="Télécharger le modèle Excel"
  className="bg-orange-500 text-white"
/>
    

      
      <div className="space-y-4 my-4">
      
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionnez un fichier Excel (.xlsx)
        </label>
        
        {/* Zone de drop + Input */}
        <div 
          className={`border-2 rounded-lg p-6 text-center transition-colors ${
            selectedFile 
              ? 'border-green-400 bg-green-50' 
              : 'border-dashed border-gray-300 hover:border-blue-400'
          }`}
        >
          <input
            type="file"
            accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
            className="hidden"
            id="excel-import"
          />
          
          {!selectedFile ? (
            // État initial : invite au clic
            <label 
              htmlFor="excel-import" 
              className="cursor-pointer flex flex-col items-center gap-2 p-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-medium text-sm">📁</span>
              </div>
              <p className="text-gray-700 font-medium">Cliquez pour choisir un fichier</p>
              {/* <p className="text-xs text-gray-500">ou glissez-déposez un fichier .xlsx</p> */}
            </label>
          ) : (
            // Fichier sélectionné : aperçu
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">📊</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round(selectedFile.size / 1024)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  document.getElementById('excel-import').value = '';
                }}
                className="text-gray-400 hover:text-gray-600 text-sm font-medium"
              >
                Changer
              </button>
            </div>
          )}
        </div>

        {/* Bouton importer (uniquement si fichier sélectionné) */}
        {selectedFile && (
          <Button
            onClick={handleImport}
            label="Importer"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          />
        )}
      </div>
    </div>
  </div>
</>

    )
  );
};


  const header = renderHeader();



  return (
    <div className="card">
      <ImportExcelModal />
      <DataTable
        ref={dt}
        value={filteredData}
        dataKey={rowKey}
        tableStyle={{ minWidth: "50rem" }}
        showGridlines
        stripedRows
        className="p-datatable-gridlines"
        paginator={paginator}
        rows={rows}
        globalFilter={globalFilter}
        header={header}
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        selectionMode={selectionMode}
      >
        {/* 👇 Colonne Checkbox */}
        {isColunmSelected &&  <Column
          selectionMode={selectionMode}
        /> }
       
        {columns.map((col) => (
          <Column
            key={col.field}
            style={{ width: "25%", textAlign: "center" }}
            field={col.field}
            header={col.header}
            body={col.body}
            sortable={col.sortable || false}
          />
        ))}

        {actionsTemplate && (
          <Column
            body={actionsTemplate}
            header="Actions"
            style={{ textAlign: "center", width: "25%" }}
          />
        )}
      </DataTable>
    </div>
  );
}

