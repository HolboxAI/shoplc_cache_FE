'use client'

import { useState } from 'react'

interface JsonViewerProps {
  data: any
  title?: string
}

export default function JsonViewer({ data, title }: JsonViewerProps) {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({})

  const toggleCollapse = (path: string) => {
    setCollapsed(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  const renderValue = (value: any, key: string, path: string = '', level: number = 0): JSX.Element => {
    const currentPath = path ? `${path}.${key}` : key
    const indent = level * 20

    if (value === null) {
      return (
        <div style={{ marginLeft: `${indent}px` }} className="py-1">
          <span className="text-purple-600 font-semibold">"{key}"</span>
          <span className="text-gray-500">: </span>
          <span className="text-gray-400 italic">null</span>
        </div>
      )
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const isCollapsed = collapsed[currentPath]
      const keys = Object.keys(value)
      
      return (
        <div style={{ marginLeft: `${indent}px` }} className="py-1">
          <button
            onClick={() => toggleCollapse(currentPath)}
            className="text-purple-600 font-semibold hover:bg-purple-50 px-1 rounded"
          >
            <span className="text-gray-600 mr-1">{isCollapsed ? '▶' : '▼'}</span>
            "{key}"
          </button>
          <span className="text-gray-500">: {'{'}  </span>
          <span className="text-gray-400 text-sm">({keys.length} {keys.length === 1 ? 'property' : 'properties'})</span>
          
          {!isCollapsed && (
            <div>
              {keys.map((k) => (
                <div key={`${currentPath}.${k}`}>
                  {renderValue(value[k], k, currentPath, level + 1)}
                </div>
              ))}
            </div>
          )}
          
          {!isCollapsed && (
            <div style={{ marginLeft: `${indent}px` }} className="text-gray-500">{'}'}</div>
          )}
        </div>
      )
    }

    if (Array.isArray(value)) {
      const isCollapsed = collapsed[currentPath]
      
      return (
        <div style={{ marginLeft: `${indent}px` }} className="py-1">
          <button
            onClick={() => toggleCollapse(currentPath)}
            className="text-purple-600 font-semibold hover:bg-purple-50 px-1 rounded"
          >
            <span className="text-gray-600 mr-1">{isCollapsed ? '▶' : '▼'}</span>
            "{key}"
          </button>
          <span className="text-gray-500">: [  </span>
          <span className="text-gray-400 text-sm">({value.length} {value.length === 1 ? 'item' : 'items'})</span>
          
          {!isCollapsed && (
            <div>
              {value.map((item, index) => (
                <div key={`${currentPath}[${index}]`}>
                  {renderValue(item, `[${index}]`, currentPath, level + 1)}
                </div>
              ))}
            </div>
          )}
          
          {!isCollapsed && (
            <div style={{ marginLeft: `${indent}px` }} className="text-gray-500">]</div>
          )}
        </div>
      )
    }

    if (typeof value === 'string') {
      return (
        <div style={{ marginLeft: `${indent}px` }} className="py-1">
          <span className="text-purple-600 font-semibold">{key.startsWith('[') ? key : `"${key}"`}</span>
          <span className="text-gray-500">: </span>
          <span className="text-green-600">"{value}"</span>
        </div>
      )
    }

    if (typeof value === 'number') {
      return (
        <div style={{ marginLeft: `${indent}px` }} className="py-1">
          <span className="text-purple-600 font-semibold">{key.startsWith('[') ? key : `"${key}"`}</span>
          <span className="text-gray-500">: </span>
          <span className="text-blue-600">{value}</span>
        </div>
      )
    }

    if (typeof value === 'boolean') {
      return (
        <div style={{ marginLeft: `${indent}px` }} className="py-1">
          <span className="text-purple-600 font-semibold">{key.startsWith('[') ? key : `"${key}"`}</span>
          <span className="text-gray-500">: </span>
          <span className="text-orange-600">{value.toString()}</span>
        </div>
      )
    }

    return (
      <div style={{ marginLeft: `${indent}px` }} className="py-1">
        <span className="text-purple-600 font-semibold">{key.startsWith('[') ? key : `"${key}"`}</span>
        <span className="text-gray-500">: </span>
        <span className="text-gray-700">{String(value)}</span>
      </div>
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    alert('JSON copied to clipboard!')
  }

  const downloadJson = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `cache-data-${data.session_id || 'export'}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const expandAll = () => {
    const newCollapsed: { [key: string]: boolean } = {}
    const setAllCollapsed = (obj: any, path: string = '') => {
      Object.keys(obj).forEach(key => {
        const currentPath = path ? `${path}.${key}` : key
        newCollapsed[currentPath] = false
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          setAllCollapsed(obj[key], currentPath)
        }
      })
    }
    setAllCollapsed(data)
    setCollapsed(newCollapsed)
  }

  const collapseAll = () => {
    const newCollapsed: { [key: string]: boolean } = {}
    const setAllCollapsed = (obj: any, path: string = '') => {
      Object.keys(obj).forEach(key => {
        const currentPath = path ? `${path}.${key}` : key
        newCollapsed[currentPath] = true
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          setAllCollapsed(obj[key], currentPath)
        }
      })
    }
    setAllCollapsed(data)
    setCollapsed(newCollapsed)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {title || 'Cache Data Response'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Collapse All
          </button>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            📋 Copy
          </button>
          <button
            onClick={downloadJson}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            ⬇️ Download
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <div className="font-mono text-sm">
          <div className="text-gray-500">{'{'}</div>
          {Object.keys(data).map((key) => (
            <div key={key}>
              {renderValue(data[key], key, '', 1)}
            </div>
          ))}
          <div className="text-gray-500">{'}'}</div>
        </div>
      </div>
    </div>
  )
}
