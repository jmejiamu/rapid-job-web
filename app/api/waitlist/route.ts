import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Send confirmation email to the user
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "Rapid Jobs <no-reply@rapidjobsapp.com>",
      to: email,
      subject: "You're on the Rapid Job waitlist 🚀",
      html: `
            <div style="background:#f6f9fc;padding:32px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6ebf1;">
                
                <div style="padding:22px 24px;background:#0b1220;">
                  <div style="font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#c7d2fe;">
                    Rapid Jobs
                  </div>
                  <div style="margin-top:6px;font-size:22px;line-height:1.2;color:#ffffff;font-weight:700;">
                    You're on the waitlist 🚀
                  </div>
                </div>

                <div style="padding:24px;">
                  <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#111827;">
                    Thanks for joining <strong>Rapid Jobs</strong>!
                  </p>

                  <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#374151;">
                    We’ve added <strong>${email}</strong> to the waitlist.  
                    We’ll email you as soon as the apps launch and you can start picking up quick jobs.
                  </p>

                  <div style="margin:18px 0 22px;padding:14px 16px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;">
                    <div style="font-size:13px;color:#6b7280;margin-bottom:6px;">Signed up with</div>
                    <div style="font-size:14px;color:#111827;font-weight:600;">${email}</div>
                  </div>

                  <a href="https://rapidjobsapp.com"
                    style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 16px;border-radius:10px;">
                    Visit Rapid Jobs
                  </a>

                  <p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">
                    If you didn’t sign up for this waitlist, you can ignore this email.
                  </p>
                </div>

                <div style="padding:16px 24px;border-top:1px solid #eef2f7;background:#ffffff;">
                  <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">
                    — Rapid Jobs Team<br/>
                    <span style="color:#9ca3af;">This is an automated message.</span>
                  </p>
                </div>
              </div>
            </div>`,
    });

    // Notify owner / team if OWNER_EMAIL is set
    if (process.env.OWNER_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || process.env.OWNER_EMAIL,
        to: process.env.OWNER_EMAIL,
        subject: `New waitlist signup: ${email}`,
        html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f6f9fc;padding:24px;">
              <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e6ebf1;border-radius:12px;padding:18px;">
                <h2 style="margin:0 0 10px;font-size:18px;color:#111827;">New waitlist signup 🎉</h2>
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                  <strong>${email}</strong> just joined the Rapid Jobs waitlist.
                </p>
                <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">
                  Sent from your waitlist endpoint.
                </p>
              </div>
            </div>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Waitlist error:", message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
