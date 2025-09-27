// // import Navbar from "~/Components/Navbar";
// // import {type FormEvent, useState,  } from "react";
// // import FileUploader from "~/Components/FileUploader";
// // import { usePuterStore } from "~/lib/puter";
// // import { useNavigate } from "react-router";
// // import { convertPdfToImage } from "~/lib/pdf2img"; 
// // import { generateUUID } from "~/lib/utils";
// // import { prepareInstructions } from "~/Constants";


// // const Upload = () => {
// //     const {auth,isLoading,fs,ai,kv}=usePuterStore();
// //     const navigate=useNavigate();
// //     const [isProcessing ,setIsProcessing]=useState(false);
// //     const [statusText,setStatusText]=useState('');
// //     const [file,setFile]=useState<File | null>(null);

// //     const handleFileSelect=(file:File |null)=>{
// //         setFile(file)
// //     }

// //     const handleAnalyze=async({companyName,jobTitle,jobDescription,file}:{companyName:string,jobTitle:string,jobDescription:string,file:File})=>{
// //         setIsProcessing(true);
// //         setStatusText('uploading the file...')

// //         const uploadedFile=await fs.upload([file]);
// //         if(!uploadedFile) return setStatusText('Error: failed to upload file');

// //         setStatusText('Converting to image...');
// //         const imageFile=await convertPdfToImage(file);
// //         if(!imageFile.file) return setStatusText('error:failed to convert pdf to image');

// //         setStatusText('uploading the image...');
// //         const uploadedImage = await fs.upload([imageFile.file]);
// //         if(!uploadedImage) return setStatusText('error:failed to upload image');
        
// //         setStatusText('Preparing data..');

// //         const uuid=generateUUID();
// //         const data={
// //             id:uuid,
// //             resumePath:uploadedFile.path,
// //             imagePath:uploadedImage.path,
// //             companyName,jobTitle,jobDescription,
// //             feedback:'',
// //         }
// //         await kv.set(`resume:${uuid}`,JSON.stringify(data));

// //         setStatusText('Analyzing...');

// //         const feedback=await ai.feedback(
// //             uploadedFile.path,
// //             prepareInstructions({jobTitle,jobDescription})
// //         )
// //         if(!feedback) return setStatusText('Error:failed to analyze resume');

// //         const feedbackText=typeof feedback.message.content==='string'
// //         ?feedback.message.content
// //         :feedback.message.content[0].text;

// //         data.feedback=JSON.parse(feedbackText)
// //         await kv.set(`resume:${uuid}`, JSON.stringify(data));
// //         setStatusText('Analysis complete ,redirecting');
// //         console.log(data);

// //         navigate(`/resume/${uuid}`)
// //     }

// //     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     const form=e.currentTarget.closest('form');
// //     if (!form) return;
// //     const formData=new FormData(form);

// //     const companyName=formData.get('company-name') as string;
// //     const jobTitle=formData.get('job-title') as string;
// //     const jobDescription=formData.get('job-description') as string;
    
// //     // console.log({
// //     //     companyName,jobTitle,jobDescription,file
// //     // })
// //      if (!file) return;

// //      handleAnalyze({companyName,jobTitle,jobDescription,file});
// //     };

    

// //   return (
// //     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
// //             <Navbar/>

// //               <section className="main-section ">
// //                 <div className="page-heading py-16">
// //                     <h1>smart feedback for your job</h1>
// //                     {isProcessing ?(
// //                         <>
// //                         <h2>{statusText}</h2>
// //                         <img src="/images/resume-scan.gif" className="w-full"/>

// //                         </>
// //                     ):(
// //                         <h2>Drop your resume for an ATS score and improvement tips</h2>

// //                     )}
// //                     {!isProcessing &&(
// //                         <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
// //                             <div className="form-div">
// //                                 <label htmlFor="company-name ">Company Name</label>
// //                                 <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
// //                             </div>
// //                               <div className="form-div">
// //                                 <label htmlFor="job-title ">Job Title</label>
// //                                 <input type="text" name="job-title" placeholder=" Job Title"  id="job-title"/>
// //                             </div>
// //                             <div className="form-div">
// //                                 <label htmlFor="job-description ">Job  Description</label>
// //                                 <textarea rows={5} name="job-description" placeholder=" Job Description"  id="job-description"/>
// //                             </div>
// //                             <div className="form-div">
// //                                 <label htmlFor="uploader">Upload Resume </label>
// //                                <FileUploader onFileSelect={handleFileSelect}/>
// //                             </div>
// //                             <button className="primary-button " type="submit">
// //                                 Analyze Resume

// //                             </button>
// //                         </form>
// //                     )}
// //                 </div>
// //       </section>
// //   </main>
// //   )
// // }

