import React from 'react'

export default function Detail({ searchItem }) {


  const itemStyle = { width: '100%', marginBottom: '2rem' };
  const headerLinkStyle = { textAlign: 'left' };
  const descriptionStyle = { color: '#4d5156', textAlign: 'left' }

  return (
    <div style={itemStyle}>
      <div style={headerLinkStyle}><a href={searchItem.link}>{searchItem.title}</a></div>
      <div style={descriptionStyle} dangerouslySetInnerHTML={{ __html: searchItem.htmlSnippet }} >
      </div>
    </div>
  )
}
