import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import "./ContactForm.css";

// Same Google Apps Script endpoint as the previous site — POSTs FormData
// rows into a Google Sheet.
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyul6dxrmunL8d4q_iSnh4hR8Gln9QBqKYN8jsGJ5v3c6xPe7IMUdxdx95G0Ny7TErADQ/exec";

type Status = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("pending");
    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form glass" onSubmit={handleSubmit}>
      <label className="contact-form__field">
        <span>Name</span>
        <input type="text" name="Name" placeholder="Your name" required />
      </label>
      <label className="contact-form__field">
        <span>Email</span>
        <input type="email" name="Email" placeholder="you@example.com" required />
      </label>
      <label className="contact-form__field">
        <span>Message</span>
        <textarea name="Message" rows={5} placeholder="What would you like to say?" />
      </label>
      <Button type="submit" disabled={status === "pending"}>
        {status === "pending" ? "Sending…" : "Send message"}
      </Button>
      <p className="contact-form__status" role="status" aria-live="polite">
        {status === "success" && "Message sent successfully — thank you!"}
        {status === "error" &&
          "Something went wrong sending your message. Please email me directly instead."}
      </p>
    </form>
  );
}