// // export default Upload
// import Navbar from "~/Components/Navbar";
// import { type FormEvent, useState } from "react";
// import FileUploader from "~/Components/FileUploader";
// import { usePuterStore } from "~/lib/puter";
// import { useNavigate } from "react-router";
// import { convertPdfToImage } from "~/lib/pdf2img";
// import { generateUUID } from "~/lib/utils";
// import { prepareInstructions } from "~/Constants";

// const Upload = () => {
//   const { fs, ai, kv } = usePuterStore();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusText, setStatusText] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileSelect = (file: File | null) => {
//     setFile(file);
//   };

//   const handleAnalyze = async ({
//     companyName,
//     jobTitle,
//     jobDescription,
//     file,
//   }: {
//     companyName: string;
//     jobTitle: string;
//     jobDescription: string;
//     file: File;
//   }) => {
//     try {
//       setIsProcessing(true);
//       setStatusText("Uploading the file...");

//       const uploadedFile = await fs.upload([file]);
//       if (!uploadedFile) {
//         setStatusText("❌ Error: failed to upload file");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("Converting to image...");
//       const imageFile = await convertPdfToImage(file);
//       if (!imageFile.file) {
//         setStatusText("❌ Error: failed to convert PDF to image");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("Uploading the image...");
//       const uploadedImage = await fs.upload([imageFile.file]);
//       if (!uploadedImage) {
//         setStatusText("❌ Error: failed to upload image");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("Preparing data...");
//       const uuid = generateUUID();
//       const data: any = {
//         id: uuid,
//         resumePath: uploadedFile.path,
//         imagePath: uploadedImage.path,
//         companyName,
//         jobTitle,
//         jobDescription,
//         feedback: "",
//       };
//       await kv.set(`resume:${uuid}`, JSON.stringify(data));

//       setStatusText("Analyzing your resume...");

//       const feedback = await ai.feedback(
//         uploadedFile.path,
//         prepareInstructions({ jobTitle, jobDescription })
//       );
//       if (!feedback) {
//         setStatusText("❌ Error: failed to analyze resume");
//         setIsProcessing(false);
//         return;
//       }

//       let feedbackText =
//         typeof feedback.message.content === "string"
//           ? feedback.message.content
//           : feedback.message.content[0]?.text || "";

//       // ✅ Try parsing JSON, fallback to plain text
//       try {
//         data.feedback = JSON.parse(feedbackText);
//       } catch {
//         data.feedback = feedbackText;
//       }

//       await kv.set(`resume:${uuid}`, JSON.stringify(data));

//       setStatusText("✅ Analysis complete, redirecting...");
//       navigate(`/resume/${uuid}`);
//     } catch (err) {
//       console.error(err);
//       setStatusText("❌ Unexpected error occurred");
//       setIsProcessing(false);
//     }
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const companyName = formData.get("company-name") as string;
//     const jobTitle = formData.get("job-title") as string;
//     const jobDescription = formData.get("job-description") as string;

//     if (!file) {
//       setStatusText("❌ Please upload a resume first");
//       return;
//     }
//     if (!companyName || !jobTitle || !jobDescription) {
//       setStatusText("❌ Please fill in all fields");
//       return;
//     }

//     handleAnalyze({ companyName, jobTitle, jobDescription, file });
//   };

//   return (
//     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//       <Navbar />

//       <section className="main-section">
//         <div className="page-heading py-16">
//           <h1>Smart feedback for your job</h1>

//           {isProcessing ? (
//             <>
//               <h2>{statusText}</h2>
//               <img src="/images/resume-scan.gif" className="w-full" />
//             </>
//           ) : (
//             <h2>Drop your resume for an ATS score and improvement tips</h2>
//           )}

//           {!isProcessing && (
//             <form
//               id="upload-form"
//               onSubmit={handleSubmit}
//               className="flex flex-col gap-4 mt-8"
//             >
//               <div className="form-div">
//                 <label htmlFor="company-name">Company Name</label>
//                 <input
//                   type="text"
//                   name="company-name"
//                   placeholder="Company Name"
//                   id="company-name"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="job-title">Job Title</label>
//                 <input
//                   type="text"
//                   name="job-title"
//                   placeholder="Job Title"
//                   id="job-title"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="job-description">Job Description</label>
//                 <textarea
//                   rows={5}
//                   name="job-description"
//                   placeholder="Job Description"
//                   id="job-description"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="uploader">Upload Resume</label>
//                 <FileUploader onFileSelect={handleFileSelect} />
//               </div>
//               <button className="primary-button" type="submit">
//                 Analyze Resume
//               </button>
//             </form>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Upload;


// import Navbar from "~/Components/Navbar";
// import { type FormEvent, useState } from "react";
// import FileUploader from "~/Components/FileUploader";
// import { usePuterStore } from "~/lib/puter";
// import { useNavigate } from "react-router";
// import { convertPdfToImage } from "~/lib/pdf2img";
// import { generateUUID } from "~/lib/utils";
// import { prepareInstructions } from "~/Constants";

