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

function Chip({ children }) {
  return (
    <span style={{ ...ms, display: "inline-flex", background: greenChip, border: `1px solid ${greenBorder}`, borderRadius: 6, padding: "2px 8px", fontSize: 13, fontWeight: 500, color: green, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

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

function Section({ title, sub, children }) {
  return (
    <div style={{ border: `1px solid ${grayLight}`, borderRadius: 12, padding: 20, marginBottom: 20, background: "#fff" }}>
      <div style={{ ...ms, fontWeight: 600, fontSize: 16, color: dark, marginBottom: sub ? 4 : 14 }}>{title}</div>
      {sub && <div style={{ ...ms, fontSize: 12, color: gray, marginBottom: 14 }}>{sub}</div>}
      {children}
    </div>
  );
}

function Label({ children }) {
  return <div style={{ ...ms, fontWeight: 500, fontSize: 12, color: gray, marginBottom: 6 }}>{children}</div>;
}

function Nav({ step }) {
  const steps = ["Cargar JD", "Confirmar JD", "Disponibilidad", "Criterios", "Screening IA", "Datos adic.", "Entrevista"];
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", background: grayBg, padding: 3, borderRadius: 50, marginBottom: 28 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", borderRadius: 30, background: i === step ? "#fff" : "transparent", border: i === step ? `1px solid ${gray}` : "1px solid transparent" }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: i < step ? green : grayBg, display: "flex", alignItems: "center", justifyContent: "center", ...ms, fontSize: 10, fontWeight: 500, color: i < step ? "#fff" : gray }}>
            {i < step ? "✓" : i + 1}
          </div>
          <span style={{ ...ms, fontSize: 10, fontWeight: 500, color: gray }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function Slider({ val }) {
  const pct = val === "excl" ? 100 : 20;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 150 }}>
      <div style={{ position: "relative", width: 80, height: 4, background: grayBg, borderRadius: 2 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: `${pct}%`, background: green, borderRadius: 2 }} />
        <div style={{ position: "absolute", top: -5, left: `calc(${pct}% - 7px)`, width: 14, height: 14, borderRadius: "50%", background: green, border: "2px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
      </div>
      <span style={{ ...ms, fontSize: 11, fontWeight: 500, color: val === "excl" ? green : gray }}>
        {val === "excl" ? "Excluyente" : "Deseable"}
      </span>
    </div>
  );
}

/* ═══ PASO 2 — Confirmar JD ═══ */
function Paso2() {
  const reqs = [
    { t: "Tener certificado de Enseñanza Media Completa", e: true, f: true },
    { t: "Experiencia previa en Atención a Público", e: true, f: true },
    { t: null, v: "Experiencia en venta de", c: "{categoría}", e: true, f: false },
    { t: "Residencia Definitiva, Temporaria o Certificado de Tramitación de Visa", e: true, f: true },
    { t: "Deseable experiencia previa en manejo de caja y ventas", e: false, f: true },
    { t: "Suma puntos si la postulación es cercana a la tienda", e: false, f: true },
    { t: "Mayor de 18 años", e: true, f: true },
  ];

  return (
    <>
      <div style={{ ...ms, fontWeight: 600, fontSize: 20, color: green, marginBottom: 4 }}>Confirmar Job Description</div>
      <p style={{ ...ms, fontSize: 13, color: gray, marginBottom: 24 }}>Revisá cada sección, ajustá lo necesario y completá lo que falte. Los chips verdes son variables que el recruiter completa después.</p>

      <Section title="Características">
        <Label>Nombre de la búsqueda*</Label>
        <Box style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          Asesor Especialista <Chip>{"{categoría}"}</Chip> <Chip>{"{disponibilidad}"}</Chip>
        </Box>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><Label>Rol*</Label><Box>Asesor Especialista</Box></div>
          <div><Label>Seniority</Label><Box style={{ display: "flex", justifyContent: "space-between" }}>Junior <span style={{ color: gray }}>▾</span></Box></div>
        </div>
        <Label>¿Cuántas vacantes?*</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, border: `1px solid ${grayLight}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", ...ms, fontSize: 16 }}>−</div>
          <span style={{ ...ms, fontWeight: 500, fontSize: 14, width: 30, textAlign: "center" }}>1</span>
          <div style={{ width: 30, height: 30, border: `1px solid ${grayLight}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", ...ms, fontSize: 16 }}>+</div>
        </div>
        <Label>Nivel de inglés</Label>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Básico", "Intermedio", "Avanzado", "Nativo", "No requerido"].map((o, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 4, ...ms, fontSize: 13 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${o === "No requerido" ? green : grayLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {o === "No requerido" && <div style={{ width: 7, height: 7, borderRadius: "50%", background: green }} />}
              </div>
              {o}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Condiciones de contratación">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><Label>Contratación*</Label><Box style={{ display: "flex", justifyContent: "space-between" }}>Relación de dependencia <span style={{ color: gray }}>▾</span></Box></div>
          <div><Label>Duración*</Label><Box style={{ display: "flex", justifyContent: "space-between" }}>Indefinido <span style={{ color: gray }}>▾</span></Box></div>
        </div>
        <Label>Disponibilidad</Label>
        <Box dashed style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <Chip>{"{disponibilidad}"}</Chip> Se configura en el paso 3
        </Box>
        <Label>Modalidad*</Label>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          {["Remoto", "Híbrido", "Presencial"].map((o, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 4, ...ms, fontSize: 13 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${o === "Presencial" ? green : grayLight}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {o === "Presencial" && <div style={{ width: 7, height: 7, borderRadius: "50%", background: green }} />}
              </div>
              {o}
            </label>
          ))}
        </div>
        <Label>Ubicación</Label>
        <Box dashed style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Chip>{"{tienda}"}</Chip> Variable por búsqueda — el recruiter elige la tienda
        </Box>
      </Section>

      <Section title="Banda salarial">
        <Box dashed>💰 Variable por búsqueda — El recruiter define moneda y rango salarial</Box>
      </Section>

      <Section title="Información de la búsqueda">
        <Label>Descripción</Label>
        <Box style={{ marginBottom: 12 }}>
          La tienda Falabella busca un/a Asesor/a Especialista en <Chip>{"{categoría}"}</Chip> para completar su equipo en <Chip>{"{tienda}"}</Chip>. La persona seleccionada tendrá la misión de ofrecer una experiencia de compra memorable, orientando y asesorando a los clientes a encontrar productos.
        </Box>
        <Label>Responsabilidades</Label>
        <Box style={{ marginBottom: 12 }}>
          • Ofrecer una experiencia de compra memorable al cliente<br />
          • Saludar y orientar a los clientes, identificando necesidades<br />
          • Ayudar a encontrar productos cuando sea solicitado<br />
          • Ordenar y reponer constantemente los productos del sector<br />
          • Vender productos con mayor rotación para evitar quiebres de stock<br />
          • Trabajar y controlar la solicitud a bodegas<br />
          • Asegurar la venta del área asignada
        </Box>
        <Label>Beneficios</Label>
        <Box>
          • Seguro Complementario de Salud<br />
          • Descuento con Tarjeta CMR Institucional<br />
          • Convenio con gimnasios<br />
          • Descuentos en centros educacionales<br />
          • Oportunidades de crecimiento
        </Box>
      </Section>

      <Section title="Requisitos de la posición">
        {reqs.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < reqs.length - 1 ? `1px solid ${grayBg}` : "none" }}>
            <span style={{ fontSize: 12, flexShrink: 0 }}>{r.f ? "🔒" : "✏️"}</span>
            <div style={{ flex: 1, ...ms, fontSize: 13 }}>
              {r.v ? <>{r.v} <Chip>{r.c}</Chip></> : r.t}
            </div>
            <span style={{ ...ms, fontSize: 11, color: gray, flexShrink: 0 }}>Excluyente</span>
            <Toggle on={r.e} />
          </div>
        ))}
        <div style={{ ...ms, fontSize: 13, fontWeight: 500, color: green, marginTop: 12, cursor: "pointer" }}>+ Agregar requisito</div>
      </Section>
    </>
  );
}

