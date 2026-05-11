import { Phone } from "lucide-react";
import { useState } from "react";
import Container from "../components/layout/Container";
import PageTitle from "../components/layout/PageTitle";
import Grid from "../components/layout/Grid";
import Box from "../components/ui/Box";
import Text from "../components/ui/Text";
import Heading from "../components/ui/Heading";
import Section from "../components/ui/Section";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from "../styles/theme";
import emailjs from "@emailjs/browser";
import { useToast } from "../Context/ToastContext";

const contacts = [
  { name: "Leo Arguello", phone: "627 465 7700" },
  { name: "Yael Rincones", phone: "614 473 9262" },
  { name: "Roberto Martinez", phone: "614 110 0185" },
  { name: "Franco Castillo", phone: "614 405 9497" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { showToast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_ezq2k3g", // de EmailJS dashboard
        "template_20xxsip", // de EmailJS dashboard
        { name, email, message },
        "yh2fe1X07tVSe9zwe", // de EmailJS dashboard
      );
      showToast("Mensaje enviado correctamente", "success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      showToast("Error al enviar. Intenta de nuevo.", "error");
    }
  };

  return (
    <Container maxWidth="1000px">
      <PageTitle>Contacto</PageTitle>

      <Section style={styles.section}>
        <Heading level={2} style={styles.subtitle}>
          Sobre Nosotros
        </Heading>
        <Text style={styles.text}>
          SazonWeb es tu plataforma de recetas con medidas estandarizadas.
          Nuestro objetivo es eliminar la confusión de medidas mixtas y
          garantizar que tus recetas siempre salgan perfectas.
        </Text>
        <Text style={styles.text}>
          Todas nuestras recetas utilizan el sistema métrico decimal para mayor
          precisión y consistencia en tus preparaciones.
        </Text>
      </Section>

      <Section style={styles.section}>
        <Heading level={2} style={styles.subtitle}>
          Contacta con nuestro equipo
        </Heading>
        <Grid
          columns="contacts"
          gap={spacing.lg}
          style={{ marginTop: spacing.lg }}
        >
          {contacts.map((contact) => (
            <Box key={contact.phone} style={styles.card}>
              <Text as="strong" style={styles.name}>
                {contact.name}
              </Text>
              <Box style={styles.link}>
                <Phone size={18} />
                {contact.phone}
              </Box>
            </Box>
          ))}
        </Grid>
      </Section>

      <Section style={styles.section}>
        <Heading level={2} style={{ ...styles.subtitle, textAlign: "center" }}>
          Envíanos un mensaje
        </Heading>
        <Box as="form" onSubmit={handleSubmit} style={styles.form}>
          <Input
            label="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Box style={styles.field}>
            <Text as="label" style={styles.label}>
              Mensaje
            </Text>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              style={styles.textarea}
              required
              rows={6}
            />
          </Box>
          <Button type="submit" variant="primary" size="lg">
            Enviar Mensaje
          </Button>
        </Box>
      </Section>
    </Container>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    fontSize: fontSize.xxl,
    marginBottom: spacing.md,
    fontWeight: fontWeight.semibold,
    color: colors.primaryDark,
  },
  text: {
    fontSize: fontSize.lg,
    lineHeight: 1.7,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  card: {
    padding: spacing.lg,
    background: colors.backgroundGradient,
    borderRadius: borderRadius.lg,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    border: `1px solid ${colors.border}`,
  },
  name: {
    fontSize: fontSize.lg,
    color: colors.primaryDark,
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    color: colors.primary,
    textDecoration: "none",
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
    maxWidth: "600px",
    marginTop: spacing.lg,
    marginLeft: "auto",
    marginRight: "auto",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
  },
  label: {
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
    color: colors.primaryDark,
  },
  textarea: {
    padding: "0.75rem",
    border: `2px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.base,
    fontFamily: "inherit",
    transition: "border-color 0.3s",
    resize: "vertical",
  },
};
