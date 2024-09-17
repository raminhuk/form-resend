import { Html, Head, Preview, Body, Container, Heading, Text, Section } from "@react-email/components";

interface EmailTemplateProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, subject, message }) => {
    return (
        <Html>
            <Head />
            <Preview>Você recebeu uma nova mensagem de {name}</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>
                    <Heading style={styles.heading}>Nova Mensagem Recebida</Heading>

                    <Section style={styles.section}>
                        <Text style={styles.text}>
                            <strong>Nome:</strong> {name}
                        </Text>
                        <Text style={styles.text}>
                            <strong>E-mail:</strong> {email}
                        </Text>
                        <Text style={styles.text}>
                            <strong>Assunto:</strong> {subject}
                        </Text>
                        <Text style={styles.text}>
                            <strong>Mensagem:</strong> {message}
                        </Text>
                    </Section>

                    <Section style={styles.footer}>
                        <Text style={styles.footerText}>Obrigado por entrar em contato.</Text>
                        <Text style={styles.footerText}>Esta é uma mensagem automática, por favor, não responda.</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const styles = {
    body: {
        backgroundColor: '#f4f4f7',
        padding: '20px',
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold' as const,
        color: '#333333',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    text: {
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#51545E',
        marginBottom: '10px',
    },
    footer: {
        borderTop: '1px solid #e0e0e0',
        paddingTop: '10px',
        marginTop: '20px',
    },
    footerText: {
        fontSize: '12px',
        color: '#6B7280',
        textAlign: 'center' as const,
    },
};
