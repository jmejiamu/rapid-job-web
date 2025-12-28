import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Rapid Jobs <no-reply@emails.rapidjobs.app>",
      to: email,
      subject: "You're on the Rapid Job waitlist 🚀",
      html: `
        <div>
          <h1>Thanks for joining Rapid Job!</h1>
          <p>We’ve added <strong>${email}</strong> to our waiting list and will notify you when the apps launch.</p>
          <p>— Rapid Job Team</p>
        </div>
      `,
    });

    // Notify owner / team if OWNER_EMAIL is set
    if (process.env.OWNER_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "jmejiamu@gmail.com",
        to: process.env.OWNER_EMAIL,
        subject: `New waitlist signup: ${email}`,
        html: `<p>${email} joined the waitlist</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Waitlist error:", message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
