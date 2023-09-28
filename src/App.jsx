import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])

  var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;
  // Define our query variables and values that will be used in the query request
  var variables = {
    id: Math.floor(Math.random() * (1000 - 1) + 1)

  };

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };

  async function fetchData() {
    await fetch(url, options)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <h1>test</h1>
      <button onClick={() => fetchData()}>
        Fetch
      </button>
      {(typeof data.data !== 'undefined') ? (
        <div>
          <p> Name: {data.data.Media.title.romaji} </p>
          <p> id: {data.data.Media.id} </p>
        </div>
      ) : (
        <p>Click the Button</p>
      )}
    </>
  )
}

export default App
