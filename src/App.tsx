import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Citizens from './pages/Citizens'
import CitizenCard from './pages/CitizenCard'
import CitizenNew from './pages/CitizenNew'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/citizens" element={<Citizens />} />
          <Route path="/citizens/new" element={<CitizenNew />} />
          <Route path="/citizens/:id" element={<CitizenCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
