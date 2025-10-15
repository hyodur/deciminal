import './Avatar.css'

function Avatar({ avatar, size = 'medium' }) {
  const sizes = {
    small: { width: 120, height: 180 },
    medium: { width: 200, height: 300 },
    large: { width: 280, height: 420 }
  }
  
  const { width, height } = sizes[size]
  
  // 색상 매핑
  const hairColors = {
    basic: '#8B4513',
    short: '#2C1810',
    long: '#654321',
    curly: '#8B4513',
    ponytail: '#FF69B4',
    bun: '#D2691E',
    colorful: '#FF1493'
  }
  
  const topColors = {
    basic: '#FF6B6B',
    hoodie: '#4ECDC4',
    shirt: '#95E1D3',
    jacket: '#F38181',
    sweater: '#AA96DA',
    tshirt_cool: '#FCBAD3',
    dress: '#FFFFD2'
  }
  
  const bottomColors = {
    basic: '#5C7CFA',
    jeans: '#4263EB',
    shorts: '#74C0FC',
    skirt: '#FFD43B',
    joggers: '#8C8C8C',
    cargo: '#A9A9A9'
  }
  
  const shoesColors = {
    basic: '#FFFFFF',
    sneakers: '#FF0000',
    boots: '#8B4513',
    sandals: '#DEB887',
    slippers: '#FFB6C1',
    dress_shoes: '#000000'
  }

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 300" 
      className="avatar-svg"
    >
      <defs>
        {/* 그라디언트 정의 */}
        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF0000"/>
          <stop offset="25%" stopColor="#FFFF00"/>
          <stop offset="50%" stopColor="#00FF00"/>
          <stop offset="75%" stopColor="#0000FF"/>
          <stop offset="100%" stopColor="#FF00FF"/>
        </linearGradient>
        
        {/* 그림자 효과 */}
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* 신발 */}
      <g className="shoes" filter="url(#shadow)">
        {avatar.shoes === 'boots' ? (
          <>
            {/* 부츠 */}
            <path d="M 65 250 L 65 265 Q 65 272 72 272 L 88 272 Q 95 272 95 265 L 95 250 Z" 
                  fill={shoesColors[avatar.shoes]} stroke="#2C1810" strokeWidth="2"/>
            <path d="M 105 250 L 105 265 Q 105 272 112 272 L 128 272 Q 135 272 135 265 L 135 250 Z" 
                  fill={shoesColors[avatar.shoes]} stroke="#2C1810" strokeWidth="2"/>
          </>
        ) : (
          <>
            {/* 일반 신발 */}
            <ellipse cx="80" cy="268" rx="20" ry="10" fill={shoesColors[avatar.shoes]} 
                     stroke="#2C1810" strokeWidth="2"/>
            <ellipse cx="120" cy="268" rx="20" ry="10" fill={shoesColors[avatar.shoes]} 
                     stroke="#2C1810" strokeWidth="2"/>
            {avatar.shoes === 'sneakers' && (
              <>
                <path d="M 65 268 Q 70 264 80 264" stroke="#FFF" strokeWidth="2" fill="none"/>
                <path d="M 105 268 Q 110 264 120 264" stroke="#FFF" strokeWidth="2" fill="none"/>
                <circle cx="75" cy="268" r="2" fill="#FFF"/>
                <circle cx="115" cy="268" r="2" fill="#FFF"/>
              </>
            )}
          </>
        )}
      </g>

      {/* 다리 */}
      <g className="legs">
        {avatar.bottom === 'skirt' ? (
          <>
            {/* 치마 */}
            <path d="M 75 180 L 65 235 Q 65 240 70 240 L 90 240 Q 90 245 90 250 L 90 265" 
                  fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
            <path d="M 125 180 L 135 235 Q 135 240 130 240 L 110 240 Q 110 245 110 250 L 110 265" 
                  fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
          </>
        ) : (
          <>
            {/* 바지 다리 */}
            <path d="M 80 180 L 75 250 Q 75 260 80 265" 
                  fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
            <path d="M 120 180 L 125 250 Q 125 260 120 265" 
                  fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
          </>
        )}
      </g>

      {/* 하의 */}
      <g className="bottom" filter="url(#shadow)">
        {avatar.bottom === 'skirt' ? (
          <path d="M 70 175 Q 100 180 130 175 L 140 230 Q 140 235 100 235 Q 60 235 60 230 Z" 
                fill={bottomColors[avatar.bottom]} stroke="#2C1810" strokeWidth="2"/>
        ) : avatar.bottom === 'shorts' ? (
          <>
            <path d="M 70 175 L 65 220 Q 65 225 72 225 L 95 225 L 95 175 Z" 
                  fill={bottomColors[avatar.bottom]} stroke="#2C1810" strokeWidth="2"/>
            <path d="M 130 175 L 135 220 Q 135 225 128 225 L 105 225 L 105 175 Z" 
                  fill={bottomColors[avatar.bottom]} stroke="#2C1810" strokeWidth="2"/>
          </>
        ) : (
          <>
            <path d="M 70 175 L 70 245 Q 70 250 77 250 L 95 250 L 95 175 Z" 
                  fill={bottomColors[avatar.bottom]} stroke="#2C1810" strokeWidth="2"/>
            <path d="M 130 175 L 130 245 Q 130 250 123 250 L 105 250 L 105 175 Z" 
                  fill={bottomColors[avatar.bottom]} stroke="#2C1810" strokeWidth="2"/>
            {avatar.bottom === 'jeans' && (
              <>
                <line x1="85" y1="200" x2="83" y2="245" stroke="#3651C7" strokeWidth="1.5"/>
                <line x1="115" y1="200" x2="117" y2="245" stroke="#3651C7" strokeWidth="1.5"/>
              </>
            )}
          </>
        )}
      </g>

      {/* 팔 */}
      <g className="arms">
        {/* 왼팔 */}
        <path d="M 60 130 Q 40 140 45 165 L 52 163 Q 50 145 60 140 Z" 
              fill={topColors[avatar.top]} stroke="#2C1810" strokeWidth="1.5"/>
        {/* 왼손 */}
        <circle cx="45" cy="168" r="7" fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
        
        {/* 오른팔 */}
        <path d="M 140 130 Q 160 140 155 165 L 148 163 Q 150 145 140 140 Z" 
              fill={topColors[avatar.top]} stroke="#2C1810" strokeWidth="1.5"/>
        {/* 오른손 */}
        <circle cx="155" cy="168" r="7" fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
      </g>

      {/* 몸통 */}
      <g className="body" filter="url(#shadow)">
        {avatar.top === 'dress' ? (
          <path d="M 70 115 Q 60 120 60 180 L 60 230 Q 60 235 100 235 Q 140 235 140 230 L 140 180 Q 140 120 130 115 Z" 
                fill={topColors[avatar.top]} stroke="#2C1810" strokeWidth="2"/>
        ) : (
          <>
            <ellipse cx="100" cy="145" rx="40" ry="35" 
                     fill={topColors[avatar.top]} stroke="#2C1810" strokeWidth="2"/>
            {avatar.top === 'hoodie' && (
              <>
                {/* 후드 끈 */}
                <path d="M 90 125 Q 95 130 100 130 Q 105 130 110 125" 
                      stroke="#2C1810" strokeWidth="2" fill="none"/>
                <circle cx="90" cy="125" r="3" fill="#2C1810"/>
                <circle cx="110" cy="125" r="3" fill="#2C1810"/>
                {/* 지퍼 */}
                <line x1="100" y1="125" x2="100" y2="175" stroke="#666" strokeWidth="2"/>
              </>
            )}
            {avatar.top === 'shirt' && (
              <>
                {/* 셔츠 버튼 */}
                <circle cx="100" cy="130" r="2" fill="#FFF" stroke="#2C1810" strokeWidth="1"/>
                <circle cx="100" cy="145" r="2" fill="#FFF" stroke="#2C1810" strokeWidth="1"/>
                <circle cx="100" cy="160" r="2" fill="#FFF" stroke="#2C1810" strokeWidth="1"/>
              </>
            )}
          </>
        )}
      </g>

      {/* 목 */}
      <ellipse cx="100" cy="110" rx="15" ry="12" fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>

      {/* 액세서리 - 스카프 (목에 착용) */}
      {avatar.accessory === 'scarf' && (
        <g className="scarf">
          <path d="M 85 105 Q 100 112 115 105 Q 118 108 120 120" 
                stroke="#FF6B9D" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <path d="M 120 120 L 128 145" stroke="#FF6B9D" strokeWidth="6" strokeLinecap="round"/>
        </g>
      )}

      {/* 얼굴 */}
      <g className="face">
        <circle cx="100" cy="75" r="32" fill="#FDBCB4" stroke="#2C1810" strokeWidth="2"/>
        
        {/* 귀 */}
        <circle cx="70" cy="75" r="8" fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
        <circle cx="130" cy="75" r="8" fill="#FDBCB4" stroke="#2C1810" strokeWidth="1.5"/>
        
        {/* 눈 */}
        <circle cx="88" cy="70" r="3" fill="#2C1810"/>
        <circle cx="112" cy="70" r="3" fill="#2C1810"/>
        <circle cx="89" cy="69" r="1.5" fill="#FFF"/>
        <circle cx="113" cy="69" r="1.5" fill="#FFF"/>
        
        {/* 눈썹 */}
        <path d="M 82 63 Q 88 61 94 62" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 106 62 Q 112 61 118 63" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* 코 */}
        <path d="M 100 75 L 100 80 Q 100 82 102 82" stroke="#2C1810" strokeWidth="1" fill="none" strokeLinecap="round"/>
        
        {/* 입 */}
        <path d="M 90 85 Q 100 90 110 85" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* 볼 */}
        <circle cx="78" cy="80" r="5" fill="#FFB6C1" opacity="0.6"/>
        <circle cx="122" cy="80" r="5" fill="#FFB6C1" opacity="0.6"/>
      </g>

      {/* 헤어 */}
      <g className="hair" filter="url(#shadow)">
        {avatar.hair === 'basic' && (
          <path d="M 68 65 Q 68 40 100 35 Q 132 40 132 65 Q 132 50 125 45 Q 115 35 100 33 Q 85 35 75 45 Q 68 50 68 65" 
                fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
        )}
        {avatar.hair === 'short' && (
          <path d="M 70 70 Q 70 45 80 35 Q 90 30 100 28 Q 110 30 120 35 Q 130 45 130 70 L 130 60 Q 125 45 100 40 Q 75 45 70 60 Z" 
                fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
        )}
        {avatar.hair === 'long' && (
          <>
            <path d="M 68 65 Q 68 40 100 35 Q 132 40 132 65" 
                  fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <path d="M 68 65 Q 65 70 63 100 Q 62 110 67 112 Q 70 110 70 100 L 70 70" 
                  fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <path d="M 132 65 Q 135 70 137 100 Q 138 110 133 112 Q 130 110 130 100 L 130 70" 
                  fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
          </>
        )}
        {avatar.hair === 'curly' && (
          <>
            <circle cx="100" cy="42" r="28" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <circle cx="78" cy="55" r="16" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <circle cx="122" cy="55" r="16" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <circle cx="90" cy="35" r="12" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <circle cx="110" cy="35" r="12" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
          </>
        )}
        {avatar.hair === 'ponytail' && (
          <>
            <path d="M 68 65 Q 68 40 100 35 Q 132 40 132 65" 
                  fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <ellipse cx="140" cy="75" rx="10" ry="25" 
                     fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <circle cx="132" cy="70" r="8" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
          </>
        )}
        {avatar.hair === 'bun' && (
          <>
            <path d="M 68 65 Q 68 45 100 40 Q 132 45 132 65" 
                  fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <circle cx="100" cy="35" r="15" fill={hairColors[avatar.hair]} stroke="#2C1810" strokeWidth="2"/>
            <ellipse cx="100" cy="35" rx="12" ry="8" fill={hairColors[avatar.hair]} opacity="0.5"/>
          </>
        )}
        {avatar.hair === 'colorful' && (
          <path d="M 68 65 Q 68 40 100 35 Q 132 40 132 65 Q 132 50 125 45 Q 115 35 100 33 Q 85 35 75 45 Q 68 50 68 65" 
                fill="url(#rainbow)" stroke="#2C1810" strokeWidth="2"/>
        )}
      </g>

      {/* 액세서리 */}
      {avatar.accessory !== 'none' && avatar.accessory !== 'scarf' && (
        <g className="accessory">
          {avatar.accessory === 'cap' && (
            <>
              <ellipse cx="100" cy="42" rx="35" ry="6" fill="#FF4444" stroke="#2C1810" strokeWidth="2"/>
              <path d="M 72 42 Q 72 25 100 20 Q 128 25 128 42" 
                    fill="#FF4444" stroke="#2C1810" strokeWidth="2"/>
              <ellipse cx="105" cy="42" rx="8" ry="3" fill="#FFF" opacity="0.7"/>
            </>
          )}
          {avatar.accessory === 'glasses' && (
            <>
              <circle cx="88" cy="70" r="9" fill="none" stroke="#2C1810" strokeWidth="2" opacity="0.8"/>
              <circle cx="112" cy="70" r="9" fill="none" stroke="#2C1810" strokeWidth="2" opacity="0.8"/>
              <line x1="97" y1="70" x2="103" y2="70" stroke="#2C1810" strokeWidth="2"/>
              <path d="M 79 70 L 72 68" stroke="#2C1810" strokeWidth="1.5"/>
              <path d="M 121 70 L 128 68" stroke="#2C1810" strokeWidth="1.5"/>
            </>
          )}
          {avatar.accessory === 'backpack' && (
            <>
              <rect x="135" y="135" width="22" height="30" rx="4" 
                    fill="#4ECDC4" stroke="#2C1810" strokeWidth="2"/>
              <rect x="140" y="140" width="12" height="8" rx="2" fill="#2C1810"/>
              <line x1="135" y1="140" x2="130" y2="135" stroke="#2C1810" strokeWidth="2"/>
              <line x1="135" y1="155" x2="130" y2="160" stroke="#2C1810" strokeWidth="2"/>
            </>
          )}
          {avatar.accessory === 'headphones' && (
            <>
              <path d="M 70 62 Q 70 30 100 25 Q 130 30 130 62" 
                    stroke="#FF4444" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="70" cy="70" r="10" fill="#FF4444" stroke="#2C1810" strokeWidth="2"/>
              <circle cx="130" cy="70" r="10" fill="#FF4444" stroke="#2C1810" strokeWidth="2"/>
              <circle cx="70" cy="70" r="6" fill="#2C1810"/>
              <circle cx="130" cy="70" r="6" fill="#2C1810"/>
            </>
          )}
          {avatar.accessory === 'watch' && (
            <>
              <rect x="40" y="162" width="12" height="10" rx="2" 
                    fill="#FFD700" stroke="#2C1810" strokeWidth="1.5"/>
              <circle cx="46" cy="167" r="3" fill="#FFF" stroke="#2C1810" strokeWidth="1"/>
              <line x1="46" y1="167" x2="47" y2="165" stroke="#2C1810" strokeWidth="0.5"/>
            </>
          )}
        </g>
      )}
    </svg>
  )
}

export default Avatar
