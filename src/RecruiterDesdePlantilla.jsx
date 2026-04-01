import { useState } from "react";

const green = "#16714a";
const greenLight = "#effaf5";
const greenChip = "#e8f5e9";
const greenBorder = "#2e7d32";
const gray = "#7a7a7a";
const grayLight = "#d6d6d6";
const grayBg = "#f2f2f2";
const dark = "#292929";

const ms = { fontFamily: "'Montserrat',sans-serif" };

function Toggle({ on }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? green : grayLight, position: "relative", flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: on ? 18 : 2 }} />
    </div>
  );
}

function Box({ children, dashed, style: s }) {
  return (
    <div style={{ border: dashed ? `1px dashed ${greenBorder}` : `1px solid ${grayLight}`, borderRadius: 8, padding: "10px 14px", background: dashed ? greenChip : "#fff", ...ms, fontSize: 13, color: dashed ? green : dark, lineHeight: 1.7, ...s }}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <div style={{ ...ms, fontWeight: 500, fontSize: 12, color: gray, marginBottom: 6 }}>{children}</div>;
}

function Section({ title, sub, children }) {
  return (
    <div style={{ border: `1px solid ${grayLight}`, borderRadius: 12, padding: 20, marginBottom: 20, background: "#fff" }}>
      <div style={{ ...ms, fontWeight: 600, fontSize: 16, color: dark, marginBottom: sub ? 4 : 14 }}>{title}</div>
      {sub && <div style={{ ...ms, fontSize: 12, color: gray, marginBottom: 14 }}>{sub}</div>}
      {children}
    </div>
  );
}

/* ═══ Pantalla 1: Selector de plantilla ═══ */
function Selector({ onSelect }) {
  const templates = [
    { name: "Asesor Especialista", desc: "Asesor de clientes en tiendas Falabella. Incluye esquemas de disponibilidad.", vars: 4, busq: 23 },
    { name: "Cajero", desc: "Cajero para tiendas Falabella. Con esquemas de disponibilidad.", vars: 3, busq: 8 },
    { name: "Repositor", desc: "Repositor para centros de distribución.", vars: 3, busq: 5 },
    { name: "Picker", desc: "Preparador de pedidos para PedidosYa Market.", vars: 3, busq: 45 },
  ];

  return (
    <div>
      <div style={{ ...ms, fontSize: 24, fontWeight: 600, color: dark, marginBottom: 4 }}>Crear búsqueda desde template</div>
      <p style={{ ...ms, fontSize: 14, color: gray, marginBottom: 24 }}>Utiliza un template preconfigurado para crear una nueva búsqueda de manera rápida y eficiente</p>

      <div style={{ background: "#fff", border: `1px solid ${grayLight}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "12px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: `1px solid ${grayLight}`, ...ms, fontSize: 13, color: gray }}>
            🔍 Buscar templates...
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 90px 80px", gap: 8, padding: "10px 20px", background: greenLight, ...ms, fontSize: 11, fontWeight: 600, color: gray, textTransform: "uppercase" }}>
          <span>Nombre</span>
          <span>Descripción</span>
          <span style={{ textAlign: "center" }}>Variables</span>
          <span style={{ textAlign: "center" }}>Búsquedas</span>
          <span />
        </div>
        {templates.map((t, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 90px 80px", gap: 8, padding: "14px 20px", borderBottom: i < templates.length - 1 ? `1px solid ${grayBg}` : "none", alignItems: "center", cursor: "pointer" }}
            onClick={() => onSelect(t)}
            onMouseOver={e => e.currentTarget.style.background = grayBg}
            onMouseOut={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ ...ms, fontSize: 14, fontWeight: 500, color: dark }}>{t.name}</span>
            <span style={{ ...ms, fontSize: 13, color: gray }}>{t.desc}</span>
            <span style={{ ...ms, fontSize: 13, color: gray, textAlign: "center" }}>{t.vars}</span>
            <span style={{ ...ms, fontSize: 13, color: gray, textAlign: "center" }}>{t.busq} activas</span>
            <span style={{ ...ms, fontSize: 13, fontWeight: 600, color: green, cursor: "pointer", textAlign: "right" }}>Utilizar ›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ Pantalla 2: Formulario de variables ═══ */
function Formulario({ template, onBack }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <div style={{ ...ms, fontSize: 20, fontWeight: 600, color: green }}>{template.name}</div>
        <span style={{ ...ms, fontSize: 11, fontWeight: 600, color: green, background: greenLight, padding: "3px 10px", borderRadius: 50 }}>Plantilla madre</span>
      </div>
      <p style={{ ...ms, fontSize: 13, color: gray, marginBottom: 24 }}>{template.desc}</p>

      <Section title="Completá los datos de esta búsqueda" sub="Solo tenés que llenar los campos que varían. El resto ya está configurado en la plantilla.">

        <Label>Nombre de la búsqueda*</Label>
        <Box style={{ marginBottom: 16 }}>Asesor Especialista</Box>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <Label>Categoría* <span style={{ ...ms, fontSize: 11, color: gray, fontWeight: 400 }}>(texto libre)</span></Label>
            <Box style={{ color: gray }}>Ej: Electro, Vestuario deporte, Menaje...</Box>
            <div style={{ ...ms, fontSize: 11, color: gray, marginTop: 4 }}>Completa el criterio: "Experiencia en venta de ___"</div>
          </div>
          <div>
            <Label>Disponibilidad*</Label>
            <Box style={{ display: "flex", justifyContent: "space-between", color: gray }}>
              Seleccionar disponibilidad <span>▾</span>
            </Box>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <Label>Tienda / Ubicación*</Label>
            <Box style={{ display: "flex", justifyContent: "space-between", color: gray }}>
              Seleccionar tienda <span>▾</span>
            </Box>
          </div>
          <div>
            <Label>¿Cuántas vacantes?*</Label>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
              <div style={{ width: 32, height: 32, border: `1px solid ${grayLight}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", ...ms, fontSize: 16 }}>−</div>
              <span style={{ ...ms, fontWeight: 500, fontSize: 14, width: 32, textAlign: "center" }}>1</span>
              <div style={{ width: 32, height: 32, border: `1px solid ${grayLight}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", ...ms, fontSize: 16 }}>+</div>
            </div>
          </div>
        </div>

        <Label>Banda salarial</Label>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 10, alignItems: "center", marginBottom: 16 }}>
          <Box style={{ display: "flex", justifyContent: "space-between", color: gray, minWidth: 120 }}>
            ARS <span>▾</span>
          </Box>
          <Box style={{ color: gray }}>Desde</Box>
          <Box style={{ color: gray }}>Hasta</Box>
        </div>

        <Label>Configuración de entrevista</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 4 }}>
          <div>
            <div style={{ ...ms, fontSize: 11, color: gray, marginBottom: 4 }}>Tipo</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Grupal", "Individual"].map((o, i) => (
                <label key={i} style={{ display: "flex", alignItems: "center", gap: 4, ...ms, fontSize: 13 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${i === 0 ? green : grayLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i === 0 && <div style={{ width: 7, height: 7, borderRadius: "50%", background: green }} />}
                  </div>
                  {o}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...ms, fontSize: 11, color: gray, marginBottom: 4 }}>Modalidad</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Presencial", "Virtual"].map((o, i) => (
                <label key={i} style={{ display: "flex", alignItems: "center", gap: 4, ...ms, fontSize: 13 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${i === 0 ? green : grayLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i === 0 && <div style={{ width: 7, height: 7, borderRadius: "50%", background: green }} />}
                  </div>
                  {o}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...ms, fontSize: 11, color: gray, marginBottom: 4 }}>¿Quién coordina?</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Yo", "Otra persona"].map((o, i) => (
                <label key={i} style={{ display: "flex", alignItems: "center", gap: 4, ...ms, fontSize: 13 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${i === 0 ? green : grayLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i === 0 && <div style={{ width: 7, height: 7, borderRadius: "50%", background: green }} />}
                  </div>
                  {o}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div style={{ ...ms, fontSize: 11, color: gray, fontStyle: "italic", marginTop: 4 }}>Sugerido por la plantilla. Podés modificarlo.</div>
      </Section>

      {/* Datos adicionales */}
      <Section title="Datos adicionales sugeridos" sub="Configurados en la plantilla. Podés agregar más si necesitás.">
        {[
          { d: "DNI (foto frente y dorso)", m: "Antes de enviar al HM" },
          { d: "Certificado de antecedentes penales", m: "Antes de enviar al HM" },
        ].map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: grayBg, marginBottom: 6 }}>
            <span>📎</span>
            <span style={{ flex: 1, ...ms, fontSize: 13 }}>{d.d}</span>
            <span style={{ ...ms, fontSize: 11, color: gray, background: "#fff", padding: "2px 8px", borderRadius: 50, border: `1px solid ${grayLight}` }}>{d.m}</span>
            <Toggle on={true} />
          </div>
        ))}
        <div style={{ ...ms, fontSize: 13, fontWeight: 500, color: green, marginTop: 10, cursor: "pointer" }}>+ Agregar dato adicional</div>
      </Section>

      {/* Colapsable */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{ border: `1px solid ${grayLight}`, borderRadius: 12, padding: "14px 20px", marginBottom: 20, background: "#fff", cursor: "pointer" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>🔒</span>
            <span style={{ ...ms, fontSize: 14, fontWeight: 600, color: dark }}>Lo que ya viene configurado</span>
            <span style={{ ...ms, fontSize: 12, color: gray }}>7 criterios fijos · JD completa · Screening IA</span>
          </div>
          <span style={{ ...ms, fontSize: 16, color: gray }}>{expanded ? "▴" : "▾"}</span>
        </div>

        {expanded && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${grayBg}` }} onClick={e => e.stopPropagation()}>
            <div style={{ ...ms, fontSize: 12, fontWeight: 600, color: gray, textTransform: "uppercase", marginBottom: 8 }}>Criterios fijos</div>
            {[
              { t: "Experiencia en Atención a Público", p: "Excluyente" },
              { t: "Enseñanza Media Completa", p: "Excluyente" },
              { t: "Persona enérgica y proactiva", p: "Excluyente" },
              { t: "Habilidades de comunicación", p: "Excluyente" },
              { t: "Manejo de caja", p: "Deseable" },
              { t: "Mayor de 18 años", p: "Excluyente" },
              { t: "Residencia Definitiva o Temporaria", p: "Excluyente" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 6 ? `1px solid ${grayBg}` : "none" }}>
                <span style={{ ...ms, fontSize: 13, color: dark }}>🔒 {c.t}</span>
                <span style={{ ...ms, fontSize: 11, color: c.p === "Excluyente" ? green : gray }}>{c.p}</span>
              </div>
            ))}
            <div style={{ ...ms, fontSize: 12, fontWeight: 600, color: gray, textTransform: "uppercase", marginTop: 16, marginBottom: 8 }}>Screening IA</div>
            <div style={{ ...ms, fontSize: 13, color: gray }}>5 criterios por screening IA · 2 solo por CV · ~15 min</div>
            <div style={{ ...ms, fontSize: 12, fontWeight: 600, color: gray, textTransform: "uppercase", marginTop: 16, marginBottom: 8 }}>Condiciones fijas</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Relación de dependencia", "Indefinido", "Presencial"].map((c, i) => (
                <span key={i} style={{ ...ms, fontSize: 12, padding: "4px 10px", borderRadius: 50, background: grayBg, color: dark }}>{c}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ ...ms, fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: 50, border: `1px solid ${grayLight}`, background: "transparent", color: dark, cursor: "pointer" }}>← Volver</button>
        <button style={{ ...ms, fontSize: 14, fontWeight: 600, padding: "10px 28px", borderRadius: 50, border: "none", background: green, color: "#fff", cursor: "pointer" }}>Activar búsqueda</button>
      </div>
    </div>
  );
}

/* ═══ Main ═══ */
export default function App() {
  const [screen, setScreen] = useState("select");
  const [template, setTemplate] = useState(null);

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <div style={{ background: "#fff", borderBottom: `1px solid ${grayBg}`, padding: "10px 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <button onClick={() => { setScreen("select"); setTemplate(null); }} style={{ ...ms, fontSize: 13, fontWeight: 500, color: gray, background: "transparent", border: "none", cursor: "pointer" }}>
          ‹ Volver a Búsquedas
        </button>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 24px 60px" }}>
        {screen === "select" && <Selector onSelect={(t) => { setTemplate(t); setScreen("form"); }} />}
        {screen === "form" && template && <Formulario template={template} onBack={() => { setScreen("select"); setTemplate(null); }} />}
      </div>
    </div>
  );
}
