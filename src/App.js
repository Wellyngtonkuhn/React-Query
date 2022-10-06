import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const [id, setId] = useState(1);

  const { data, isLoading, isError } = useQuery(["user", id], async () => {
    const request = await fetch(`https://reqres.in/api/users/${id}?delay=1`);
    const response = await request.json();

    return response.data;
  });

  return (
    <section className="App">
      <div className="content">
        {isLoading && <p>Loading...</p>}
        {isError && (
          <p>
            Um error aconteceu, recarregue a página por favor ou tente mais
            tarde
          </p>
        )}
        {data && (
          <>
            <img src={data.avatar} alt={data.first_name} />
            <p>
              {data.first_name} {data.last_name}
            </p>
            <p>Email: {data.email}</p>
            <div>
              <button onClick={() => setId(id - 1)}>Prev</button>
              <button onClick={() => setId(id + 1)}>Next</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default App;
