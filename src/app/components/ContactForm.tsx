'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validação Zod
const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    subject: z.string().min(1, "Assunto é obrigatório"),
    message: z.string().min(1, "Mensagem é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                console.error('Erro ao enviar email:', result);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            setSuccess(false);
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-base font-medium text-[#07074D]">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div>
                <label className="block text-base font-medium text-[#07074D]">
                    Email Address
                </label>
                <input
                    type="email"
                    placeholder="example@domain.com"
                    {...register("email")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div>
                <label className="block text-base font-medium text-[#07074D]">
                    Subject
                </label>
                <input
                    type="text"
                    placeholder="Enter your subject"
                    {...register("subject")}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
            </div>

            <div>
                <label className="block text-base font-medium text-[#07074D]">
                    Message
                </label>
                <textarea
                    rows={4}
                    placeholder="Type your message"
                    {...register("message")}
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
                {errors.message && <span className="text-red-500">{errors.message.message}</span>}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
                {success && <p className="text-green-500">Email enviado com sucesso!</p>}
                {success === false && <p className="text-red-500">Erro ao enviar o email.</p>}
            </div>
        </form>
    );
};

export default ContactForm;
