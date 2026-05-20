import { corsHeaders } from '../_shared/cors.ts'

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[char] || char));
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const contactEmail = Deno.env.get('CONTACT_EMAIL') || 'icggmedia@gmail.com';
    const safeName = escapeHtml(formData.name);
    const safeEmail = escapeHtml(formData.email);
    const safePhone = formData.phone ? escapeHtml(formData.phone) : '';
    const safeSubject = escapeHtml(formData.subject);
    const safeMessage = escapeHtml(formData.message);

    if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
      console.log('Contact form submission (email not configured):', formData);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Contact form submitted successfully (email configuration pending)'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          Nuevo mensaje desde ICGG.us
        </h2>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Información de Contacto</h3>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${safePhone ? `<p><strong>Teléfono:</strong> ${safePhone}</p>` : ''}
          <p><strong>Asunto:</strong> ${safeSubject}</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Mensaje</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Este mensaje fue enviado desde el formulario de contacto en www.icgg.us</p>
        </div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ICGG Contact Form <onboarding@resend.dev>',
        to: [contactEmail],
        reply_to: formData.email,
        subject: `Contacto desde ICGG.us: ${formData.subject.replace(/[\r\n]/g, ' ')}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      throw new Error('Failed to send email via Resend');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process contact form'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
