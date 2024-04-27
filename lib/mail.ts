import {Resend} from "resend";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorEmail = async (
    email: string, 
    token: string
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA code",
        html: `<p>Here your 2FA code: ${token}</p>`
    });
}

export const sendEmailPayment = async (
    email: string,
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Payment",
        html: '<p>Berikut link pembayaran wallet address : <span style="color: blue; text-decoration: underline; cursor: pointer;">0x8e2215764FA311c89bF97c64f91A117B663fFF22</span></p><p>Dengan chain: BEP20 Address</p><div><p>persyaratan:</p><ul><li>Pastikan punya rekening</li><li>Download Bitget</li><li>Isi semua persyaratan</li><li>Masuk ke menu utama, pilih add funds</li><li>Pilih P2P trading. Kami tidak menyarankan beli langsung dengan kartu debit atau kredit karena terkadang terjadi bug</li><li>Ikuti instruksi. Kamu akan disuruh mentransfer sejumlah uang kepada penjual, lalu kamu konfirmasi pembayaran tersebut. Sistem ini mirip seperti sistem rekber (JANGAN PERNAH LUPA KLIK CONFIRM SETELAH MEMBAYAR)</li><li>Selamat, USDT telah masuk ke dalam akun</li></div><div><p>Cara kirim USDT ke adress kami:</p><ul><li>Kembali ke menu utama, klik withdraw</li><li>Pilih USDT</li><li>Pilih on chain withdrawal</li><li>Masukan address yang kami berikan</li><li>Gunakan network BEP 20 / Binance Smart Chain (JANGAN GUNAKAN JARINGAN LAIN ATAU KAMU AKAN KEHILANGAN UANG)</li><li>Konfirmasi segalanya lalu kirim</li><li>Kirim bukti pembayaran dengan me-reply email kami(<span style="color: blue; text-decoration: underline; cursor: pointer;">link</span>)</li></ul></div>'
    });
}

export const sendPasswordResetEmail = async (
    email: string, 
    token: string
    ) => {
    const confirmLink = `${domain}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
}

export const sendVerificationEmail = async (
    email: string, 
    token: string
    ) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};