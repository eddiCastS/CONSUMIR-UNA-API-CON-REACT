import { useState, useEffect } from "react";

function App() {
  // Estado para guardar los datos, el loading y el error
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Se ejecuta una sola vez cuando se monta el componente
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
        setUsers(data);      // guardamos los datos en el estado
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsers();
  }, []);

  // Distintos estados de la UI
  if (cargando) {
    return <h2>Cargando datos...</h2>;
  }

  if (error) {
    return <h2>Ocurrió un error: {error}</h2>;
  }

  // Render de los datos
  return (
    <div style={{ padding: "20px" }}>
      <h1>Usuarios desde la API</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
