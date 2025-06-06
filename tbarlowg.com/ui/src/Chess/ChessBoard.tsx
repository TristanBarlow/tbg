import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { ChessPlayer, PlayerColour } from './players/chessPlayer'
import { MoveResponse } from './players'
import { Chess, Color, Move, Square } from 'chess.js'
import { CustomSquareStyles } from 'react-chessboard/dist/chessboard/types'
import { Alert, Flex } from '@chakra-ui/react'
import Button from '../components/Button'
import { toTitle } from '@tbg/util'

const colorLookup: { w: 'white', b: 'black' } = {
  w: 'white',
  b: 'black',
}

export interface ChessboardWithControlsProps {
  white: ChessPlayer
  black: ChessPlayer
  onMove: (player: PlayerColour, moveResponse: MoveResponse) => void
}

const TIME_BETWEEN_MOVES = 3000
export function ChessboardWithControls(props: ChessboardWithControlsProps) {
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
      return true
    }

    return true
  }, [checkGameOver, game, updateBoard])

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
    onMove(currentPlayerColour, response)
  }, [checkGameOver, currentIsHuman, currentPlayer, currentPlayerColour, game, isPaused, makeMove, onMove])

  const onDrop = useCallback((from: Square, to: Square) => {
    if (!currentIsHuman) {
      return false
    }

    setIsPaused(false)

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
      <ChessBoardEndStatus game={game} />
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

export interface ChessBoardEndStatusProps {
  game: Chess
}
function ChessBoardEndStatus({ game }: ChessBoardEndStatusProps) {
  const message = useMemo(() => {
    const isDraw = game.isDraw()
    if (isDraw) {
      return 'It is a draw!'
    }
    const isCheckmate = game.isCheckmate()
    if (!isCheckmate) return null
    const loser = game.turn()
    return `${toTitle(colorLookup[loser])} is the winner!`
  }, [game])

  if (!message) return null

  return (
    <Alert.Root status="info">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>The game has finished.</Alert.Title>
        <Alert.Description>
          {message}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
