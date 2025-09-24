import { useParams, useNavigate  } from 'react-router-dom';
import '../styles/result.css'
import { useState } from 'react';

function Result() {
    const { count } = useParams();
    const navigate = useNavigate();
    
    const [runtime, setRuntime] = useState([]); // 고양이 별 랜덤 달리기 시간
    const [results, setResults] = useState([]); // 순위 기록
    const [showWinner, setShowWinner] = useState(false); // 1등 고양이 알람
    const [lastRun, setLastRun] = useState([]); // 이전 값 저장 (예외처리)

    const startRun = () => {

        const randomRun = Array.from({ length: Number(count) }).map(
            () => Math.random() * 3 + 3
        );
        
        console.log("현재", JSON.stringify(randomRun));
        console.log("지금", JSON.stringify(lastRun));
        console.log("길이", JSON.stringify(lastRun).length)

        // 예외처리
        if (JSON.stringify(lastRun).length != 2){
            alert("새로고침 후 RUN 하세요.");
            return;
        }

        setRuntime(randomRun);
        setLastRun(randomRun);
        setResults([]);
        setShowWinner(false);

        // 순위 기록 저장
        randomRun.forEach((time, index) => {
            setTimeout(() => {
                setResults((prev) =>{
                    const newResults = [
                        ...prev,
                        { cat: index + 1, time: time.toFixed(2) },
                    ];
                    
                    // 1등 고양이 알람
                    if (newResults.length === Number(count)){
                        setShowWinner(true);
    
                        setTimeout(() => setShowWinner(false), 1500);
                    }
    
                    return newResults
                })
                
            }, time * 1000);
        });
    };

    // 새로고침 버튼
    const refresh = () => {
        // 예외처리
        if(results.length != 0){
            console.log("새로고침 클릭 됨");
            location.reload();
        }
    }

    const back = () => {
        navigate(-1);
    }

    return (
        <div>
            <div className='track-container'>
                <h2>선택한 고양이 수: {count}</h2>
                <button className='back-button' onClick={back}>BACK</button>
                <button className='run-button' onClick={startRun}>RUN</button>
                <button className='refresh-button' onClick={refresh}>⟳</button>
                <div className='track'>
                    {Array.from({ length: Number(count) }).map((_, index) => (
                        <div key={index} className='cat-container'>
                            <img
                                alt={`cat-${index}`}
                                src="/calico.png"
                                className={`cat ${runtime.length ? "run" : ""}`}
                                style={{
                                    animationDuration: runtime[index] + "s",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='results'>
                <h3>🏆 결과</h3>
                {results.length > 0 ? (
                    <div>
                        {results.map((r, i) => (
                            <div key={i}>
                                {i + 1}등 - 고양이 {r.cat} (⏱{r.time}s)
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>

            {showWinner && results.length > 0 && (
                <div className="winner-dialog">
                    <p className='flower'>💐</p>
                    {results[0].cat}번 고양이
                </div>
            )}
        </div>
    )
}

export default Result;