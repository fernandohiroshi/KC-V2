import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  message,
}) => (
  <div
    style={{
      background: "#fff",
      color: "#000",
      padding: '32px',
      borderRadius: '12px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      maxWidth: '680px',
      margin: '0 auto',
      border: '1px solid #e5e7eb',
      boxSizing: 'border-box',
    }}
  >
    <h2 style={{ color: '#000', marginBottom: '8px', fontWeight: 700, fontSize: '22px', lineHeight: '1.2' }}>
      Novo contato recebido pelo site
    </h2>
    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5' }}>
      Você recebeu uma nova mensagem enviada pelo formulário do site. Confira os detalhes abaixo:
    </p>
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid #e5e7eb',
        margin: '16px 0',
      }}
    />
    <div style={{ marginBottom: '12px', fontSize: '15px' }}>
      <strong style={{ color: '#000' }}>Nome:</strong> {firstName} {lastName}
    </div>
    <div style={{ marginBottom: '12px', fontSize: '15px' }}>
      <strong style={{ color: '#000' }}>Email:</strong>{' '}
      <a
        href={`mailto:${email}`}
        style={{ color: '#000', textDecoration: 'underline' }}
      >
        {email}
      </a>
    </div>
    <div style={{ marginBottom: '12px', fontSize: '15px' }}>
      <strong style={{ color: '#000' }}>Mensagem:</strong>
      <div
        style={{
          background: '#f9fafb',
          color: '#000',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '4px',
          fontSize: '15px',
          whiteSpace: 'pre-line',
        }}
      >
        {message}
      </div>
    </div>
    <p style={{ color: '#555', fontSize: '13px', marginTop: '24px' }}>
      Para responder, basta clicar no email do cliente acima.
    </p>
    <p style={{ color: '#888', fontSize: '12px', marginTop: '16px' }}>
      Obrigado por confiar no Konbini Code!
    </p>
  </div>
);
