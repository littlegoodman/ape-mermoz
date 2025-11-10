import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Command } from "../../hooks/use-commands.hook";

/**
 * Sanitizes text to be compatible with WinAnsi encoding used by PDF standard fonts.
 * Replaces problematic Unicode characters (like narrow no-break space) with regular spaces,
 * while preserving French accents and other WinAnsi-supported characters.
 */
const sanitizeTextForPdf = (text: string): string => {
  return text
    .replace(/\u202F/g, " ") // Replace narrow no-break space (0x202F) with regular space
    .replace(/\u00A0/g, " ") // Replace non-breaking space with regular space
    .replace(/\u2009/g, " ") // Replace thin space with regular space
    .replace(/\u2006/g, " ") // Replace six-per-em space with regular space
    .replace(/\u2007/g, " ") // Replace figure space with regular space
    .replace(/\u2008/g, " ") // Replace punctuation space with regular space
    .replace(/[\u2000-\u200F]/g, " ") // Replace other Unicode spaces with regular space
    .replace(/\u2028/g, " ") // Replace line separator with regular space
    .replace(/\u2029/g, " "); // Replace paragraph separator with regular space
  // Note: WinAnsi encoding supports French accents (é, è, à, etc.), so we don't need to remove them
};

export const useExportCommandsToPdf = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (commands: Command[]) => {
    setIsExporting(true);

    try {
      // Filter out articles with 0 quantity
      const filteredCommands = commands
        .map((command) => ({
          ...command,
          articles: command.articles.filter(({ quantity }) => quantity > 0),
        }))
        .filter((command) => command.articles.length > 0);

      // Sort commands by class name, then student name, then parent
      const sortedCommands = [...filteredCommands].sort((a, b) => {
        // Sort by class name
        const classCompare = a.teacher.class.name.localeCompare(
          b.teacher.class.name
        );
        if (classCompare !== 0) return classCompare;

        // Sort by student last name
        const lastNameCompare = (a.student ?? a.teacher).lastName.localeCompare(
          b.student?.lastName ?? b.teacher.lastName
        );
        if (lastNameCompare !== 0) return lastNameCompare;

        // Sort by student first name
        if (a.student && b.student) {
          const firstNameCompare = a.student.firstName.localeCompare(
            b.student.firstName
          );
          if (firstNameCompare !== 0) return firstNameCompare;
        }

        // Sort by contact name
        return a.contact?.localeCompare(b.contact ?? "") ?? 0;
      });

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );
      const helveticaItalicFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaOblique
      );

      const pageWidth = 612; // US Letter width in points
      const pageHeight = 792; // US Letter height in points
      const margin = 50;
      const lineHeight = 18;
      const commandSpacing = 8;
      const commandMargin = 15;

      let currentY = pageHeight - margin;
      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = currentY;

      // Title
      y -= 30;
      currentPage.drawText(sanitizeTextForPdf("Commandes - Chocolats 2025"), {
        x: margin,
        y,
        size: 20,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      y -= 30;

      sortedCommands.forEach((command, index) => {
        const totalQuantity = command.articles.reduce(
          (sum, { quantity }) => sum + quantity,
          0
        );
        const studentFullName = command.student
          ? `${command.student.lastName.toUpperCase()} ${
              command.student.firstName
            }`
          : `${
              command.teacher.title
            } ${command.teacher.lastName.toUpperCase()}`;
        const headerSegments = [
          (command.student ?? command.teacher).class.name,
          command.teacher?.title
            ? `${command.teacher.title} ${command.teacher.lastName}`
            : "",
          studentFullName,
          totalQuantity > 1
            ? `${totalQuantity} articles`
            : `${totalQuantity} article`,
        ];
        const headerText = headerSegments
          .filter((segment) => segment.length > 0)
          .join(" • ");

        // Estimate height: 1 line for header + 1 info line + 1 per article
        const numLines = 2 + command.articles.length;
        const estimatedHeight =
          numLines * lineHeight + commandSpacing + commandMargin;
        if (y - estimatedHeight < margin) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

        // Draw separator line (except for first command)
        if (index > 0) {
          y -= commandSpacing;
          currentPage.drawLine({
            start: { x: margin, y },
            end: { x: pageWidth - margin, y },
            thickness: 1,
            color: rgb(0.8, 0.8, 0.8),
          });
          y -= commandMargin;
        }

        // Draw header line
        if (y - lineHeight < margin) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        currentPage.drawText(sanitizeTextForPdf(headerText), {
          x: margin,
          y,
          size: 12,
          font: helveticaBoldFont,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;

        // Draw second line: parent name + tel + email (smaller and italic)
        if (y - lineHeight < margin) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        const secondLineSegments = [
          command.contact,
          ...(command.phone ? [`Tel: ${command.phone}`] : []),
          ...(command.email ? [`Email: ${command.email}`] : []),
        ];
        const secondLineText = secondLineSegments.join(" • ");
        if (secondLineText) {
          currentPage.drawText(sanitizeTextForPdf(secondLineText), {
            x: margin,
            y,
            size: 10,
            font: helveticaItalicFont,
            color: rgb(0.2, 0.2, 0.2),
          });
          y -= lineHeight;
        }

        // Draw each article on a single line: name normal size, description smaller on same line
        command.articles.forEach(({ article, quantity }) => {
          if (y - lineHeight < margin) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }

          const articleMain = `    ${quantity} x ${article.name}`;
          // Temporary disabled description
          //const descriptionText = article.description
          //  ? ` — ${article.description}`
          //  : "";

          // Draw main part
          currentPage.drawText(sanitizeTextForPdf(articleMain), {
            x: margin,
            y,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });

          // Compute width of main part to position description
          //const mainWidth = helveticaFont.widthOfTextAtSize(articleMain, 10);

          // Draw description with smaller font on same line
          //currentPage.drawText(descriptionText, {
          //  x: margin + mainWidth + 4,
          //  y,
          //  size: 8,
          //  font: helveticaFont,
          //  color: rgb(0, 0, 0),
          //});

          y -= lineHeight;
        });
      });

      // Generate date text
      y -= 20;
      if (y < margin) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      const dateText = `Généré le ${new Date().toLocaleDateString(
        "fr-FR"
      )} à ${new Date().toLocaleTimeString("fr-FR")}`;
      currentPage.drawText(sanitizeTextForPdf(dateText), {
        x: margin,
        y,
        size: 8,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save();
      const arrayCopy = new Uint8Array(pdfBytes.byteLength);
      arrayCopy.set(pdfBytes);
      const blob = new Blob([arrayCopy], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `commandes-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Erreur lors de la génération du PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPdf, isExporting };
};