/* ═══ PASO 3 — Disponibilidad ═══ */
function Paso3() {
  const opciones = [
    "Full Time 44 hrs semanales 5x2 rotativo",
    "Part Time 20 hrs Sábado y Domingo",
    "Media Jornada Tarde 30 hrs 5x2",
    "Media Jornada Mañana 30 hrs 5x2",
  ];

  return (
    <>
      <div style={{ ...ms, fontWeight: 600, fontSize: 20, color: green, marginBottom: 4 }}>Opciones de disponibilidad</div>
      <p style={{ ...ms, fontSize: 13, color: gray, marginBottom: 24 }}>
        Escribí las opciones de disponibilidad que existen para este rol. Esto se convierte en un dropdown para el recruiter al crear una búsqueda.
      </p>

      <Section title="Esquemas configurados" sub={`${opciones.length} opciones — el recruiter elegirá una al crear la búsqueda`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {opciones.map((opt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 8, border: `1px solid ${grayLight}`, background: "#fff" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: greenLight, display: "flex", alignItems: "center", justifyContent: "center", ...ms, fontSize: 12, fontWeight: 600, color: green, flexShrink: 0 }}>
                {i + 1}
              </div>
              <span style={{ flex: 1, ...ms, fontSize: 14, color: dark }}>{opt}</span>
              <span style={{ color: grayLight, cursor: "pointer", fontSize: 16, padding: "0 4px" }}>✕</span>
            </div>
          ))}
        </div>

        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          width: "100%", padding: "11px 14px", borderRadius: 8,
          border: `1px dashed ${grayLight}`, background: "transparent",
          ...ms, fontSize: 14, fontWeight: 500, color: green,
          cursor: "pointer", marginTop: 8,
        }}>
          + Agregar opción
        </button>
      </Section>

      {/* Preview de cómo lo ve el recruiter */}
      <Section title="Preview" sub="Así va a ver el recruiter este campo al crear una búsqueda">
        <div style={{ padding: "10px 14px", borderRadius: 8, border: `1px solid ${grayLight}`, display: "flex", justifyContent: "space-between", alignItems: "center", ...ms, fontSize: 14, color: gray }}>
          <span>Seleccionar disponibilidad...</span>
          <span>▾</span>
        </div>
        <div style={{ border: `1px solid ${grayLight}`, borderRadius: 8, marginTop: 4, overflow: "hidden" }}>
          {opciones.map((opt, i) => (
            <div key={i} style={{
              padding: "10px 14px", ...ms, fontSize: 13, color: dark,
              background: i === 0 ? greenLight : "#fff",
              borderBottom: i < opciones.length - 1 ? `1px solid ${grayBg}` : "none",
              cursor: "pointer",
            }}>
              {i === 0 && <span style={{ marginRight: 6 }}>✓</span>}
              {opt}
            </div>
          ))}
        </div>
      </Section>

      <div style={{ background: grayBg, borderRadius: 8, padding: 12, ...ms, fontSize: 12, color: gray, marginBottom: 20, display: "flex", gap: 8 }}>
        <span>💡</span>
        <span>En el paso siguiente, la IA va a generar criterios de evaluación a partir de estas opciones. Ahí vas a poder revisar y ajustar los pesos.</span>
      </div>
    </>
  );
}

