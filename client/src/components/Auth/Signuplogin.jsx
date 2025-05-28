import supabase from "../client/supabaseclient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Signuplogin() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            // Override colors for a clean black & white look:
            variables: {
              default: {
                colors: {
                  brand: "#000",
                  accent: "#000",
                  error: "#FF0000",
                  background: "#fff",
                  text: "#000",
                },
              },
            },
            styles: {
              container: {
                padding: "1rem",
              },
            },
          }}
          theme="light"
          providers={['google']}
          socialLayout="vertical"
          redirectTo={`${window.location.origin}/buy`}
          magicLink={true}
          showLinks={true} 
        />
      </div>
    </div>
  );
}
