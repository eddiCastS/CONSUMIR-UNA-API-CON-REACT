import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const respuesta = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!respuesta.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await respuesta.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
    };

    setUsers((prev) => [newUser, ...prev]);
    setNewName("");
    setNewEmail("");
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (cargando) {
    return (
      <div style={styles.page}>
        <h2 style={{ color: "#fff" }}>Cargando datos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <h2 style={{ color: "#ff6b6b" }}>Ocurrió un error: {error}</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Gestión de Usuarios</h1>

        {/* Barra de búsqueda */}
        <div style={styles.section}>
          <label style={styles.label}>Buscar usuarios</label>
          <input
            type="text"
            placeholder="Busca por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Formulario para agregar */}
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Agregar usuario</h2>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre completo"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                style={styles.input}
              />
            </div>
          </div>
          <button style={styles.primaryButton} onClick={handleAddUser}>
            Agregar usuario
          </button>
        </div>

        {/* Lista de usuarios */}
        <div style={styles.section}>
          <h2 style={styles.subtitle}>
            Usuarios ({filteredUsers.length})
          </h2>
          <ul style={styles.list}>
            {filteredUsers.map((user) => (
              <li key={user.id} style={styles.listItem}>
                <div>
                  <div style={styles.userName}>{user.name}</div>
                  <div style={styles.userEmail}>{user.email}</div>
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    padding: "40px 16px",
    background: "linear-gradient(135deg, #111, #333)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#1f1f1f",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 18px 50px rgba(0,0,0,0.4)",
    color: "#f5f5f5",
    border: "1px solid #333",
  },
  title: {
    margin: 0,
    marginBottom: "16px",
    fontSize: "28px",
    fontWeight: 700,
  },
  subtitle: {
    margin: 0,
    marginBottom: "8px",
    fontSize: "18px",
    fontWeight: 600,
  },
  section: {
    marginTop: "20px",
    marginBottom: "8px",
    borderTop: "1px solid #333",
    paddingTop: "16px",
  },
  label: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#bbbbbb",
    marginBottom: "4px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#111",
    color: "#f5f5f5",
    outline: "none",
    fontSize: "14px",
  },
  formRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  formGroup: {
    flex: 1,
    minWidth: "160px",
  },
  primaryButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #ffffff 0%, #b3b3b3 50%, #777777 100%)",
    color: "#000",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    maxHeight: "320px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "10px",
    backgroundColor: "#151515",
    border: "1px solid #333",
    marginBottom: "8px",
  },
  userName: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#f5f5f5",
  },
  userEmail: {
    fontSize: "13px",
    color: "#aaaaaa",
  },
  deleteButton: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid #555",
    backgroundColor: "#222",
    color: "#f5f5f5",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default App;
