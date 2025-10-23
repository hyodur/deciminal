import { useState, useEffect } from 'react'
import './GameScreen.css'

function GameScreen({ level, onCorrect, onWrong, totalCorrect, totalWrong }) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operation, setOperation] = useState('+')
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [streak, setStreak] = useState(0)

  // 사운드 효과 함수
  const playSound = (isCorrect) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (isCorrect) {
      // 정답 사운드: 밝은 멜로디
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } else {
      // 오답 사운드: 낮은 소리
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  // 난이도에 따른 숫자 범위 설정
  const generateProblem = () => {
    const isAddition = Math.random() > 0.5
    setOperation(isAddition ? '+' : '-')
    
    let maxNum = 10
    let decimalPlaces = 1
    
    // 레벨에 따라 난이도 조정
    // 모든 레벨에서 소수 1자리 또는 2자리가 랜덤으로 나옴
    if (level <= 3) {
      maxNum = 10
      decimalPlaces = Math.random() > 0.5 ? 1 : 2
    } else if (level <= 6) {
      maxNum = 50
      decimalPlaces = Math.random() > 0.5 ? 1 : 2
    } else if (level <= 10) {
      maxNum = 100
      decimalPlaces = Math.random() > 0.5 ? 1 : 2
    } else {
      maxNum = 200
      decimalPlaces = Math.random() > 0.5 ? 1 : 2
    }
    
    const n1 = parseFloat((Math.random() * maxNum).toFixed(decimalPlaces))
    const n2 = parseFloat((Math.random() * maxNum).toFixed(decimalPlaces))
    
    // 뺄셈의 경우 음수가 나오지 않도록 조정
    if (!isAddition && n1 < n2) {
      setNum1(n2)
      setNum2(n1)
    } else {
      setNum1(n1)
      setNum2(n2)
    }
    
    setUserAnswer('')
    setFeedback(null)
  }

  useEffect(() => {
    generateProblem()
  }, [level])

  const calculateAnswer = () => {
    if (operation === '+') {
      return (num1 + num2).toFixed(2)
    } else {
      return (num1 - num2).toFixed(2)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (userAnswer === '') return
    
    const correctAnswer = parseFloat(calculateAnswer())
    const userAnswerNum = parseFloat(userAnswer)
    
    if (Math.abs(correctAnswer - userAnswerNum) < 0.01) {
      // 정답!
      playSound(true) // 정답 사운드 재생
      const basePoints = 10
      const levelBonus = level * 2
      const streakBonus = streak * 5
      const totalPoints = basePoints + levelBonus + streakBonus
      
      setFeedback({ type: 'correct', points: totalPoints })
      setStreak(streak + 1)
      onCorrect(totalPoints)
      
      setTimeout(() => {
        generateProblem()
      }, 1500)
    } else {
      // 오답!
      playSound(false) // 오답 사운드 재생
      setFeedback({ 
        type: 'wrong', 
        correctAnswer: correctAnswer.toFixed(2) 
      })
      setStreak(0)
      onWrong()
      
      setTimeout(() => {
        setFeedback(null)
        setUserAnswer('')
      }, 2000)
    }
  }

  const accuracy = totalCorrect + totalWrong > 0 
    ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) 
    : 0

  return (
    <div className="game-screen">
      <div className="game-stats">
        <div className="stat-box">
          <div className="stat-number">{totalCorrect}</div>
          <div className="stat-text">정답</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{totalWrong}</div>
          <div className="stat-text">오답</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{accuracy}%</div>
          <div className="stat-text">정확도</div>
        </div>
        <div className="stat-box streak">
          <div className="stat-number">🔥 {streak}</div>
          <div className="stat-text">연속 정답</div>
        </div>
      </div>

      <div className="problem-card">
        <div className="problem-title">레벨 {level} 문제</div>
        
        <div className="vertical-problem">
          <div className="vertical-math">
            <div className="math-row number-row">
              <span className="operator-space"></span>
              <span className="number-display">{num1.toFixed(2)}</span>
            </div>
            <div className="math-row number-row">
              <span className="operator-display">{operation}</span>
              <span className="number-display">{num2.toFixed(2)}</span>
            </div>
            <div className="math-row line-row">
              <div className="horizontal-line"></div>
            </div>
            <div className="math-row answer-row">
              <form onSubmit={handleSubmit} className="answer-form">
                <input
                  type="number"
                  step="0.01"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="?"
                  disabled={feedback !== null}
                  autoFocus
                  className="vertical-input"
                />
              </form>
            </div>
          </div>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.type === 'correct' ? (
              <>
                <div className="feedback-icon">🎉</div>
                <div className="feedback-text">정답입니다!</div>
                <div className="feedback-points">+{feedback.points} 점</div>
              </>
            ) : (
              <>
                <div className="feedback-icon">😅</div>
                <div className="feedback-text">틀렸어요!</div>
                <div className="feedback-answer">정답: {feedback.correctAnswer}</div>
              </>
            )}
          </div>
        )}

        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={feedback !== null || userAnswer === ''}
        >
          제출하기
        </button>
      </div>

      <div className="tips">
        <h3>💡 힌트</h3>
        <p>소수점 아래 숫자를 정확히 계산하세요!</p>
        <p>연속으로 맞히면 보너스 점수를 받을 수 있어요!</p>
      </div>
    </div>
  )
}

export default GameScreen
