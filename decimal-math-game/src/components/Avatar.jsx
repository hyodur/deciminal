import './Avatar.css'

function Avatar({ avatar, size = 'medium' }) {
  const sizes = {
    small: { width: 120, height: 180 },
    medium: { width: 200, height: 300 },
    large: { width: 280, height: 420 }
  }
  
  const { width, height } = sizes[size]
  
  // 색상 매핑 (파스텔 톤으로 변경!)
  const hairColors = {
    basic: '#8B6F47',
    short: '#5D4E37',
    long: '#A0826D',
    curly: '#C19A6B',
    ponytail: '#FFB6D9',
    bun: '#E6B87D',
    colorful: 'url(#rainbowGradient)'
  }
  
  const topColors = {
    basic: '#FFB3BA',
    hoodie: '#BAE1FF',
    shirt: '#BAFFC9',
    jacket: '#FFD1DC',
    sweater: '#E0BBE4',
    tshirt_cool: '#FFDFD3',
    dress: '#FFF9B0'
  }
  
  const bottomColors = {
    basic: '#A8D8EA',
    jeans: '#6B9BD1',
    shorts: '#A4D4FF',
    skirt: '#FFE5B4',
    joggers: '#D4D4D4',
    cargo: '#C4C4A3'
  }
  
  const shoesColors = {
    basic: '#FFFFFF',
    sneakers: '#FFB6B9',
    boots: '#C19A6B',
    sandals: '#F5DEB3',
    slippers: '#FFE4E1',
    dress_shoes: '#8B8B8B'
  }

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 320" 
      className="avatar-svg"
    >
      <defs>
        {/* 무지개 그라디언트 */}
        <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="25%" stopColor="#FEC163" />
          <stop offset="50%" stopColor="#92FE9D" />
          <stop offset="75%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#C471ED" />
        </linearGradient>
        
        {/* 그림자 */}
        <filter id="softShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="3" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* 볼 터치 그라디언트 */}
        <radialGradient id="blushGradient">
          <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* 바닥 그림자 */}
      <ellipse cx="100" cy="305" rx="50" ry="8" fill="#000" opacity="0.1"/>

      {/* 신발 */}
      <g className="shoes" filter="url(#softShadow)">
        {avatar.shoes === 'boots' ? (
          <>
            <ellipse cx="75" cy="285" rx="22" ry="28" fill={shoesColors[avatar.shoes]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="125" cy="285" rx="22" ry="28" fill={shoesColors[avatar.shoes]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="75" cy="275" rx="18" ry="8" fill="#8B7355"/>
            <ellipse cx="125" cy="275" rx="18" ry="8" fill="#8B7355"/>
          </>
        ) : (
          <>
            <ellipse cx="75" cy="290" rx="24" ry="12" fill={shoesColors[avatar.shoes]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="125" cy="290" rx="24" ry="12" fill={shoesColors[avatar.shoes]} stroke="#5D4E37" strokeWidth="2.5"/>
            {avatar.shoes === 'sneakers' && (
              <>
                <path d="M 58 290 Q 68 285 78 285" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M 108 290 Q 118 285 128 285" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="65" cy="290" r="3" fill="#FFF"/>
                <circle cx="115" cy="290" r="3" fill="#FFF"/>
              </>
            )}
          </>
        )}
      </g>

      {/* 다리 */}
      <g className="legs">
        {avatar.bottom === 'skirt' ? (
          <>
            <rect x="65" y="215" width="18" height="75" rx="9" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="1.5"/>
            <rect x="117" y="215" width="18" height="75" rx="9" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="1.5"/>
          </>
        ) : (
          <>
            <rect x="68" y="200" width="20" height="85" rx="10" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="1.5"/>
            <rect x="112" y="200" width="20" height="85" rx="10" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="1.5"/>
          </>
        )}
      </g>

      {/* 하의 */}
      <g className="bottom" filter="url(#softShadow)">
        {avatar.bottom === 'skirt' ? (
          <>
            <path 
              d="M 65 185 Q 100 190 135 185 L 145 220 Q 145 230 100 232 Q 55 230 55 220 Z" 
              fill={bottomColors[avatar.bottom]} 
              stroke="#5D4E37" 
              strokeWidth="2.5"
            />
            {/* 치마 프릴 */}
            <path d="M 60 220 Q 70 225 80 220 Q 90 225 100 220 Q 110 225 120 220 Q 130 225 140 220" 
                  stroke="#5D4E37" strokeWidth="1.5" fill="none" opacity="0.6"/>
            {/* 리본 */}
            <ellipse cx="100" cy="188" rx="8" ry="4" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1.5"/>
          </>
        ) : avatar.bottom === 'shorts' ? (
          <>
            <rect x="65" y="185" width="28" height="45" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            <rect x="107" y="185" width="28" height="45" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            {/* 반바지 주머니 */}
            <ellipse cx="79" cy="200" rx="6" ry="8" fill="none" stroke="#5D4E37" strokeWidth="1.5"/>
            <ellipse cx="121" cy="200" rx="6" ry="8" fill="none" stroke="#5D4E37" strokeWidth="1.5"/>
            {/* 단 접기선 */}
            <line x1="65" y1="220" x2="93" y2="220" stroke="#5D4E37" strokeWidth="1.5" opacity="0.5"/>
            <line x1="107" y1="220" x2="135" y2="220" stroke="#5D4E37" strokeWidth="1.5" opacity="0.5"/>
          </>
        ) : avatar.bottom === 'joggers' ? (
          <>
            {/* 조거팬츠 */}
            <rect x="65" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            <rect x="107" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            {/* 줄무늬 */}
            <line x1="65" y1="200" x2="93" y2="200" stroke="#FFF" strokeWidth="2" opacity="0.7"/>
            <line x1="107" y1="200" x2="135" y2="200" stroke="#FFF" strokeWidth="2" opacity="0.7"/>
            <line x1="65" y1="205" x2="93" y2="205" stroke="#FFF" strokeWidth="2" opacity="0.7"/>
            <line x1="107" y1="205" x2="135" y2="205" stroke="#FFF" strokeWidth="2" opacity="0.7"/>
            {/* 발목 밴드 */}
            <rect x="65" y="270" width="28" height="8" fill="#5D5D5D" stroke="#5D4E37" strokeWidth="1.5"/>
            <rect x="107" y="270" width="28" height="8" fill="#5D5D5D" stroke="#5D4E37" strokeWidth="1.5"/>
          </>
        ) : avatar.bottom === 'cargo' ? (
          <>
            {/* 카고 바지 */}
            <rect x="65" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            <rect x="107" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            {/* 큰 주머니 */}
            <rect x="67" y="220" width="16" height="20" rx="3" fill="none" stroke="#5D4E37" strokeWidth="2"/>
            <rect x="117" y="220" width="16" height="20" rx="3" fill="none" stroke="#5D4E37" strokeWidth="2"/>
            <line x1="75" y1="225" x2="75" y2="235" stroke="#5D4E37" strokeWidth="1.5"/>
            <line x1="125" y1="225" x2="125" y2="235" stroke="#5D4E37" strokeWidth="1.5"/>
            {/* 벨트 고리 */}
            <rect x="75" y="185" width="4" height="8" fill="#8B7355" stroke="#5D4E37" strokeWidth="1"/>
            <rect x="121" y="185" width="4" height="8" fill="#8B7355" stroke="#5D4E37" strokeWidth="1"/>
          </>
        ) : avatar.bottom === 'jeans' ? (
          <>
            {/* 청바지 */}
            <rect x="65" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            <rect x="107" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            {/* 스티치 */}
            <line x1="79" y1="200" x2="77" y2="275" stroke="#5A8BB5" strokeWidth="2"/>
            <line x1="121" y1="200" x2="123" y2="275" stroke="#5A8BB5" strokeWidth="2"/>
            {/* 단추 */}
            <circle cx="79" cy="192" r="4" fill="#E8E8E8" stroke="#5A8BB5" strokeWidth="1.5"/>
            <circle cx="121" cy="192" r="4" fill="#E8E8E8" stroke="#5A8BB5" strokeWidth="1.5"/>
            {/* 뒷주머니 */}
            <path d="M 72 240 Q 72 245 79 245 Q 86 245 86 240" stroke="#5A8BB5" strokeWidth="2" fill="none"/>
            <path d="M 114 240 Q 114 245 121 245 Q 128 245 128 240" stroke="#5A8BB5" strokeWidth="2" fill="none"/>
          </>
        ) : (
          <>
            {/* 기본 바지 */}
            <rect x="65" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            <rect x="107" y="185" width="28" height="95" rx="8" fill={bottomColors[avatar.bottom]} stroke="#5D4E37" strokeWidth="2.5"/>
            {/* 주머니 */}
            <path d="M 70 195 Q 72 200 75 200" stroke="#5D4E37" strokeWidth="1.5" fill="none"/>
            <path d="M 125 195 Q 123 200 120 200" stroke="#5D4E37" strokeWidth="1.5" fill="none"/>
          </>
        )}
      </g>

      {/* 몸통 */}
      <g className="body" filter="url(#softShadow)">
        {avatar.top === 'dress' ? (
          <>
            <ellipse cx="100" cy="145" rx="50" ry="45" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5"/>
            <path 
              d="M 60 165 Q 55 180 55 200 L 55 225 Q 55 232 100 234 Q 145 232 145 225 L 145 200 Q 145 180 140 165" 
              fill={topColors[avatar.top]} 
              stroke="#5D4E37" 
              strokeWidth="2.5"
            />
            {/* 원피스 리본 */}
            <ellipse cx="100" cy="140" rx="12" ry="6" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="2"/>
            <circle cx="85" cy="160" r="6" fill="#FFF" opacity="0.6"/>
            <circle cx="115" cy="160" r="6" fill="#FFF" opacity="0.6"/>
          </>
        ) : (
          <>
            <ellipse cx="100" cy="155" rx="48" ry="42" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5"/>
            {avatar.top === 'hoodie' && (
              <>
                {/* 후드 */}
                <path d="M 70 130 Q 70 120 100 118 Q 130 120 130 130" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5"/>
                {/* 후드 끈 */}
                <path d="M 88 135 Q 95 140 100 140 Q 105 140 112 135" stroke="#5D4E37" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="88" cy="135" r="4" fill="#5D4E37"/>
                <circle cx="112" cy="135" r="4" fill="#5D4E37"/>
                {/* 지퍼 */}
                <line x1="100" y1="135" x2="100" y2="185" stroke="#8B8B8B" strokeWidth="3"/>
                <circle cx="100" cy="138" r="3" fill="#B8B8B8"/>
                {/* 주머니 */}
                <path d="M 70 170 Q 70 175 75 175 Q 80 175 80 170" stroke="#5D4E37" strokeWidth="2" fill="none"/>
                <path d="M 120 170 Q 120 175 125 175 Q 130 175 130 170" stroke="#5D4E37" strokeWidth="2" fill="none"/>
              </>
            )}
            {avatar.top === 'shirt' && (
              <>
                {/* 깃 */}
                <path d="M 100 125 L 90 135 L 100 140" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2" opacity="0.7"/>
                <path d="M 100 125 L 110 135 L 100 140" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2" opacity="0.7"/>
                {/* 버튼 */}
                <circle cx="100" cy="145" r="3.5" fill="#FFF" stroke="#5D4E37" strokeWidth="1.5"/>
                <circle cx="100" cy="160" r="3.5" fill="#FFF" stroke="#5D4E37" strokeWidth="1.5"/>
                <circle cx="100" cy="175" r="3.5" fill="#FFF" stroke="#5D4E37" strokeWidth="1.5"/>
                {/* 가슴 포켓 */}
                <rect x="110" y="145" width="15" height="12" rx="2" fill="none" stroke="#5D4E37" strokeWidth="1.5"/>
              </>
            )}
            {avatar.top === 'jacket' && (
              <>
                {/* 자켓 깃 */}
                <path d="M 100 130 L 85 140 L 80 155" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5" opacity="0.8"/>
                <path d="M 100 130 L 115 140 L 120 155" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5" opacity="0.8"/>
                {/* 지퍼 */}
                <line x1="100" y1="135" x2="100" y2="185" stroke="#FFD700" strokeWidth="3"/>
                {/* 주머니 */}
                <rect x="68" y="170" width="18" height="15" rx="3" fill="none" stroke="#5D4E37" strokeWidth="2"/>
                <rect x="114" y="170" width="18" height="15" rx="3" fill="none" stroke="#5D4E37" strokeWidth="2"/>
              </>
            )}
            {avatar.top === 'sweater' && (
              <>
                {/* 목 부분 */}
                <ellipse cx="100" cy="128" rx="20" ry="8" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5"/>
                {/* 줄무늬 패턴 */}
                <line x1="60" y1="150" x2="140" y2="150" stroke="#FFF" strokeWidth="3" opacity="0.5"/>
                <line x1="60" y1="165" x2="140" y2="165" stroke="#FFF" strokeWidth="3" opacity="0.5"/>
                {/* 소매 라인 */}
                <ellipse cx="60" cy="155" rx="10" ry="35" fill="none" stroke="#5D4E37" strokeWidth="1.5" opacity="0.3"/>
                <ellipse cx="140" cy="155" rx="10" ry="35" fill="none" stroke="#5D4E37" strokeWidth="1.5" opacity="0.3"/>
              </>
            )}
            {avatar.top === 'tshirt_cool' && (
              <>
                {/* V넥 */}
                <path d="M 88 130 L 100 145 L 112 130" stroke="#5D4E37" strokeWidth="2" fill="none"/>
                {/* 별 프린트 */}
                <path d="M 100 160 L 103 168 L 112 169 L 105 175 L 107 184 L 100 179 L 93 184 L 95 175 L 88 169 L 97 168 Z" 
                      fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
                <circle cx="85" cy="150" r="3" fill="#FFD700"/>
                <circle cx="115" cy="150" r="3" fill="#FFD700"/>
                <circle cx="80" cy="170" r="2.5" fill="#FFD700"/>
                <circle cx="120" cy="170" r="2.5" fill="#FFD700"/>
              </>
            )}
            {avatar.top === 'basic' && (
              <>
                {/* 심플한 라운드넥 */}
                <ellipse cx="100" cy="128" rx="18" ry="6" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2"/>
                {/* 작은 로고 */}
                <circle cx="115" cy="150" r="5" fill="#FFF" opacity="0.5"/>
              </>
            )}
          </>
        )}
      </g>

      {/* 팔 */}
      <g className="arms">
        {/* 왼팔 */}
        <ellipse cx="56" cy="165" rx="14" ry="38" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5" transform="rotate(-20 56 165)"/>
        <circle cx="50" cy="190" r="10" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="2"/>
        
        {/* 오른팔 */}
        <ellipse cx="144" cy="165" rx="14" ry="38" fill={topColors[avatar.top]} stroke="#5D4E37" strokeWidth="2.5" transform="rotate(20 144 165)"/>
        <circle cx="150" cy="190" r="10" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="2"/>
      </g>

      {/* 목 */}
      <ellipse cx="100" cy="115" rx="18" ry="15" fill="#FDBCB4" stroke="#E09E8F" strokeWidth="2"/>

      {/* 스카프 (목에 착용) */}
      {avatar.accessory === 'scarf' && (
        <g className="scarf">
          <path d="M 82 110 Q 100 118 118 110" stroke="#FF6B9D" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M 118 110 L 128 145" stroke="#FF6B9D" strokeWidth="8" strokeLinecap="round"/>
          <path d="M 128 145 L 125 150 L 131 150 L 128 145" fill="#FF6B9D"/>
        </g>
      )}

      {/* 얼굴 - 치비 스타일로 더 크게! */}
      <g className="face">
        {/* 얼굴 베이스 */}
        <ellipse cx="100" cy="75" rx="45" ry="48" fill="#FDBCB4" stroke="#5D4E37" strokeWidth="2.5"/>
        
        {/* 귀 */}
        <ellipse cx="58" cy="75" rx="12" ry="15" fill="#FDBCB4" stroke="#5D4E37" strokeWidth="2"/>
        <ellipse cx="142" cy="75" rx="12" ry="15" fill="#FDBCB4" stroke="#5D4E37" strokeWidth="2"/>
        <ellipse cx="58" cy="77" rx="6" ry="8" fill="#FFD4D4"/>
        <ellipse cx="142" cy="77" rx="6" ry="8" fill="#FFD4D4"/>
        
        {/* 눈 - 훨씬 크고 반짝반짝! */}
        <ellipse cx="82" cy="70" rx="9" ry="12" fill="#2C1810"/>
        <ellipse cx="118" cy="70" rx="9" ry="12" fill="#2C1810"/>
        <circle cx="85" cy="67" r="5" fill="#FFF"/>
        <circle cx="121" cy="67" r="5" fill="#FFF"/>
        <circle cx="87" cy="72" r="2.5" fill="#FFF"/>
        <circle cx="123" cy="72" r="2.5" fill="#FFF"/>
        
        {/* 눈썹 */}
        <path d="M 70 58 Q 82 55 90 57" stroke="#5D4E37" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 110 57 Q 118 55 130 58" stroke="#5D4E37" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* 코 - 작고 귀엽게 */}
        <ellipse cx="100" cy="82" rx="4" ry="3" fill="#FFB6C1" opacity="0.4"/>
        
        {/* 입 - 크고 행복하게! */}
        <path d="M 85 92 Q 100 100 115 92" stroke="#E09E8F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 87 93 Q 100 98 113 93" fill="#FFF" opacity="0.3"/>
        
        {/* 볼 터치 - 더 선명하게! */}
        <ellipse cx="68" cy="82" rx="12" ry="10" fill="url(#blushGradient)"/>
        <ellipse cx="132" cy="82" rx="12" ry="10" fill="url(#blushGradient)"/>
        <circle cx="66" cy="80" r="2" fill="#FFB6C1" opacity="0.5"/>
        <circle cx="130" cy="80" r="2" fill="#FFB6C1" opacity="0.5"/>
      </g>

      {/* 헤어 - 얼굴 안 가리게 위로! */}
      <g className="hair" filter="url(#softShadow)">
        {avatar.hair === 'basic' && (
          <>
            <ellipse cx="100" cy="38" rx="48" ry="30" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="70" cy="50" rx="18" ry="22" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="130" cy="50" rx="18" ry="22" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="85" cy="32" r="8" fill={hairColors[avatar.hair]} opacity="0.6"/>
            <circle cx="115" cy="32" r="8" fill={hairColors[avatar.hair]} opacity="0.6"/>
          </>
        )}
        {avatar.hair === 'short' && (
          <>
            <path d="M 58 60 Q 58 28 100 22 Q 142 28 142 60 L 142 50 Q 140 32 100 28 Q 60 32 58 50 Z" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="75" cy="38" rx="12" ry="10" fill={hairColors[avatar.hair]}/>
            <ellipse cx="125" cy="38" rx="12" ry="10" fill={hairColors[avatar.hair]}/>
          </>
        )}
        {avatar.hair === 'long' && (
          <>
            <ellipse cx="100" cy="38" rx="48" ry="30" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="70" cy="50" rx="18" ry="22" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="130" cy="50" rx="18" ry="22" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <path d="M 58 60 Q 52 80 50 110 Q 49 120 54 123 Q 58 123 60 115 L 60 65" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <path d="M 142 60 Q 148 80 150 110 Q 151 120 146 123 Q 142 123 140 115 L 140 65" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
          </>
        )}
        {avatar.hair === 'curly' && (
          <>
            <circle cx="100" cy="32" r="28" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="70" cy="48" r="18" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="130" cy="48" r="18" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="85" cy="25" r="14" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="115" cy="25" r="14" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="100" cy="20" r="10" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
          </>
        )}
        {avatar.hair === 'ponytail' && (
          <>
            <ellipse cx="100" cy="38" rx="48" ry="30" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="70" cy="50" rx="18" ry="22" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="148" cy="70" rx="12" ry="32" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="140" cy="60" r="12" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="142" cy="56" rx="8" ry="6" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="2"/>
            <path d="M 136 54 L 140 50 L 144 54" stroke="#FF69B4" strokeWidth="2" fill="none"/>
          </>
        )}
        {avatar.hair === 'bun' && (
          <>
            <ellipse cx="100" cy="42" rx="48" ry="26" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="100" cy="18" r="18" fill={hairColors[avatar.hair]} stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="100" cy="18" rx="14" ry="9" fill={hairColors[avatar.hair]} opacity="0.5"/>
            <path d="M 88 22 Q 100 24 112 22" stroke="#5D4E37" strokeWidth="1.5" fill="none"/>
          </>
        )}
        {avatar.hair === 'colorful' && (
          <>
            <ellipse cx="100" cy="38" rx="48" ry="30" fill="url(#rainbowGradient)" stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="70" cy="50" rx="18" ry="22" fill="url(#rainbowGradient)" stroke="#5D4E37" strokeWidth="2.5"/>
            <ellipse cx="130" cy="50" rx="18" ry="22" fill="url(#rainbowGradient)" stroke="#5D4E37" strokeWidth="2.5"/>
            <circle cx="90" cy="30" r="9" fill="#FFD700" opacity="0.8"/>
            <circle cx="110" cy="30" r="9" fill="#FFD700" opacity="0.8"/>
          </>
        )}
      </g>

      {/* 액세서리 */}
      {avatar.accessory !== 'none' && avatar.accessory !== 'scarf' && (
        <g className="accessory">
          {avatar.accessory === 'cap' && (
            <>
              <ellipse cx="100" cy="38" rx="42" ry="8" fill="#FF6B6B" stroke="#5D4E37" strokeWidth="2.5"/>
              <path d="M 65 38 Q 65 18 100 15 Q 135 18 135 38" fill="#FF6B6B" stroke="#5D4E37" strokeWidth="2.5"/>
              <ellipse cx="100" cy="25" rx="25" ry="15" fill="#FF8787"/>
              <circle cx="100" cy="38" r="6" fill="#FFF"/>
            </>
          )}
          {avatar.accessory === 'glasses' && (
            <>
              <circle cx="82" cy="70" r="12" fill="rgba(255,255,255,0.3)" stroke="#5D4E37" strokeWidth="2.5"/>
              <circle cx="118" cy="70" r="12" fill="rgba(255,255,255,0.3)" stroke="#5D4E37" strokeWidth="2.5"/>
              <line x1="94" y1="70" x2="106" y2="70" stroke="#5D4E37" strokeWidth="2.5"/>
              <path d="M 70 70 L 60 68" stroke="#5D4E37" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 130 70 L 140 68" stroke="#5D4E37" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="78" cy="67" r="2" fill="#FFF" opacity="0.8"/>
              <circle cx="114" cy="67" r="2" fill="#FFF" opacity="0.8"/>
            </>
          )}
          {avatar.accessory === 'backpack' && (
            <>
              <rect x="140" y="145" width="26" height="35" rx="5" fill="#FFB6B9" stroke="#5D4E37" strokeWidth="2.5"/>
              <rect x="145" y="152" width="16" height="10" rx="3" fill="#5D4E37"/>
              <circle cx="153" cy="157" r="2" fill="#FFD700"/>
              <line x1="142" y1="148" x2="135" y2="145" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="142" y1="165" x2="135" y2="170" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round"/>
            </>
          )}
          {avatar.accessory === 'headphones' && (
            <>
              <path d="M 60 58 Q 60 20 100 18 Q 140 20 140 58" stroke="#FF6B9D" strokeWidth="6" fill="none" strokeLinecap="round"/>
              <circle cx="60" cy="68" r="14" fill="#FF6B9D" stroke="#5D4E37" strokeWidth="2.5"/>
              <circle cx="140" cy="68" r="14" fill="#FF6B9D" stroke="#5D4E37" strokeWidth="2.5"/>
              <circle cx="60" cy="68" r="8" fill="#5D4E37"/>
              <circle cx="140" cy="68" r="8" fill="#5D4E37"/>
              <circle cx="62" cy="66" r="3" fill="#FF8FB3"/>
              <circle cx="142" cy="66" r="3" fill="#FF8FB3"/>
            </>
          )}
          {avatar.accessory === 'watch' && (
            <>
              <rect x="42" y="185" width="16" height="14" rx="3" fill="#FFD700" stroke="#5D4E37" strokeWidth="2"/>
              <circle cx="50" cy="192" r="5" fill="#FFF" stroke="#5D4E37" strokeWidth="1.5"/>
              <line x1="50" y1="192" x2="52" y2="189" stroke="#5D4E37" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="50" y1="192" x2="50" y2="195" stroke="#5D4E37" strokeWidth="1" strokeLinecap="round"/>
            </>
          )}
        </g>
      )}
    </svg>
  )
}

export default Avatar