/* ═══ PASO 4 — Criterios ═══ */
function Paso4() {
  const rows = [
    { f: true, t: "Experiencia en Atención a Público", p: "excl" },
    { f: true, t: "Enseñanza Media Completa", p: "excl" },
    { f: true, t: "Persona enérgica y proactiva", p: "excl" },
    { f: true, t: "Habilidades de comunicación", p: "excl" },
    { f: true, t: "Manejo de caja", p: "des" },
    { f: true, t: "Mayor de 18 años", p: "excl" },
    { f: true, t: "Residencia Definitiva o Temporaria", p: "excl" },
    { f: false, t: "Experiencia en venta de", v: "{categoría}", p: "excl" },
    { f: false, t: "Disponibilidad para", v: "{disponibilidad}", p: "excl" },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <div style={{ ...ms, fontWeight: 600, fontSize: 20, color: green }}>Definir criterios para el match</div>
          <p style={{ ...ms, fontSize: 13, color: gray, marginTop: 4, maxWidth: 560 }}>
            Estos criterios automatizan la evaluación de candidatos. El nivel asignado determina la flexibilidad del sistema.
          </p>
        </div>
        <div style={{ ...ms, fontSize: 12, fontWeight: 500, color: gray, background: "#fff", padding: "6px 14px", borderRadius: 50, border: `1px solid ${grayLight}`, whiteSpace: "nowrap", flexShrink: 0 }}>
          {rows.length} criterios · {rows.filter(r => r.p === "excl").length} excl. · {rows.filter(r => r.p === "des").length} des.
        </div>
      </div>
      <div style={{ ...ms, fontSize: 12, color: gray, background: "#fff", border: `1px solid ${grayBg}`, padding: "6px 12px", borderRadius: 8, marginBottom: 20 }}>
        🔒 Fijo — aplica siempre &nbsp;|&nbsp; ✏️ Variable — el recruiter completa el valor
      </div>
      <div style={{ background: "#fff", border: `1px solid ${grayLight}`, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 160px 28px", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${grayBg}` }}>
          <span />
          <span style={{ ...ms, fontSize: 11, fontWeight: 600, color: gray, textTransform: "uppercase" }}>Criterio</span>
          <span style={{ ...ms, fontSize: 11, fontWeight: 600, color: gray, textTransform: "uppercase" }}>Peso</span>
          <span />
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr 160px 28px", gap: 8, alignItems: "center", padding: "10px 14px", borderBottom: i < rows.length - 1 ? `1px solid ${grayBg}` : "none" }}>
            <span style={{ fontSize: 12, textAlign: "center" }}>{r.f ? "🔒" : "✏️"}</span>
            <span style={{ ...ms, fontSize: 13 }}>{r.t}{r.v ? <> <Chip>{r.v}</Chip></> : null}</span>
            <Slider val={r.p} />
            <span style={{ color: grayLight, cursor: "pointer", fontSize: 14, textAlign: "center" }}>✕</span>
          </div>
        ))}
        <div style={{ padding: "10px 14px" }}>
          <span style={{ ...ms, fontSize: 13, fontWeight: 500, color: green, cursor: "pointer" }}>+ Agregar criterio</span>
        </div>
      </div>
    </>
  );
}

