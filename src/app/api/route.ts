import { Resend } from 'resend';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { EmailTemplate } from '../components/TemplateEmail/EmailTemplate';

// Inicializando Resend com a chave API
const resend = new Resend(process.env.RESEND_API_KEY);

// Esquema de validação com Zod
const emailSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    subject: z.string().min(1, 'O assunto é obrigatório'),
    message: z.string().min(1, 'A mensagem é obrigatória'),
});

type EmailData = z.infer<typeof emailSchema>;

export async function POST(request: Request) {
    try {
        const body: EmailData = await request.json();
        const parsedData = emailSchema.parse(body);

        const { error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['fabioraminhuk@gmail.com'],
            subject: parsedData.subject,
            react: EmailTemplate({ name: parsedData.name, email: parsedData.email, subject: parsedData.subject, message: parsedData.message }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json({ message: 'E-mail enviado com sucesso!' });

    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        return NextResponse.json({ error: 'Erro ao enviar o e-mail' }, { status: 500 });
    }
}
