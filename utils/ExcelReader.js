const ExcelJS = require('exceljs');

async function readExcelData(filePath,sheetName) {
   const workbook = new ExcelJS.Workbook();
   await workbook.xlsx.readFile(filePath);
   const worksheet = workbook.getWorksheet(sheetName);

    const data = [];
    const headers = worksheet.getRow(1).values;

    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber === 1) {
            return;
        }

        const rowData = {};

        row.values.forEach((value, index) => {

            rowData[headers[index]] = value;

        });
        data.push(rowData);
    });
    return data;
}

module.exports = { readExcelData };