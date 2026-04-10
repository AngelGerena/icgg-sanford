import { corsHeaders } from '../_shared/cors.ts'

interface PrayerRequestData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: PrayerRequestData = await req.json();

    if (!formData.fullName || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const prayerEmail = 'icggmedia@gmail.com';

    if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
      console.log('Prayer request submission (email not configured):', formData);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Prayer request submitted successfully (email configuration pending)'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
          Nueva Petición de Oración
        </h2>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <h3 style="color: #1e40af; margin-top: 0;">Información de Contacto</h3>
          <p><strong>Nombre:</strong> ${formData.fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          ${formData.phone ? `<p><strong>Teléfono:</strong> ${formData.phone}</p>` : ''}
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 2px solid #dbeafe; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Petición de Oración</h3>
          <p style="line-height: 1.8; white-space: pre-wrap; color: #374151;">${formData.message}</p>
        </div>

        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>Recordatorio:</strong> Esta petición es confidencial y debe ser tratada con respeto y privacidad.
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Este mensaje fue enviado desde el formulario de oración en www.icgg.us</p>
          <p style="margin-top: 10px;">
            <em>"Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús." - 1 Tesalonicenses 5:16-18</em>
          </p>
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
        from: 'ICGG Peticiones de Oración <onboarding@resend.dev>',
        to: [prayerEmail],
        reply_to: formData.email,
        subject: `Petición de Oración - ${formData.fullName}`,
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
        message: 'Prayer request submitted successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error processing prayer request:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process prayer request'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
