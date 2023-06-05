import './Card.css';
import Image from 'next/image';

export type CardObjectType = {
	id: number;
	src: string;
	matched: boolean;
};

type CardPropsType = {
	card: CardObjectType;
	onHandleCardClick: (card: CardObjectType) => void;
	flipped: boolean;
	disabled: boolean;
};
function Card({ card, onHandleCardClick, flipped, disabled }: CardPropsType) {
	const handleClick = () => {
		if (!disabled) {
			onHandleCardClick(card);
		}
	};

	return (
		<div className="card-container">
			<div className="card-wrapper">
				<div className={flipped ? 'flipped' : ''}>
					<Image
						src={card.src}
						alt="card image"
						className="front card-img"
						width={114}
						height={177}
						priority
					/>
					<Image
						src={'/images/cover.jpeg'}
						alt="back"
						className="back card-img"
						width={114}
						height={177}
						priority
						onClick={handleClick}
					/>
					{/* <img className="front" src={card.src} alt="card image" />
					<img
						className="back"
						src={'/cover.jpeg'}
						alt="card cover"
						onClick={handleClick}
					/> */}
				</div>
			</div>
		</div>
	);
}

export default Card;
