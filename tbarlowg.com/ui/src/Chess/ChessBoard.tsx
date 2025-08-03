import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Color, Move, Square } from 'chess.js'
import { CustomSquareStyles } from 'react-chessboard/dist/chessboard/types'
import { Alert, Flex, Input, Menu, Portal } from '@chakra-ui/react'
import Button from '../components/Button'
import { toTitle } from '@tbg/util'
import { ChessPlayer, invertColour, MoveResponse, PlayerColour } from '@tbg/chess-bots'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { z } from 'zod'
import { toaster } from '../components/toaster'
import { isError } from 'lodash'

export const colourLookup: { w: 'white', b: 'black' } = {
  w: 'white',
  b: 'black',
}

export interface ChessboardWithControlsProps {
  white: ChessPlayer
  black: ChessPlayer
  onMove: (player: PlayerColour, moveResponse: MoveResponse) => void
}

const TIME_BETWEEN_MOVES = 3000
const fenSchema = z.string()
const STARTING_FEN = new Chess().fen()
export function ChessboardWithControls(props: ChessboardWithControlsProps) {
  const { black, onMove, white } = props
  const [fen, setFen] = useLocalStorageState('fen', fenSchema, STARTING_FEN)
  const [baseFen, setBaseFen] = useLocalStorageState('fen-base', fenSchema, STARTING_FEN)
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
  }, [history, setFen])

  const updateBoard = useCallback(() => {
    setFen(game.fen())
    lastMoveAt.current = new Date()
  }, [game, setFen])

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

  const moveFenRef = useRef<string>(fen)
  moveFenRef.current = fen
  const tryMakeMove = useCallback(async () => {
    if (currentIsHuman || isPaused) {
      return
    }

    const moveFen = game.fen()
    const response = await currentPlayer.getMove({ fen: moveFen, maxTime: TIME_BETWEEN_MOVES })
    if (moveFenRef.current !== moveFen) {
      console.log('Move was generated from previous FEN, ignoring move')
      return
    }

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

  function updateBaseFEN(_newFen: string) {
    let newFen = _newFen
    try {
      newFen = new Chess(newFen).fen()
    } catch (e) {
      toaster.create({
        type: 'error',
        title: `FEN is not valid ${isError(e) ? e.message : ''}`,
      })
      return
    }
    setFen(newFen)
    setBaseFen(newFen)
  }

  return (
    <Flex gridGap=".5rem" flexDirection="column" width="100%">
      <ChessBoardEndStatus game={game} />
      <div className="shadow-1">
        <Chessboard
          position={fen}
          boardOrientation={colourLookup[orientation]}
          onPieceDrop={onDrop}
          customSquareStyles={tileColours()}
        />
      </div>
      <Flex width="100%" flexDir="column" gridGap=".5rem">
        <Flex gridGap=".5rem">
          <Button
            label={isPaused ? 'Start' : 'Pause'}
            onClick={() => setIsPaused(!isPaused)}
          />
          <Button onClick={undo}>
            Undo
          </Button>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button>
                Settings
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content border="1px">
                  <Menu.Item
                    value="Reset"
                    onClick={() => setFen(baseFen)}
                  >
                    Reset
                  </Menu.Item>
                  <Menu.Item
                    value="ResetToStart"
                    onClick={() => updateBaseFEN(STARTING_FEN)}
                  >
                    Reset To Start
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
        <Input
          value={fen}
          bgColor="white"
          onChange={e => updateBaseFEN(e.target.value)}
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
    const loser = invertColour(game.turn())
    return `${toTitle(colourLookup[loser])} is the winner!`
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
