import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'

function Home() {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
  
    const buttonClick = () => {
        navigate(`/result/${count}`);
    }
  
    return (
      <>
        <div className="home-container">
            <h1>고양이 달리기</h1>
            <div className="card">
            <select className="cat-select" value={count} onChange={(e) => setCount(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <button className='blink-button' onClick={buttonClick}>
                선택
            </button>
            </div>
            <p className="read-the-docs">
            원하는 고양이 개수를 선택하세요.
            </p>
        </div>
      </>
    )
  }

  export default Home;