// const Upload = () => {
//   const { fs, ai, kv } = usePuterStore();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusText, setStatusText] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileSelect = (file: File | null) => {
//     setFile(file);
//   };

//   const handleAnalyze = async ({
//     companyName,
//     jobTitle,
//     jobDescription,
//     file,
//   }: {
//     companyName: string;
//     jobTitle: string;
//     jobDescription: string;
//     file: File;
//   }) => {
//     try {
//       setIsProcessing(true);
//       setStatusText("📤 Uploading the file...");

//       const uploadedFile = await fs.upload([file]);
//       if (!uploadedFile) {
//         setStatusText("❌ Error: failed to upload file");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("📄 Converting to image...");
//       const imageFile = await convertPdfToImage(file);
//       if (!imageFile.file) {
//         setStatusText("❌ Error: failed to convert PDF to image");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("📤 Uploading the image...");
//       const uploadedImage = await fs.upload([imageFile.file]);
//       if (!uploadedImage) {
//         setStatusText("❌ Error: failed to upload image");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("⚙️ Preparing data...");
//       const uuid = generateUUID();
//       const data: any = {
//         id: uuid,
//         resumePath: uploadedFile.path,
//         imagePath: uploadedImage.path,
//         companyName,
//         jobTitle,
//         jobDescription,
//         feedback: "",
//       };
//       await kv.set(`resume:${uuid}`, JSON.stringify(data));

//       setStatusText("🤖 Analyzing your resume...");

//       // ✅ Ensure AI outputs structured JSON
//       const feedback = await ai.feedback(
//         uploadedFile.path,
//         prepareInstructions({ jobTitle, jobDescription }) +
//           "\n\nIMPORTANT: Respond ONLY with valid JSON in the following format:\n" +
//           `{
//             "tone": number, 
//             "content": number, 
//             "structure": number, 
//             "skills": number, 
//             "summary": string, 
//             "suggestions": [string]
//           }`
//       );

//       if (!feedback) {
//         setStatusText("❌ Error: failed to analyze resume");
//         setIsProcessing(false);
//         return;
//       }

//       let feedbackText =
//         typeof feedback.message.content === "string"
//           ? feedback.message.content
//           : feedback.message.content[0]?.text || "";

//       // ✅ Parse JSON safely
//       let parsedFeedback;
//       try {
//         parsedFeedback = JSON.parse(feedbackText);
//       } catch {
//         // fallback if AI still sends text
//         parsedFeedback = {
//           tone: 0,
//           content: 0,
//           structure: 0,
//           skills: 0,
//           summary: feedbackText || "No structured feedback returned.",
//           suggestions: [],
//         };
//       }

//       data.feedback = parsedFeedback;
//       await kv.set(`resume:${uuid}`, JSON.stringify(data));

//       setStatusText("✅ Analysis complete, redirecting...");
//       navigate(`/resume/${uuid}`);
//     } catch (err) {
//       console.error(err);
//       setStatusText("❌ Unexpected error occurred");
//       setIsProcessing(false);
//     }
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const companyName = formData.get("company-name") as string;
//     const jobTitle = formData.get("job-title") as string;
//     const jobDescription = formData.get("job-description") as string;

//     if (!file) {
//       setStatusText("❌ Please upload a resume first");
//       return;
//     }
//     if (!companyName || !jobTitle || !jobDescription) {
//       setStatusText("❌ Please fill in all fields");
//       return;
//     }

//     handleAnalyze({ companyName, jobTitle, jobDescription, file });
//   };

//   return (
//     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//       <Navbar />

//       <section className="main-section">
//         <div className="page-heading py-16">
//           <h1>Smart feedback for your job</h1>

//           {isProcessing ? (
//             <>
//               <h2>{statusText}</h2>
//               <img src="/images/resume-scan.gif" className="w-full" />
//             </>
//           ) : (
//             <h2>Drop your resume for an ATS score and improvement tips</h2>
//           )}

//           {!isProcessing && (
//             <form
//               id="upload-form"
//               onSubmit={handleSubmit}
//               className="flex flex-col gap-4 mt-8"
//             >
//               <div className="form-div">
//                 <label htmlFor="company-name">Company Name</label>
//                 <input
//                   type="text"
//                   name="company-name"
//                   placeholder="Company Name"
//                   id="company-name"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="job-title">Job Title</label>
//                 <input
//                   type="text"
//                   name="job-title"
//                   placeholder="Job Title"
//                   id="job-title"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="job-description">Job Description</label>
//                 <textarea
//                   rows={5}
//                   name="job-description"
//                   placeholder="Job Description"
//                   id="job-description"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="uploader">Upload Resume</label>
//                 <FileUploader onFileSelect={handleFileSelect} />
//               </div>
//               <button className="primary-button" type="submit">
//                 Analyze Resume
//               </button>
//             </form>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Upload;
// app/routes/Upload.tsx
// import Navbar from "~/Components/Navbar";
// import { type FormEvent, useState } from "react";
// import FileUploader from "~/Components/FileUploader";
// import { usePuterStore } from "~/lib/puter";
// import { useNavigate } from "react-router";
// import { convertPdfToImage } from "~/lib/pdf2img";

