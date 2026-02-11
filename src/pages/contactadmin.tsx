import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ContactAdministrator() {
  const [fullName, setFullName] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");

  const [reason, setReason] = useState("");          // dropdown option
  const [otherMessage, setOtherMessage] = useState(""); // only when "Other"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalMessage = reason === "Other" ? otherMessage : reason;

    const { error } = await supabase.from("support_requests").insert([
      {
        full_name: fullName,
        registration_number: registration,
        email,
        message: finalMessage,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Something went wrong! " + error.message);
      return;
    }

    alert("Your request has been sent! The college admin will contact you.");
    setFullName("");
    setRegistration("");
    setEmail("");
    setReason("");
    setOtherMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Contact Administrator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* REGISTRATION NUMBER */}
          <div>
            <label className="text-sm font-medium">Registration Number</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* REASON SELECT */}
          <div>
            <label className="text-sm font-medium">Reason</label>
            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">-- Select an issue --</option>
              <option value="Forgot password">Forgot Password</option>
              <option value="Account not registered">Account Not Registered</option>
              <option value="Incorrect details">Incorrect Details</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* SHOW TEXTAREA ONLY IF OTHER */}
          {reason === "Other" && (
            <div>
              <label className="text-sm font-medium">Describe Your Issue</label>
              <textarea
                className="w-full border rounded-lg p-2 mt-1"
                rows={4}
                value={otherMessage}
                onChange={(e) => setOtherMessage(e.target.value)}
                required
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
