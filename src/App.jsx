import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [found, setFound] = useState([])

  var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    isAdult
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
        setFound("True")
        if (result.data.Media == null) {
          setFound("False")
        } else if (result.data.Media.isAdult == true) {
          setFound("False")
        }
      }).catch(err => {
        console.log(err)
      })

  }


  return (
    <div className="container">
      <h1>Random Anime!</h1>
      <button id="button" onClick={() => fetchData()}>
        Randomize
      </button>
      {(typeof data.data !== 'undefined' && found !== "False") ? (
        <div className="info">
          <img src={data.data.Media.coverImage.large} alt="Cover Image for the anime" />
          <p> Name: {data.data.Media.title.romaji} </p>
          <p> Season: {data.data.Media.season} {data.data.Media.seasonYear}</p>
          <p> Source: {data.data.Media.source} </p>
          <p> id: {data.data.Media.id} </p>
          <a href={"https://anilist.co/anime/" + data.data.Media.id}>Link</a>
        </div>
      ) : (
        <p>Click the Button</p>
      )}
    </div>
  )
}

export default App
