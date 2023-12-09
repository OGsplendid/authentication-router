import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Intro } from './components/Intro/Intro'
import { News } from './components/News/News'
import { NewsItem } from './components/NewItem/NewsItem'
import { Header } from './components/Header/Header'
import { BadRequest } from './components/BadRequest/BadRequest'

function App() {

  return (
    <div className='common-container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Intro intro={'Neto Social. Facebook and VK killer'} />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:id' element={<NewsItem />} />
          <Route path='*' element={<BadRequest />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
