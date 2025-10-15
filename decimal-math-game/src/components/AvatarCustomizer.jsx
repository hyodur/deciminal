import { useState } from 'react'
import Avatar from './Avatar'
import './AvatarCustomizer.css'

function AvatarCustomizer({ avatar, purchasedItems, onAvatarChange }) {
  const [selectedCategory, setSelectedCategory] = useState('hair')

  const categories = [
    { id: 'hair', name: '💇 헤어', emoji: '💇' },
    { id: 'top', name: '👕 상의', emoji: '👕' },
    { id: 'bottom', name: '👖 하의', emoji: '👖' },
    { id: 'shoes', name: '👟 신발', emoji: '👟' },
    { id: 'accessory', name: '🎒 액세서리', emoji: '🎒' }
  ]

  const itemNames = {
    hair: {
      basic: '기본 헤어',
      short: '짧은 머리',
      long: '긴 머리',
      curly: '곱슬머리',
      ponytail: '포니테일',
      bun: '상투',
      colorful: '염색 머리'
    },
    top: {
      basic: '기본 티셔츠',
      hoodie: '후드티',
      shirt: '셔츠',
      jacket: '재킷',
      sweater: '스웨터',
      tshirt_cool: '멋진 티셔츠',
      dress: '원피스'
    },
    bottom: {
      basic: '기본 바지',
      jeans: '청바지',
      shorts: '반바지',
      skirt: '치마',
      joggers: '조거팬츠',
      cargo: '카고 바지'
    },
    shoes: {
      basic: '기본 운동화',
      sneakers: '나이키 스타일',
      boots: '부츠',
      sandals: '샌들',
      slippers: '슬리퍼',
      dress_shoes: '구두'
    },
    accessory: {
      none: '없음',
      cap: '모자',
      glasses: '안경',
      backpack: '가방',
      headphones: '헤드폰',
      scarf: '스카프',
      watch: '시계'
    }
  }

  const handleItemSelect = (itemId) => {
    if (purchasedItems[selectedCategory].includes(itemId)) {
      onAvatarChange(selectedCategory, itemId)
    }
  }

  return (
    <div className="avatar-customizer">
      <h2>아바타 꾸미기</h2>
      
      <div className="avatar-preview">
        <div className="avatar-display">
          <Avatar avatar={avatar} size="large" />
        </div>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.emoji}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {Object.entries(itemNames[selectedCategory]).map(([itemId, itemName]) => {
          const isPurchased = purchasedItems[selectedCategory].includes(itemId)
          const isEquipped = avatar[selectedCategory] === itemId
          
          // 미리보기용 임시 아바타
          const previewAvatar = { ...avatar, [selectedCategory]: itemId }
          
          return (
            <div
              key={itemId}
              className={`item-card ${!isPurchased ? 'locked' : ''} ${isEquipped ? 'equipped' : ''}`}
              onClick={() => handleItemSelect(itemId)}
            >
              <div className="item-preview">
                <Avatar avatar={previewAvatar} size="small" />
              </div>
              <div className="item-name">{itemName}</div>
              {!isPurchased && <div className="locked-badge">🔒</div>}
              {isEquipped && <div className="equipped-badge">✅ 착용중</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AvatarCustomizer
