import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])

  let dataExists = false;

  var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    genres
    season
    seasonYear
    source
    coverImage {
      large
    }
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
      <h1>Random Anime!</h1>
      <button onClick={() => fetchData()}>
        Randomize
      </button>
      {(typeof data.data !== 'undefined') ? (
        <div>
          <p> Name: {data.data.Media.title.romaji} </p>
          <p> Season: {data.data.Media.season} {data.data.Media.seasonYear}</p>
          <p> Source: {data.data.Media.source} </p>
          <p> id: {data.data.Media.id} </p>
        </div>
      ) : (
        <p>Click the Button</p>
      )}
    </>
  )
}

export default App
