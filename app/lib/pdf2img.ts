// export interface PdfConversionResult {
//   imageUrl: string;
//   file: File | null;
//   error?: string;
// }

// let pdfjsLib: any = null;
// let isLoading = false;
// let loadPromise: Promise<any> | null = null;

// async function loadPdfJs(): Promise<any> {
//   if (pdfjsLib) return pdfjsLib;
//   if (loadPromise) return loadPromise;

//   isLoading = true;
//   // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
//   loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
//     // Set the worker source to use local file
//     lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
//     pdfjsLib = lib;
//     isLoading = false;
//     return lib;
//   });

//   return loadPromise;
// }

// export async function convertPdfToImage(
//   file: File
// ): Promise<PdfConversionResult> {
//   try {
//     const lib = await loadPdfJs();

//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
//     const page = await pdf.getPage(1);

//     const viewport = page.getViewport({ scale: 4 });
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     canvas.width = viewport.width;
//     canvas.height = viewport.height;

//     if (context) {
//       context.imageSmoothingEnabled = true;
//       context.imageSmoothingQuality = "high";
//     }

//     await page.render({ canvasContext: context!, viewport }).promise;

//     return new Promise((resolve) => {
//       canvas.toBlob(
//         (blob) => {
//           if (blob) {
//             // Create a File from the blob with the same name as the pdf
//             const originalName = file.name.replace(/\.pdf$/i, "");
//             const imageFile = new File([blob], `${originalName}.png`, {
//               type: "image/png",
//             });

//             resolve({
//               imageUrl: URL.createObjectURL(blob),
//               file: imageFile,
//             });
//           } else {
//             resolve({
//               imageUrl: "",
//               file: null,
//               error: "Failed to create image blob",
//             });
//           }
//         },
//         "image/png",
//         1.0
//       ); // Set quality to maximum (1.0)
//     });
//   } catch (err) {
//     return {
//       imageUrl: "",
//       file: null,
//       error: `Failed to convert PDF: ${err}`,
//     };
//   }
// }
// src/lib/pdf2img.ts
export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";

// configure the worker once
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return { imageUrl: "", file: null, error: "Canvas 2D context not available" };
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
            return;
          }
          const baseName = file.name.replace(/\.pdf$/i, "");
          const imageFile = new File([blob], `${baseName}.png`, { type: "image/png" });

          resolve({
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
          });
        },
        "image/png",
        1.0
      );
    });
  } catch (err: any) {
    return { imageUrl: "", file: null, error: `Failed to convert PDF: ${err.message || err}` };
  }
}