/* ═══ PASO 6 — Datos adicionales ═══ */
function Paso6() {
  const datos = [
    { d: "DNI (foto frente y dorso)", m: "Antes de enviar al HM" },
    { d: "Certificado de antecedentes penales", m: "Antes de enviar al HM" },
  ];
  const etapas = ["Después del screening IA", "Antes de enviar al HM", "Después de confirmación del HM"];

  return (
    <>
      <div style={{ ...ms, fontWeight: 600, fontSize: 20, color: green, marginBottom: 4 }}>Datos adicionales</div>
      <p style={{ ...ms, fontSize: 13, color: gray, marginBottom: 24 }}>Configurá qué información extra se le pide al candidato por WhatsApp 💬 en la etapa que elijas.</p>

      <Section title="Datos configurados">
        {datos.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: grayBg, marginBottom: 8 }}>
            <span>📎</span>
            <span style={{ flex: 1, ...ms, fontSize: 13, fontWeight: 500 }}>{d.d}</span>
            <span style={{ ...ms, fontSize: 11, color: gray, background: "#fff", padding: "3px 8px", borderRadius: 50, border: `1px solid ${grayLight}`, whiteSpace: "nowrap" }}>{d.m}</span>
            <span style={{ ...ms, fontSize: 11, color: gray }}>Obligatorio</span>
            <Toggle on={true} />
            <span style={{ color: grayLight, cursor: "pointer" }}>✕</span>
          </div>
        ))}

        <div style={{ border: `1px dashed ${grayLight}`, borderRadius: 8, padding: 14, marginTop: 12 }}>
          <div style={{ ...ms, fontSize: 13, fontWeight: 500, color: dark, marginBottom: 10 }}>+ Agregar dato adicional</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <Label>¿Qué dato necesitás?</Label>
              <Box style={{ color: gray }}>Ej: Certificado de salud, CUIL</Box>
            </div>
            <div>
              <Label>¿En qué momento?</Label>
              <Box style={{ display: "flex", justifyContent: "space-between", color: gray }}>Seleccionar etapa <span>▾</span></Box>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ ...ms, fontSize: 12, color: gray }}>¿Es obligatorio?</span>
              <Toggle on={true} />
            </div>
            <button style={{ ...ms, fontSize: 12, fontWeight: 600, color: green, border: `1px solid ${green}`, background: "transparent", borderRadius: 50, padding: "6px 16px", cursor: "pointer" }}>Agregar</button>
          </div>
        </div>
      </Section>

      <Section title="Etapas del funnel" sub="Referencia visual de las etapas donde se pueden solicitar datos">
        <div style={{ display: "flex" }}>
          {etapas.map((e, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 8px", borderRight: i < 2 ? `1px solid ${grayBg}` : "none" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: greenLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", ...ms, fontSize: 11, fontWeight: 600, color: green }}>{i + 1}</div>
              <div style={{ ...ms, fontSize: 11, fontWeight: 500 }}>{e}</div>
              {i === 1 && <div style={{ ...ms, fontSize: 10, color: green, marginTop: 4 }}>2 datos configurados</div>}
            </div>
          ))}
        </div>
      </Section>

      <div style={{ background: grayBg, borderRadius: 8, padding: 12, ...ms, fontSize: 12, color: gray, marginBottom: 20, display: "flex", gap: 8 }}>
        <span>💡</span>
        <span>Estos datos se pedirán en todas las búsquedas de esta plantilla. El recruiter los verá como sugeridos y podrá agregar más.</span>
      </div>
    </>
  );
}

