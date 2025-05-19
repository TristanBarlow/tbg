import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { ChessPlayer, PlayerColour } from './players/chessPlayer'
import { MoveResponse } from './players'
import { Chess, Color, Move, Square } from 'chess.js'
import { CustomSquareStyles } from 'react-chessboard/dist/chessboard/types'
import { Alert, Flex } from '@chakra-ui/react'
import Button from '../components/Button'

const colorLookup: { w: 'white', b: 'black' } = {
  w: 'white',
  b: 'black',
}

interface Props {
  white: ChessPlayer
  black: ChessPlayer
  onMove: (player: PlayerColour, moveResponse: MoveResponse) => void
}

const TIME_BETWEEN_MOVES = 3000
export function ChessboardWithControls(props: Props) {
  const { black, onMove, white } = props
  const [fen, setFen] = useState(new Chess().fen())
  const game = useMemo(() => new Chess(fen), [fen])

  const currentPlayerColour = game.turn()
  const currentPlayer: ChessPlayer = currentPlayerColour === 'w'
    ? white
    : black

  const lastPlayerColour: Color = currentPlayerColour === 'w' ? 'b' : 'w'

  const currentIsHuman: boolean = currentPlayer.isHuman
  const orientation: PlayerColour = !currentIsHuman
    ? 'w'
    : (currentIsHuman ? currentPlayerColour : lastPlayerColour)

  const [history, setHistory] = useState<string[]>([game.fen()])
  const [lastMove, setLastMove] = useState<Move | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const undo = useCallback(() => {
    const newHistory = [...history]
    const previousState = newHistory.pop()
    if (!previousState) {
      console.log('NO MOVE TO UNDO')
      return
    }

    setLastMove(null)
    setIsPaused(true)
    setFen(previousState)
    setHistory(newHistory)
  }, [history])

  const updateBoard = useCallback(() => {
    setFen(game.fen())
    lastMoveAt.current = new Date()
  }, [game])

  const checkGameOver = useCallback(() => {
    return game.isGameOver()
      || game.isDraw()
  }, [game])

  const makeMove = useCallback((move: Parameters<Chess['move']>[0] | string): boolean => {
    if (isPaused) return false

    const prev = game.fen()
    const result = game.move(move)
    if (result === null) {
      console.log('Illegal move')
      return false
    }

    setHistory(old => [...old, prev])
    setLastMove(result)

    updateBoard()
    if (checkGameOver()) {
      setIsFinished(true)
      return true
    }

    return true
  }, [checkGameOver, game, isPaused, updateBoard])

  const tryMakeMove = useCallback(async () => {
    if (currentIsHuman || isPaused) {
      return
    }

    const response = await currentPlayer.getMove(game.fen())
    if (!response?.move) {
      checkGameOver()
      return
    }

    makeMove(response.move)
    onMove(lastPlayerColour, response)
  }, [checkGameOver, currentIsHuman, currentPlayer, game, isPaused, lastPlayerColour, makeMove, onMove])

  const onDrop = useCallback((from: Square, to: Square) => {
    if (!currentIsHuman) {
      return false
    }

    return makeMove({
      from,
      to,
      promotion: 'q',
    })
  }, [currentIsHuman, makeMove])

  const lastMoveAt = useRef<Date>(new Date())
  useEffect(() => {
    if (currentIsHuman || isPaused) return
    const timeElapsed = new Date().getTime() - lastMoveAt.current.getTime()
    const timeToWait = TIME_BETWEEN_MOVES - timeElapsed
    const timeout = setTimeout(() => {
      tryMakeMove().catch(console.error)
    }, timeToWait)

    return () => clearTimeout(timeout)
  }, [currentIsHuman, game, tryMakeMove, isPaused])

  const toCSS: React.CSSProperties = {
    backgroundColor: 'yellow',
    transitionDuration: '0.2s',
  }

  function tileColours(): CustomSquareStyles {
    const move = lastMove
    if (!move) return {}
    return {
      [move.to]: toCSS,
    }
  }

  return (
    <Flex flexDirection="column" width="100%">
      {
        isFinished && (
          <Alert.Root>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Game Over</Alert.Title>
              <Alert.Description />
            </Alert.Content>
          </Alert.Root>
        )
      }
      <div className="shadow-1">
        <Chessboard
          position={fen}
          boardOrientation={colorLookup[orientation]}
          onPieceDrop={onDrop}
          customSquareStyles={tileColours()}
        />
      </div>
      <Flex mt=".5rem" gridGap=".5rem">
        <Button onClick={() => setFen(new Chess().fen())}>
          Reset
        </Button>
        <Button onClick={undo}>
          Undo
        </Button>
        <Button
          label={isPaused ? 'Start' : 'Pause'}
          onClick={() => setIsPaused(!isPaused)}
        />
      </Flex>

    </Flex>
  )
}
