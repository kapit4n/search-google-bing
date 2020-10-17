import React from 'react'

export default function Detail({ searchItem }) {


  const itemStyle = { width: '100%', marginBottom: '2rem' };
  const headerLinkStyle = { textAlign: 'left' };
  const descriptionStyle = { color: '#4d5156', textAlign: 'left' }

  return (
    <div style={itemStyle}>
      <div style={headerLinkStyle}><a href={searchItem.link}>{searchItem.title}</a>
        {searchItem.count && (<span style={{ borderLeft: '1rem' }}>({searchItem.count})</span>)}
      </div>
      <div style={descriptionStyle} dangerouslySetInnerHTML={{ __html: searchItem.htmlSnippet }} >
      </div>
    </div>
  )
}