/* ═══ MAIN ═══ */
export default function App() {
  const [s, setS] = useState(0);
  const pages = [
    { label: "Confirmar JD", step: 1, C: Paso2 },
    { label: "Disponibilidad", step: 2, C: Paso3 },
    { label: "Criterios", step: 3, C: Paso4 },
    { label: "Datos adic.", step: 5, C: Paso6 },
  ];
  const P = pages[s].C;

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: `1px solid ${grayBg}`, display: "flex", justifyContent: "center", padding: 6, gap: 3 }}>
        {pages.map((p, i) => (
          <button key={i} onClick={() => setS(i)} style={{ ...ms, fontSize: 11, fontWeight: i === s ? 600 : 400, padding: "5px 10px", borderRadius: 50, border: "none", cursor: "pointer", background: i === s ? green : "transparent", color: i === s ? "#fff" : gray }}>
            Paso {[2, 3, 4, 6][i]} · {p.label}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 24px 60px" }}>
        <Nav step={pages[s].step} />
        <P />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <button style={{ ...ms, fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: 50, border: `1px solid ${grayLight}`, background: "transparent", color: dark, cursor: "pointer" }}>
            {s === 0 ? "Guardar borrador" : "← Anterior"}
          </button>
          <button style={{ ...ms, fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: 50, border: "none", background: green, color: "#fff", cursor: "pointer" }}>
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
}
