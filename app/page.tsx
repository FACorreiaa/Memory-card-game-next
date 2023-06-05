'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Board from './components/Board';
import Card, { CardObjectType } from './components/Card';
import PlayerTurns from './components/PlayerTurns';
import Button from './components/Button';
import Header from './components/Header';

const cardImages = [
	{ src: '/images/hiruma.jpg', matched: false },
	{ src: '/images/ikki.jpg', matched: false },
	{ src: '/images/ippo.jpg', matched: false },
	{ src: '/images/kongo.jpg', matched: false },
	{ src: '/images/kusanagi.jpg', matched: false },
	{ src: '/images/luffy.jpg', matched: false },
	{ src: '/images/taiga.jpg', matched: false },
	{ src: '/images/takamura.jpg', matched: false },
	{ src: '/images/yoko.jpg', matched: false },
];

enum GAME_STATE {
	GAME_OFF = 'OFF',
	ON_GOING = ' GOING',
	GAME_FINISHED = 'FINISHED',
}

enum PLAYER_TURN {
	PLAYER_ONE = 'Player 1',
	PLAYER_TWO = 'Player 2',
}

export default function Home() {
	const [cards, setCards] = useState(Array<CardObjectType>);
	const [playerOnePoint, setPlayerOnePoints] = useState(0);
	const [playerTwoPoint, setPlayerTwoPoints] = useState(0);
	const [playerOneTurn, setPlayerOneTurn] = useState(0);
	const [playerTwoTurn, setPlayerTwoTurn] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [gameStatus, setGameStatus] = useState<GAME_STATE>(GAME_STATE.GAME_OFF);
	const [playerTurn, setPlayerTurn] = useState<PLAYER_TURN>(
		PLAYER_TURN.PLAYER_ONE
	);

	const onHandleStartButton = () => {
		setGameStatus(GAME_STATE.ON_GOING);

		const shuffledCardList = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card,
				id: Math.random(),
			}));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCardList);
		setPlayerOneTurn(0);
		setPlayerTwoTurn(0);
		setPlayerOnePoints(0);
		setPlayerTwoPoints(0);
	};

	const onHandleCardClick = (card: CardObjectType) => {
		//@ts-ignore
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	const handleNextTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		if (playerTurn === PLAYER_TURN.PLAYER_ONE) {
			setPlayerOneTurn((state) => state + 1);
			setPlayerTurn(PLAYER_TURN.PLAYER_TWO);
		} else {
			setPlayerTwoTurn((state) => state + 1);
			setPlayerTurn(PLAYER_TURN.PLAYER_ONE);
		}
		setDisabled(false);
	};

	const validateMatchedCards = () => {
		setCards((prevState) => {
			return prevState.map((card) => {
				//@ts-ignore

				if (card.src === choiceOne?.src) {
					return { ...card, matched: true };
				} else {
					return card;
				}
			});
		});
	};

	const validateTurn = (currentPlayer: PLAYER_TURN) => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);

			if (choiceOne['src'] === choiceTwo['src']) {
				if (currentPlayer === PLAYER_TURN.PLAYER_ONE) {
					setPlayerOnePoints((state) => state + 1);
				} else if (currentPlayer === PLAYER_TURN.PLAYER_TWO) {
					setPlayerTwoPoints((state) => state + 1);
				}

				validateMatchedCards();
				handleNextTurn();
			} else {
				setPlayerTurn(PLAYER_TURN.PLAYER_TWO);
				setTimeout(() => handleNextTurn(), 500);
			}
		}
	};

	const onHandleStopButton = () => {
		setGameStatus(GAME_STATE.GAME_OFF);
		setChoiceOne(null);
		setChoiceTwo(null);
		setPlayerOneTurn(0);
		setPlayerTwoTurn(0);
		setPlayerOnePoints(0);
		setPlayerTwoPoints(0);
	};
	const renderButtonMessage =
		gameStatus === GAME_STATE.GAME_OFF ? 'Start game' : 'Reset Game';

	const renderWinnerMessage = () => {
		const allCardsUp = cards.every((card) => card.matched === true);
		if (playerOnePoint > playerTwoPoint && allCardsUp) {
			return (
				<h4 className="winner-message">
					{PLAYER_TURN.PLAYER_ONE} won the game with {playerOnePoint} points in{' '}
					{playerOneTurn} turns
				</h4>
			);
		} else if (playerOnePoint < playerTwoPoint && allCardsUp) {
			return (
				<h4 className="winner-message">
					{PLAYER_TURN.PLAYER_TWO} won the game with {playerTwoPoint} points in{' '}
					{playerTwoTurn} turns
				</h4>
			);
		}
		return <h3 className="message-status">Enjoy the Game!</h3>;
	};

	useEffect(() => {
		playerTurn === PLAYER_TURN.PLAYER_ONE
			? validateTurn(PLAYER_TURN.PLAYER_ONE)
			: validateTurn(PLAYER_TURN.PLAYER_TWO);
	}, [choiceOne, choiceTwo]);

	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
				<div className="container">
					<div className="text-center">
						<div className="xs:inline-flex ">
							<Button onClick={onHandleStartButton} className="button">
								{renderButtonMessage}
							</Button>
							<Button onClick={onHandleStopButton} className="button">
								Stop game
							</Button>
						</div>

						<PlayerTurns
							playerOne="Player 1"
							playerTwo="Player 2"
							playerOneTurn={playerOneTurn}
							playerTwoTurn={playerTwoTurn}
							playerOnePoints={playerOnePoint}
							playerTwoPoints={playerTwoPoint}
							isPlayerOneTurn={
								playerTurn === PLAYER_TURN.PLAYER_ONE &&
								gameStatus === GAME_STATE.ON_GOING
							}
							isPlayerTwoTurn={
								playerTurn === PLAYER_TURN.PLAYER_TWO &&
								gameStatus === GAME_STATE.ON_GOING
							}
						/>
						{/*
				{playerTurn === PLAYER_TURN.PLAYER_ONE &&
				gameStatus === GAME_STATE.ON_GOING ? (
					<div className="player-turn">PLAYER ONE TURN</div>
				) : (
					<div className="player-turn">PLAYER TWO TURN</div>
				)} */}

						{renderWinnerMessage()}
					</div>
					{gameStatus === GAME_STATE.GAME_OFF ? (
						<h4>Press Start and train your memory!</h4>
					) : (
						<Board>
							{cards.map((card) => (
								<Card
									key={card.id}
									card={card}
									onHandleCardClick={onHandleCardClick}
									flipped={
										card === choiceOne || card === choiceTwo || card.matched
									}
									disabled={disabled}
								/>
							))}
						</Board>
					)}
				</div>
			</div>
		</main>
	);
}
