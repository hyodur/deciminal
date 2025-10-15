import { useState } from 'react'
import Avatar from './Avatar'
import './Shop.css'

function Shop({ coins, purchasedItems, onPurchase }) {
  const [selectedCategory, setSelectedCategory] = useState('hair')
  const [notification, setNotification] = useState(null)

  const categories = [
    { id: 'hair', name: '💇 헤어', emoji: '💇' },
    { id: 'top', name: '👕 상의', emoji: '👕' },
    { id: 'bottom', name: '👖 하의', emoji: '👖' },
    { id: 'shoes', name: '👟 신발', emoji: '👟' },
    { id: 'accessory', name: '🎒 액세서리', emoji: '🎒' }
  ]

  const shopItems = {
    hair: [
      { id: 'short', name: '짧은 머리', price: 100, emoji: '💇‍♂️', rarity: 'common' },
      { id: 'long', name: '긴 머리', price: 100, emoji: '💇‍♀️', rarity: 'common' },
      { id: 'curly', name: '곱슬머리', price: 200, emoji: '🦱', rarity: 'rare' },
      { id: 'ponytail', name: '포니테일', price: 300, emoji: '🎀', rarity: 'rare' },
      { id: 'bun', name: '상투', price: 400, emoji: '🍞', rarity: 'epic' },
      { id: 'colorful', name: '염색 머리', price: 800, emoji: '🌈', rarity: 'legendary' }
    ],
    top: [
      { id: 'hoodie', name: '후드티', price: 150, emoji: '🧥', rarity: 'common' },
      { id: 'shirt', name: '셔츠', price: 200, emoji: '👔', rarity: 'common' },
      { id: 'jacket', name: '재킷', price: 350, emoji: '🧥', rarity: 'rare' },
      { id: 'sweater', name: '스웨터', price: 400, emoji: '🧶', rarity: 'rare' },
      { id: 'tshirt_cool', name: '멋진 티셔츠', price: 600, emoji: '👕✨', rarity: 'epic' },
      { id: 'dress', name: '원피스', price: 1000, emoji: '👗', rarity: 'legendary' }
    ],
    bottom: [
      { id: 'jeans', name: '청바지', price: 150, emoji: '👖', rarity: 'common' },
      { id: 'shorts', name: '반바지', price: 100, emoji: '🩳', rarity: 'common' },
      { id: 'skirt', name: '치마', price: 250, emoji: '👗', rarity: 'rare' },
      { id: 'joggers', name: '조거팬츠', price: 400, emoji: '🧘', rarity: 'rare' },
      { id: 'cargo', name: '카고 바지', price: 800, emoji: '🎒👖', rarity: 'epic' }
    ],
    shoes: [
      { id: 'sneakers', name: '나이키 스타일', price: 200, emoji: '👟✨', rarity: 'common' },
      { id: 'boots', name: '부츠', price: 300, emoji: '🥾', rarity: 'rare' },
      { id: 'sandals', name: '샌들', price: 150, emoji: '🩴', rarity: 'common' },
      { id: 'slippers', name: '슬리퍼', price: 100, emoji: '🩴', rarity: 'common' },
      { id: 'dress_shoes', name: '구두', price: 500, emoji: '👞', rarity: 'epic' }
    ],
    accessory: [
      { id: 'cap', name: '모자', price: 200, emoji: '🧢', rarity: 'common' },
      { id: 'glasses', name: '안경', price: 250, emoji: '👓', rarity: 'common' },
      { id: 'backpack', name: '가방', price: 400, emoji: '🎒', rarity: 'rare' },
      { id: 'headphones', name: '헤드폰', price: 600, emoji: '🎧', rarity: 'epic' },
      { id: 'scarf', name: '스카프', price: 300, emoji: '🧣', rarity: 'rare' },
      { id: 'watch', name: '시계', price: 1200, emoji: '⌚', rarity: 'legendary' }
    ]
  }

  const rarityColors = {
    common: '#95a5a6',
    rare: '#3498db',
    epic: '#9b59b6',
    legendary: '#f39c12'
  }

  const rarityLabels = {
    common: '일반',
    rare: '레어',
    epic: '에픽',
    legendary: '전설'
  }

  const handlePurchase = (category, item) => {
    if (purchasedItems[category].includes(item.id)) {
      showNotification('이미 구매한 아이템입니다!', 'warning')
      return
    }

    if (coins < item.price) {
      showNotification('코인이 부족합니다!', 'error')
      return
    }

    const success = onPurchase(category, item.id, item.price)
    if (success) {
      showNotification(`${item.name}을(를) 구매했습니다! 🎉`, 'success')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 2000)
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <h2>🛍️ 상점</h2>
        <div className="coin-display">
          <span className="coin-label">보유 코인:</span>
          <span className="coin-amount">💰 {coins}</span>
        </div>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      <div className="shop-items">
        {shopItems[selectedCategory].map(item => {
          const isPurchased = purchasedItems[selectedCategory].includes(item.id)
          const canAfford = coins >= item.price
          
          // 미리보기용 아바타 (기본 + 해당 아이템)
          const previewAvatar = {
            hair: 'basic',
            top: 'basic',
            bottom: 'basic',
            shoes: 'basic',
            accessory: 'none',
            [selectedCategory]: item.id
          }

          return (
            <div
              key={item.id}
              className={`shop-item ${isPurchased ? 'purchased' : ''}`}
              style={{ borderColor: rarityColors[item.rarity] }}
            >
              <div className="item-rarity" style={{ backgroundColor: rarityColors[item.rarity] }}>
                {rarityLabels[item.rarity]}
              </div>
              
              <div className="item-preview-large">
                <Avatar avatar={previewAvatar} size="small" />
              </div>
              
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">
                  💰 {item.price} 코인
                </div>
              </div>

              {isPurchased ? (
                <button className="purchase-button purchased" disabled>
                  ✅ 구매완료
                </button>
              ) : (
                <button
                  className={`purchase-button ${!canAfford ? 'disabled' : ''}`}
                  onClick={() => handlePurchase(selectedCategory, item)}
                  disabled={!canAfford}
                >
                  {canAfford ? '구매하기' : '코인 부족'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="shop-tips">
        <h3>💡 쇼핑 팁</h3>
        <ul>
          <li>문제를 풀면 점수와 함께 코인을 획득할 수 있어요!</li>
          <li>레벨업 시 보너스 코인을 받을 수 있어요!</li>
          <li>레어도가 높을수록 더 멋진 아이템이에요!</li>
          <li>열심히 문제를 풀고 나만의 아바타를 꾸며보세요!</li>
        </ul>
      </div>
    </div>
  )
}

export default Shop
