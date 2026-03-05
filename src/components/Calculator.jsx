import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Calculator.css'

const BUTTONS = [
  { label: 'sin', type: 'function', value: 'sin(' },
  { label: 'cos', type: 'function', value: 'cos(' },
  { label: 'tan', type: 'function', value: 'tan(' },
  { label: 'ln', type: 'function', value: 'ln(' },
  { label: 'log', type: 'function', value: 'log(' },
  { label: 'C', type: 'clear', value: 'clear' },
  { label: 'asin', type: 'function', value: 'asin(' },
  { label: 'acos', type: 'function', value: 'acos(' },
  { label: 'atan', type: 'function', value: 'atan(' },
  { label: '\u03C0', type: 'number', value: '\u03C0' },
  { label: 'e', type: 'number', value: 'e' },
  { label: '\u232B', type: 'operator', value: 'backspace' },
  { label: 'x\u00B2', type: 'function', value: '^2' },
  { label: 'x\u02B8', type: 'operator', value: '^' },
  { label: '\u221A', type: 'function', value: 'sqrt(' },
  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  { label: '(', type: 'operator', value: '(' },
  { label: ')', type: 'operator', value: ')' },
  { label: '%', type: 'operator', value: '%' },
  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  { label: '1/x', type: 'function', value: '1/' },
  { label: '|x|', type: 'function', value: 'abs(' },
  { label: '\u00F7', type: 'operator', value: '/' },
  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  { label: '0', type: 'number', value: '0', span: 2 },
  { label: '.', type: 'number', value: '.' },
  { label: '\u00D7', type: 'operator', value: '*' },
  { label: '\u2212', type: 'operator', value: '-' },
  { label: '+', type: 'operator', value: '+' },
  { label: '=', type: 'equals', value: 'equals', span: 6 },
]

const Calculator = () => {
  const navigate = useNavigate()
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [history, setHistory] = useState([])

  const evaluateExpression = useCallback((expr) => {
    try {
      let evalExpr = expr
        .replace(/\u03C0/g, 'Math.PI')
        .replace(/e(?![a-z])/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/asin\(/g, 'Math.asin(')
        .replace(/acos\(/g, 'Math.acos(')
        .replace(/atan\(/g, 'Math.atan(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/abs\(/g, 'Math.abs(')
        .replace(/\^/g, '**')

      const evalResult = Function('"use strict";return (' + evalExpr + ')')()
      return Number.isFinite(evalResult) ? evalResult : 'Error'
    } catch {
      return 'Error'
    }
  }, [])

  const handleButton = useCallback(
    (value) => {
      if (value === 'clear') {
        setExpression('')
        setResult('0')
      } else if (value === 'backspace') {
        setExpression((prev) => prev.slice(0, -1))
      } else if (value === 'equals') {
        const evalResult = evaluateExpression(expression)
        if (evalResult !== 'Error' && expression) {
          setHistory((prev) => [
            { expr: expression, result: evalResult.toString() },
            ...prev.slice(0, 19),
          ])
        }
        setResult(evalResult.toString())
        setExpression(evalResult.toString())
      } else {
        setExpression((prev) => prev + value)
      }
    },
    [expression, evaluateExpression]
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') handleButton(e.key)
      else if (e.key === '.') handleButton('.')
      else if (e.key === '+') handleButton('+')
      else if (e.key === '-') handleButton('-')
      else if (e.key === '*') handleButton('*')
      else if (e.key === '/') handleButton('/')
      else if (e.key === 'Enter' || e.key === '=') handleButton('equals')
      else if (e.key === 'Escape') handleButton('clear')
      else if (e.key === 'Backspace') handleButton('backspace')
      else if (e.key === '(' || e.key === ')') handleButton(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleButton])

  const getButtonClass = (type, span) => {
    const classes = ['calc-btn', type]
    if (span) classes.push(`span-${span}`)
    return classes.join(' ')
  }

  return (
    <div className="calc-workspace">
      {/* Top toolbar like Prism */}
      <div className="calc-toolbar">
        <div className="toolbar-left">
          <button className="toolbar-icon-btn" onClick={() => navigate('/')} aria-label="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <div className="file-tab active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="9" y1="10" x2="15" y2="10" />
              <line x1="9" y1="14" x2="15" y2="14" />
              <line x1="9" y1="6" x2="13" y2="6" />
            </svg>
            calculator.sci
          </div>
        </div>
        <div className="toolbar-right">
          <button className="tools-btn">
            Tools
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33" />
            </svg>
          </button>
        </div>
      </div>

      {/* Split layout like Prism editor + preview */}
      <div className="calc-split">
        {/* Left: Input panel (editor-like) */}
        <div className="calc-editor">
          <div className="editor-display" role="status" aria-live="polite">
            <div className="editor-lines">
              <div className="line-number">1</div>
              <div className="line-content expression-line">
                {expression || <span className="placeholder">{'Enter expression...'}</span>}
                <span className="cursor-blink" />
              </div>
            </div>
            {history.length > 0 && (
              <div className="editor-history">
                {history.map((item, i) => (
                  <div className="editor-lines history-line" key={i}>
                    <div className="line-number">{i + 2}</div>
                    <div className="line-content">
                      <span className="hist-expr">{item.expr}</span>
                      <span className="hist-eq">{' = '}</span>
                      <span className="hist-result">{item.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outline section at bottom-left like Prism */}
          <div className="editor-outline">
            <div className="outline-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              Outline
            </div>
            <div className="outline-items">
              <div className="outline-item">*Scientific Mode</div>
              <div className="outline-item">*History ({history.length})</div>
            </div>
          </div>

          {/* Chat bar at very bottom, like Prism */}
          <div className="chat-bar">
            <input type="text" className="chat-input" placeholder="Ask anything" disabled />
            <div className="chat-actions">
              <button className="chat-action-btn" aria-label="Code">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </button>
              <button className="chat-action-btn" aria-label="Add">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button className="chat-action-btn" aria-label="Submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Output panel (preview-like) */}
        <div className="calc-preview">
          <div className="preview-toolbar">
            <span className="preview-label">Output</span>
            <span className="preview-mode">Scientific</span>
          </div>

          <div className="preview-result">
            <div className="result-value" aria-label="Result">{result}</div>
            <div className="result-expression">{expression || 'Ready'}</div>
          </div>

          <div className="calculator-keyboard" role="group" aria-label="Calculator buttons">
            {BUTTONS.map((btn, index) => (
              <button
                key={index}
                className={getButtonClass(btn.type, btn.span)}
                onClick={() => handleButton(btn.value)}
                type="button"
                aria-label={btn.label}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Preview bottom nav like Prism */}
          <div className="preview-nav">
            <button className="preview-nav-btn" aria-label="Undo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h10a5 5 0 0 1 0 10H3" />
                <polyline points="7 6 3 10 7 14" />
              </svg>
            </button>
            <button className="preview-nav-btn" aria-label="Refresh" onClick={() => { setExpression(''); setResult('0') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
            <button className="preview-nav-btn" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="preview-nav-btn" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
