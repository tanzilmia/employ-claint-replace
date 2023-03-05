import moment from "moment";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const SingleuserInfo = () => {
  const [filtterArray, setfiltterArray] = useState([]);

  const [search, setsearch] = useState(false);
  const [totalCast, settotalCast] = useState(0);
  const [startdate, setstartdate] = useState(0);
  const userdatas = useLoaderData();
  const coppyUserData = [...userdatas];
  const date = moment().format("DD MM YY");

  //

  const handleFilter = (e) => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    setstartdate(startDate);
    const endDate = date;
    const filteredDate = coppyUserData.filter((obj) => {
      const dateParts = obj.date.split(" ");
      const objDate = new Date(
        `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
      );
      const startParts = startDate.split(" ");
      const start = new Date(
        `20${startParts[2]}-${startParts[1]}-${startParts[0]}`
      );
      const endParts = endDate.split(" ");
      const end = new Date(`20${endParts[2]}-${endParts[1]}-${endParts[0]}`);
      return objDate >= start && objDate <= end;
    });
    setsearch(true);
    setfiltterArray(filteredDate);
    const castSum = filteredDate.reduce((acc, obj) => acc + obj.costAmount, 0);
    settotalCast(castSum);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("table-to-pdf");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("table.pdf");
    });
  };



  console.log(filtterArray);
  return (
    <div>
     

      <div className="w-2/12 mx-auto mt-5">
        <form onSubmit={handleFilter}>
          <input
            type="text"
            name="startDate"
            placeholder="Filter Like 25 04 23"
          />
          <input type="submit" value="Filtter" />
        </form>
      </div>
      {search && (
        <div className="text-center">
          <h1 className="text-center text-2xl font-semibold">
            {" "}
            {` ${startdate} to ${date}`}{" "}
          </h1>
          <h1 className="text-center text-2xl font-semibold">
            {" "}
            {`Total Cast : ${totalCast} tk `}{" "}
          </h1>
          <button
            className="text-center text-2xl mt-5 bg-[#de8585] px-4  font-semibold"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
         
        </div>
      )}
      <div className="flex justify-center w-8/12 mx-auto">
        {userdatas.length && search === false ? (
          <table className="table-auto w-full my-5 text-center text-sm">
            <thead class="bg-gray-200">
              <tr className="sticky top-0 bg-gray-200">
                <th className="px-4 py-2">Serial</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">reason</th>
                <th className="px-4 py-2">costAmount</th>
              </tr>
            </thead>
            <tbody>
              {userdatas.map((data, index) => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2"> {index + 1} </td>
                  <td className="border px-4 py-2"> {data.date} </td>
                  <td className="border px-4 py-2"> {data.name} </td>
                  <td className="border px-4 py-2"> {data.reason} </td>
                  <td className="border px-4 py-2"> {data.costAmount} </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            {filtterArray.length && (
              <table
                id="table-to-pdf"
                className="table-auto w-full my-5 text-center text-sm"
              >
                <thead class="bg-gray-200">
                  <tr className="sticky top-0 bg-gray-200">
                    <th className="px-4 py-2">Serial</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">reason</th>
                    <th className="px-4 py-2">costAmount</th>
                    <th className="px-4 py-2">totalCast</th>
                  </tr>
                </thead>
                <tbody>
                  {filtterArray.map((data, index) => (
                    <tr key={data._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2"> {index + 1} </td>
                      <td className="border px-4 py-2"> {data.date} </td>
                      <td className="border px-4 py-2"> {data.name} </td>
                      <td className="border px-4 py-2"> {data.reason} </td>
                      <td className="border px-4 py-2"> {data.costAmount} </td>
                      <td className="border px-4 py-2"> {data.cast} </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="hover:bg-gray-100">
                    <td colSpan="4" className="border px-4 py-2"></td>
                    <th className="border px-4 py-2">total Cast :</th>
                    <td className="border px-4 py-2">{totalCast}</td>
                  </tr>
                </tfoot>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleuserInfo;