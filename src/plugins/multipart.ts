import fp from "fastify-plugin";


// async function onFile(this: FastifyRequest, part: MultipartFile) {
//     const fileName = `${Date.now()}-${part.filename}`;
//     const savePath = `./uploads/${fileName}`;

//     // Jalankan streaming di sini
//     await pipeline(part.file, fs.createWriteStream(savePath));

//     // PENTING: Tambahkan properti custom ke 'part' agar bisa dibaca di controller
//     // Kita simpan path-nya saja karena stream-nya sudah habis di-pipe
//     (part as any).savedPath = `/uploads/${fileName}`;
// }

export default fp(async function (server) {
    server.register(import('@fastify/multipart'), { limits: { fileSize: 10 * 1024 * 1024 }, attachFieldsToBody: true })
})