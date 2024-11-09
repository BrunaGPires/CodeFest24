const nodemailer = require ("nodemailer");
const fs = require("fs");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: "saofest@gmail.com",
        pass: "12345678"
    }
})

transporter.sendMail({
    from: 'saofest@gmail.com',
    to: usuario.email,
    subject: 'Conhecendo São Leopoldo',
    html: `<h1>Olá ${usuario.nome} <h1> <p>Bem-vindo a São Leopoldo.</p>`,
    text: `Olá, ${usuario.nome}! Bem-vindo a São Leopoldo.`,

})

fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
        console.log("Erro ao ler o arquivo:", err);
        return;
    }

    try {
        const usuarios = JSON.parse(data);

        Promise.all(usuarios.map((usuario) => enviarEmail(usuario)))
            .then(() => console.log('Todos os e-mails foram enviados com sucesso!'))
            .catch((err) => console.log('Erro ao enviar e-mails:', err));
    } catch (parseErr) {
        console.log("Erro ao parsear o JSON:", parseErr);
    }
});