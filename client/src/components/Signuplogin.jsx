import supabase from "../../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Signuplogin() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        padding: "1rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#0a0a0a",
          border: "1px solid #1a1a1a",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          animation: "fadeInUp 0.6s ease-out forwards",
          opacity: 0,
          transform: "translateY(10px)",
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "1.25rem",
            letterSpacing: "-0.5px",
          }}
        >
          Sign in
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#888",
            textAlign: "center",
            marginBottom: "1.75rem",
          }}
        >
          Use your account to continue
        </p>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0a0a0a", // Button background (black)
                  brandAccent: "#ffffff", // Border / hover accent
                  inputBackground: "#111111",
                  inputText: "#ffffff",
                  text: "#ffffff",
                  background: "#0a0a0a",
                  error: "#ff4d4d",
                },
              },
            },
            styles: {
              button: {
                backgroundColor: "#0a0a0a",
                color: "#ffffff",
                border: "1px solid #ffffff",
                borderRadius: "6px",
                padding: "12px",
                fontWeight: "600",
                transition: "all 0.3s ease-in-out",
              },
              button__hover: {
                backgroundColor: "#111111",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
              },
              input: {
                backgroundColor: "#111",
                borderColor: "#222",
                color: "#ffffff",
              },
              label: {
                color: "#cccccc",
              },
            },
          }}
          theme="dark"
          providers={["google", "github"]}
          socialLayout="horizontal"
          redirectTo={`${window.location.origin}/dashboard`}
          magicLink={true}
          showLinks={true}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .sbui-btn {
          transition: transform 0.2s ease;
        }
        .sbui-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
