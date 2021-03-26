import React from 'react'

export default function PageFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="p-8">
      <p className="text-center">to be a better man.</p>
      <div className="mt-2 flex items-center justify-center">
        &copy;&nbsp;{year}&nbsp;Jinxin Hu.
      </div>
    </footer>
  )
}
