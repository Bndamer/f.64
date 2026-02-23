const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Contacto f.64" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Contacto pagina f.64",
      replyTo: email,
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.error("Error enviando mail:", error);
    res.status(500).json({ error: "Error enviando email" });
  }
});

module.exports = router;