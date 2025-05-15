// import { baseURLProd } from "api/api";
// import { useEffect, useState } from "react";

// const EmailHook = () => {
//     const [emailGetdata, setEmailGetData] = useState([]);
//     const [documentGetdata, setDocumentGetData] = useState([]);

//      //-------------------fetch data------------
//      const fetchEmailData = async () => {
//         try {
//             let req = await fetch(`${baseURLProd}GetEmailDetails`, {
//                 method: "GET",
//                 'Content-Type': 'application/json',


//             })
//             const res = await req.json();
//             setEmailGetData(res.emailList);
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         fetchEmailData();
//     }, []);

//     const fetchDocumentData = async () => {
//         try {
//             let req = await fetch(`${baseURLProd}GetDocuments`, {
//                 method: "GET",
//                 'Content-Type': 'application/json',


//             })
//             const res = await req.json();
//             setDocumentGetData(res.uploadDocumentList);
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         fetchDocumentData();
//     }, []);

//   return {
//     emailGetdata,documentGetdata,fetchEmailData,fetchDocumentData
//   }
// }

// export default EmailHook
