import { useState, useEffect } from 'react'
import './GameScreen.css'

function GameScreen({ level, onCorrect, onWrong, totalCorrect, totalWrong }) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operation, setOperation] = useState('+')
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [streak, setStreak] = useState(0)
  
  // 각 자릿수 입력 상태 (백의자리, 십의자리, 일의자리, 소수첫째, 소수둘째)
  const [digitHundreds, setDigitHundreds] = useState('') // 백의 자리
  const [digitTens, setDigitTens] = useState('') // 십의 자리
  const [digitOnes, setDigitOnes] = useState('') // 일의 자리
  const [digitTenths, setDigitTenths] = useState('') // 소수 첫째 자리
  const [digitHundredths, setDigitHundredths] = useState('') // 소수 둘째 자리
  
  // 받아올림 메모칸 (선택적, 채점 안 함)
  const [carryHundreds, setCarryHundreds] = useState('') // 백의 자리 받아올림
  const [carryTens, setCarryTens] = useState('') // 십의 자리 받아올림
  const [carryOnes, setCarryOnes] = useState('') // 일의 자리 받아올림
  const [carryTenths, setCarryTenths] = useState('') // 소수 첫째 자리 받아올림
  const [carryHundredths, setCarryHundredths] = useState('') // 소수 둘째 자리 받아올림

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
    setDigitHundreds('')
    setDigitTens('')
    setDigitOnes('')
    setDigitTenths('')
    setDigitHundredths('')
    setCarryHundreds('')
    setCarryTens('')
    setCarryOnes('')
    setCarryTenths('')
    setCarryHundredths('')
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
    
    // 입력된 자릿수를 조합하여 답 만들기
    // 일의 자리는 필수! 십의 자리나 백의 자리만 비워둘 수 있음
    if (digitOnes === '') {
      alert('일의 자리는 꼭 입력해주세요! 답이 10보다 작으면 일의 자리만 입력하면 돼요.')
      return
    }
    
    const hundredsVal = digitHundreds === '' ? 0 : parseInt(digitHundreds)
    const tensVal = digitTens === '' ? 0 : parseInt(digitTens)
    const onesVal = parseInt(digitOnes)
    const naturalPart = hundredsVal * 100 + tensVal * 10 + onesVal
    
    // 소수 부분 처리: 비어있으면 0으로 (12 = 12.00, 3.4 = 3.40)
    const tenthsVal = digitTenths === '' ? '0' : digitTenths
    const hundredthsVal = digitHundredths === '' ? '0' : digitHundredths
    
    const userAnswerNum = parseFloat(`${naturalPart}.${tenthsVal}${hundredthsVal}`)
    const correctAnswer = parseFloat(calculateAnswer())
    
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
    generateProblem()  // ← 이 줄로 바꾸기!
  }, 2000)
}
  }
  
  // 자릿수 입력 처리
  const handleDigitChange = (position, value) => {
    // 숫자만 입력 가능하고 한 자리만
    if (value === '' || /^[0-9]$/.test(value)) {
      if (position === 'hundreds') setDigitHundreds(value)
      else if (position === 'tens') setDigitTens(value)
      else if (position === 'ones') setDigitOnes(value)
      else if (position === 'tenths') setDigitTenths(value)
      else if (position === 'hundredths') setDigitHundredths(value)
      
      // 자동으로 다음 칸으로 이동 (오른쪽에서 왼쪽으로)
      if (value !== '') {
        if (position === 'hundredths') {
          document.getElementById('digit-tenths')?.focus()
        } else if (position === 'tenths') {
          document.getElementById('digit-ones')?.focus()
        } else if (position === 'ones') {
          document.getElementById('digit-tens')?.focus()
        } else if (position === 'tens') {
          document.getElementById('digit-hundreds')?.focus()
        }
      }
    }
  }
  
  // 받아올림/받아내림 메모칸 입력 처리 (채점 안 함)
  const handleCarryChange = (position, value) => {
    // 숫자만 입력 가능하고 두 자리까지 (받아내림은 10 입력 가능)
    if (value === '' || /^[0-9]{1,2}$/.test(value)) {
      if (position === 'hundreds') setCarryHundreds(value)
      else if (position === 'tens') setCarryTens(value)
      else if (position === 'ones') setCarryOnes(value)
      else if (position === 'tenths') setCarryTenths(value)
      else if (position === 'hundredths') setCarryHundredths(value)
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
            {/* 받아올림/받아내림 메모칸 (선택적) */}
            <div className="math-row carry-row">
              <span className="operator-space"></span>
              <input
                type="text"
                maxLength="2"
                value={carryHundreds}
                onChange={(e) => handleCarryChange('hundreds', e.target.value)}
                disabled={feedback !== null}
                className="carry-input"
                placeholder=""
              />
              <input
                type="text"
                maxLength="2"
                value={carryTens}
                onChange={(e) => handleCarryChange('tens', e.target.value)}
                disabled={feedback !== null}
                className="carry-input"
                placeholder=""
              />
              <input
                type="text"
                maxLength="2"
                value={carryOnes}
                onChange={(e) => handleCarryChange('ones', e.target.value)}
                disabled={feedback !== null}
                className="carry-input"
                placeholder=""
              />
              <span className="decimal-point-small"></span>
              <input
                type="text"
                maxLength="2"
                value={carryTenths}
                onChange={(e) => handleCarryChange('tenths', e.target.value)}
                disabled={feedback !== null}
                className="carry-input"
                placeholder=""
              />
              <input
  type="text"
  maxLength="2"
  value={carryHundredths}
  onChange={(e) => handleCarryChange('hundredths', e.target.value)}
  disabled={feedback !== null}
  className="carry-input"
  placeholder=""
/>
            </div>
            
            <div className="math-row number-row">
              <span className="operator-space"></span>
              <span className="digit-box">{Math.floor(num1 / 100) || ''}</span>
              <span className="digit-box">{Math.floor(num1 / 10) % 10 || (num1 >= 10 ? '0' : '')}</span>
              <span className="digit-box">{Math.floor(num1) % 10}</span>
              <span className="decimal-point">.</span>
              <span className="digit-box">{Math.floor((num1 * 10) % 10)}</span>
              <span className="digit-box">{Math.floor((num1 * 100) % 10)}</span>
            </div>
            <div className="math-row number-row">
              <span className="operator-display">{operation}</span>
              <span className="digit-box">{Math.floor(num2 / 100) || ''}</span>
              <span className="digit-box">{Math.floor(num2 / 10) % 10 || (num2 >= 10 ? '0' : '')}</span>
              <span className="digit-box">{Math.floor(num2) % 10}</span>
              <span className="decimal-point">.</span>
              <span className="digit-box">{Math.floor((num2 * 10) % 10)}</span>
              <span className="digit-box">{Math.floor((num2 * 100) % 10)}</span>
            </div>
            <div className="math-row line-row">
              <div className="horizontal-line"></div>
            </div>
            <div className="math-row answer-row">
              <form onSubmit={handleSubmit} className="answer-form">
                <span className="operator-space"></span>
                <input
                  id="digit-hundreds"
                  type="text"
                  maxLength="1"
                  value={digitHundreds}
                  onChange={(e) => handleDigitChange('hundreds', e.target.value)}
                  disabled={feedback !== null}
                  className="digit-input"
                  placeholder=""
                />
                <input
                  id="digit-tens"
                  type="text"
                  maxLength="1"
                  value={digitTens}
                  onChange={(e) => handleDigitChange('tens', e.target.value)}
                  disabled={feedback !== null}
                  className="digit-input"
                  placeholder=""
                />
                <input
                  id="digit-ones"
                  type="text"
                  maxLength="1"
                  value={digitOnes}
                  onChange={(e) => handleDigitChange('ones', e.target.value)}
                  disabled={feedback !== null}
                  className="digit-input"
                  placeholder=""
                />
                <span className="decimal-point">.</span>
                <input
                  id="digit-tenths"
                  type="text"
                  maxLength="1"
                  value={digitTenths}
                  onChange={(e) => handleDigitChange('tenths', e.target.value)}
                  disabled={feedback !== null}
                  className="digit-input"
                  placeholder=""
                />
                <input
                  id="digit-hundredths"
                  type="text"
                  maxLength="1"
                  value={digitHundredths}
                  onChange={(e) => handleDigitChange('hundredths', e.target.value)}
                  disabled={feedback !== null}
                  className="digit-input"
                  placeholder=""
                  autoFocus
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
                <div className="feedback-answer">문제: {num1} {operation} {num2}</div>
              </>
            )}
          </div>
        )}

        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={feedback !== null || digitOnes === ''}
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
