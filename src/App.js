import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Search from './components/Search/Search'
import Results from './components/Results/Results'

function App() {
  const [data, setDate] = useState(null)
  return (
    <div className="App">
      <Layout>
        {data ? (
          <Results goBack={() => setDate(null)} data={data} />
        ) : (
          <Search onDataLoad={(data) => setDate(data)} />
        )}
      </Layout>
    </div>
  )
}

export default App