// const Upload = () => {
//   const { fs } = usePuterStore(); // we only use fs on client
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusText, setStatusText] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileSelect = (file: File | null) => {
//     setFile(file);
//   };

//   const handleAnalyze = async ({
//     companyName,
//     jobTitle,
//     jobDescription,
//     file,
//   }: {
//     companyName: string;
//     jobTitle: string;
//     jobDescription: string;
//     file: File;
//   }) => {
//     try {
//       setIsProcessing(true);
//       setStatusText("📤 Uploading the file...");

//       const uploadedFile = await fs.upload([file]);
//       if (!uploadedFile) {
//         setStatusText("❌ Error: failed to upload file");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("📄 Converting to image...");
//       const imageFile = await convertPdfToImage(file);
//       if (!imageFile?.file) {
//         setStatusText("❌ Error: failed to convert PDF to image");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("📤 Uploading the image...");
//       const uploadedImage = await fs.upload([imageFile.file]);
//       if (!uploadedImage) {
//         setStatusText("❌ Error: failed to upload image");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("⚙️ Sending files to server for analysis...");

//       // POST metadata to server endpoint that will:
//       // 1) call your AI,
//       // 2) normalize the response,
//       // 3) save the record to KV, and
//       // 4) return the uuid.
//       const resp = await fetch("/api/analyze-resume", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           resumePath: uploadedFile.path,
//           imagePath: uploadedImage.path,
//           companyName,
//           jobTitle,
//           jobDescription,
//         }),
//       });

//       if (!resp.ok) {
//         const errText = await resp.text().catch(() => resp.statusText);
//         setStatusText(`❌ Server error: ${errText}`);
//         setIsProcessing(false);
//         return;
//       }

//       const json = await resp.json();
//       if (!json?.uuid) {
//         setStatusText("❌ Error: server did not return resume id");
//         setIsProcessing(false);
//         return;
//       }

//       setStatusText("✅ Analysis complete — redirecting...");
//       navigate(`/resume/${json.uuid}`);
//     } catch (err) {
//       console.error(err);
//       setStatusText("❌ Unexpected error occurred");
//       setIsProcessing(false);
//     }
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const companyName = (formData.get("company-name") as string) || "";
//     const jobTitle = (formData.get("job-title") as string) || "";
//     const jobDescription = (formData.get("job-description") as string) || "";

//     if (!file) {
//       setStatusText("❌ Please upload a resume first");
//       return;
//     }
//     if (!companyName || !jobTitle || !jobDescription) {
//       setStatusText("❌ Please fill in all fields");
//       return;
//     }

//     handleAnalyze({ companyName, jobTitle, jobDescription, file });
//   };

//   return (
//     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//       <Navbar />

//       <section className="main-section">
//         <div className="page-heading py-16">
//           <h1>Smart feedback for your job</h1>

//           {isProcessing ? (
//             <>
//               <h2>{statusText}</h2>
//               <img src="/images/resume-scan.gif" className="w-full" />
//             </>
//           ) : (
//             <h2>Drop your resume for an ATS score and improvement tips</h2>
//           )}

//           {!isProcessing && (
//             <form
//               id="upload-form"
//               onSubmit={handleSubmit}
//               className="flex flex-col gap-4 mt-8"
//             >
//               <div className="form-div">
//                 <label htmlFor="company-name">Company Name</label>
//                 <input
//                   type="text"
//                   name="company-name"
//                   placeholder="Company Name"
//                   id="company-name"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="job-title">Job Title</label>
//                 <input
//                   type="text"
//                   name="job-title"
//                   placeholder="Job Title"
//                   id="job-title"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="job-description">Job Description</label>
//                 <textarea
//                   rows={5}
//                   name="job-description"
//                   placeholder="Job Description"
//                   id="job-description"
//                   required
//                 />
//               </div>
//               <div className="form-div">
//                 <label htmlFor="uploader">Upload Resume</label>
//                 <FileUploader onFileSelect={handleFileSelect} />
//               </div>
//               <button className="primary-button" type="submit">
//                 Analyze Resume
//               </button>
//             </form>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Upload;
import {type FormEvent, useState} from 'react'
import Navbar from "~/Components/Navbar";
import FileUploader from "~/Components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../Constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }



    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload