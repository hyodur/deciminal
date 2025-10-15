import { useState, useEffect } from 'react'
import './App.css'
import GameScreen from './components/GameScreen'
import AvatarCustomizer from './components/AvatarCustomizer'
import Shop from './components/Shop'

function App() {
  const [screen, setScreen] = useState('game') // 'game', 'avatar', 'shop'
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalWrong, setTotalWrong] = useState(0)
  
  // 아바타 상태
  const [avatar, setAvatar] = useState({
    hair: 'basic',
    top: 'basic',
    bottom: 'basic',
    shoes: 'basic',
    accessory: 'none'
  })
  
  // 구매한 아이템 목록
  const [purchasedItems, setPurchasedItems] = useState({
    hair: ['basic'],
    top: ['basic'],
    bottom: ['basic'],
    shoes: ['basic'],
    accessory: ['none']
  })

  // 레벨업 체크 (경험치 기반)
  useEffect(() => {
    const requiredScore = level * 150 // 레벨업에 필요한 점수를 높임 (짜게!)
    if (score >= requiredScore && level < 15) {
      setLevel(level + 1)
      setScore(score - requiredScore)
      const levelBonus = 150 * level // 레벨업 시 코인 지급 (더 많이!)
      setCoins(coins + levelBonus)
      alert(`🎉 레벨 ${level + 1} 달성! ${levelBonus} 코인을 획득했습니다!`)
      
      if (level + 1 === 10) {
        alert('🏆 축하합니다! 레벨 10 달성! 선생님께 보상을 받으세요!')
      }
    }
  }, [score, level, coins])

  // localStorage에 진행상황 저장
  useEffect(() => {
    const saveData = {
      level,
      score,
      coins,
      totalCorrect,
      totalWrong,
      avatar,
      purchasedItems
    }
    localStorage.setItem('decimalMathGame', JSON.stringify(saveData))
  }, [level, score, coins, totalCorrect, totalWrong, avatar, purchasedItems])

  // localStorage에서 진행상황 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem('decimalMathGame')
    if (savedData) {
      const data = JSON.parse(savedData)
      setLevel(data.level || 1)
      setScore(data.score || 0)
      setCoins(data.coins || 0)
      setTotalCorrect(data.totalCorrect || 0)
      setTotalWrong(data.totalWrong || 0)
      setAvatar(data.avatar || avatar)
      setPurchasedItems(data.purchasedItems || purchasedItems)
    }
  }, [])

  const handleCorrectAnswer = (points) => {
    setScore(score + points)
    setTotalCorrect(totalCorrect + 1)
    const coinReward = Math.floor(points / 2) // 점수의 1/2을 코인으로 지급 (더 많이!)
    setCoins(coins + coinReward)
  }

  const handleWrongAnswer = () => {
    setTotalWrong(totalWrong + 1)
  }

  const handlePurchase = (category, itemId, price) => {
    if (coins >= price) {
      setCoins(coins - price)
      setPurchasedItems({
        ...purchasedItems,
        [category]: [...purchasedItems[category], itemId]
      })
      return true
    }
    return false
  }

  const handleAvatarChange = (category, itemId) => {
    setAvatar({
      ...avatar,
      [category]: itemId
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 소수 마스터</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">레벨</span>
            <span className="stat-value">{level}/15</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">점수</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">💰 코인</span>
            <span className="stat-value">{coins}</span>
          </div>
        </div>
      </header>

      <nav className="nav-menu">
        <button 
          className={screen === 'game' ? 'active' : ''} 
          onClick={() => setScreen('game')}
        >
          🎮 게임
        </button>
        <button 
          className={screen === 'avatar' ? 'active' : ''} 
          onClick={() => setScreen('avatar')}
        >
          👤 아바타
        </button>
        <button 
          className={screen === 'shop' ? 'active' : ''} 
          onClick={() => setScreen('shop')}
        >
          🛍️ 상점
        </button>
      </nav>

      <main className="app-main">
        {screen === 'game' && (
          <GameScreen 
            level={level}
            onCorrect={handleCorrectAnswer}
            onWrong={handleWrongAnswer}
            totalCorrect={totalCorrect}
            totalWrong={totalWrong}
          />
        )}
        {screen === 'avatar' && (
          <AvatarCustomizer 
            avatar={avatar}
            purchasedItems={purchasedItems}
            onAvatarChange={handleAvatarChange}
          />
        )}
        {screen === 'shop' && (
          <Shop 
            coins={coins}
            purchasedItems={purchasedItems}
            onPurchase={handlePurchase}
          />
        )}
      </main>
    </div>
  )
}

export default App
