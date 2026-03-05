import { useState, useEffect, useCallback } from 'react'
import './Calculator.css'

const BUTTONS = [
  // Row 1 - Advanced functions
  { label: 'sin', type: 'function', value: 'sin(' },
  { label: 'cos', type: 'function', value: 'cos(' },
  { label: 'tan', type: 'function', value: 'tan(' },
  { label: 'ln', type: 'function', value: 'ln(' },
  { label: 'log', type: 'function', value: 'log(' },
  { label: 'C', type: 'clear', value: 'clear' },
  
  // Row 2 - More functions and numbers
  { label: 'asin', type: 'function', value: 'asin(' },
  { label: 'acos', type: 'function', value: 'acos(' },
  { label: 'atan', type: 'function', value: 'atan(' },
  { label: 'π', type: 'number', value: 'π' },
  { label: 'e', type: 'number', value: 'e' },
  { label: '⌫', type: 'operator', value: 'backspace' },
  
  // Row 3 - Powers and roots
  { label: 'x²', type: 'function', value: '^2' },
  { label: 'xʸ', type: 'operator', value: '^' },
  { label: '√', type: 'function', value: 'sqrt(' },
  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  
  // Row 4 - More operators
  { label: '(', type: 'operator', value: '(' },
  { label: ')', type: 'operator', value: ')' },
  { label: '%', type: 'operator', value: '%' },
  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  
  // Row 5 - Basic operators
  { label: '1/x', type: 'function', value: '1/' },
  { label: '|x|', type: 'function', value: 'abs(' },
  { label: '÷', type: 'operator', value: '/' },
  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  
  // Row 6 - Final row
  { label: '0', type: 'number', value: '0', span: 2 },
  { label: '.', type: 'number', value: '.' },
  { label: '×', type: 'operator', value: '*' },
  { label: '-', type: 'operator', value: '-' },
  { label: '+', type: 'operator', value: '+' },
  
  // Row 7 - Equals
  { label: '=', type: 'equals', value: 'equals', span: 6 }
]

const Calculator = () => {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [history, setHistory] = useState([])

  const evaluateExpression = useCallback((expr) => {
    try {
      let evalExpr = expr
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
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
    } catch (e) {
      return 'Error'
    }
  }, [])

  const handleButton = useCallback((value) => {
    if (value === 'clear') {
      setExpression('')
      setResult('0')
    } else if (value === 'backspace') {
      setExpression(prev => prev.slice(0, -1))
    } else if (value === 'equals') {
      const evalResult = evaluateExpression(expression)
      setResult(evalResult.toString())
      setHistory(prev => [...prev, { expression, result: evalResult }])
      setExpression(evalResult.toString())
    } else {
      setExpression(prev => prev + value)
    }
  }, [expression, evaluateExpression])

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
    <div className="calculator">
      <div className="calculator-display">
        <div className="expression">{expression || ' '}</div>
        <div className="result">{result}</div>
      </div>
      
      <div className="calculator-keyboard">
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
    </div>
  )
}

export default Calculator
