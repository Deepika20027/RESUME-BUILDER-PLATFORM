"use client"

import { useCallback, useState } from "react"

export function usePdfDownload() {
  const [isGenerating, setIsGenerating] = useState(false)

  const downloadPdf = useCallback(async (element: HTMLElement, filename: string) => {
    setIsGenerating(true)
    
    try {
      const html2pdf = (await import("html2pdf.js")).default
      
      const opt = {
        margin: 0,
        filename: `${filename}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait" as const,
        },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
      throw error
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return { downloadPdf, isGenerating }
}
