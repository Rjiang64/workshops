// This file defines the LoginPage component, which provides a user interface for users to log in to the application.
// Controlled inputs — value={email} / onChange={(e) => setEmail(e.target.value)} means React state
// is the single source of truth for what's in the field, not the DOM itself.
// Every keystroke updates email, which re-renders the field showing exactly that value — this is what lets
// handleSubmit just read email/password directly from state rather than reaching into the DOM to
//  ask "what's actually typed in that box right now."

import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// The LoginPage component renders a login form that allows users to enter their email and password to log in.
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Handles the form submission for logging in, calling the login function from the authentication context and navigating to the home page on success.
  async function handleSubmit(e) {
    e.preventDefault(); //stops browser default which is full page reload on submit
    setError("");
    setBusy(true);
    try {
      await login(email, password); // calls login function from AuthContext which calls api.login and sets tokens in local storage
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setBusy(false);
    }
  }

  // The component returns a Box component from MUI that centers the login form on the page, containing a Card with input fields for email and password, a submit button, and a link to the registration page.
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ width: 380, p: 4 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}>
          SyncUp
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
            textAlign: "center",
            mb: 3,
          }}
        >
          The notice ledger, now on CloudFront
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography sx={{ fontSize: 13, color: "error.main", mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={busy}
            fullWidth
            sx={{ mb: 2 }}
          >
            {busy ? "Logging in..." : "Log in"}
          </Button>

          <Typography
            sx={{ fontSize: 13, color: "text.secondary", textAlign: "center" }}
          >
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
