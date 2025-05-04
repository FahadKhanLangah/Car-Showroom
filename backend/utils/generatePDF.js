import { PDFDocument } from 'pdfkit'
import fs from 'fs'

const generateInvoicePDF = (orderData, vehicleData, userData, outputPath) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(25).text('Car Purchase Invoice', { align: 'center' });

  doc.moveDown();
  doc.fontSize(14).text(`Customer: ${userData.name}`);
  doc.text(`Email: ${userData.email}`);
  doc.text(`Phone: ${userData.phone}`);

  doc.moveDown();
  doc.text(`Vehicle: ${vehicleData.make} ${vehicleData.model}`);
  doc.text(`Price: $${orderData.priceAtPurchase}`);
  doc.text(`Purchase Date: ${orderData.purchaseDate.toDateString()}`);

  doc.moveDown(2);
  doc.text('Thank you for buying with us!', { align: 'center' });

  doc.end();
};

module.exports = generateInvoicePDF;
