type SubImageFrameProps = {
	imagePath: string;
	onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export function SubImageFrame(props: SubImageFrameProps) {
	return (
		<div className="[&_nav]:hover:flex hover:scale-110 hover:z-10 flex justify-center aspect-square overflow-hidden hover:shadow rounded transition-all cursor-pointer bg-slate-100 border border-white/10 ring-1 ring-black/10 hover:ring-offset-2">
			<img
				title={props.imagePath}
				className="object-cover"
				src={props.imagePath}
				onClick={(e: React.MouseEvent<HTMLImageElement>) => props.onClick(e)}
			/>
			{/* TODO: change primary image  */}
			{/* <nav className="absolute hidden inset-0 bg-base-100/30 backdrop-blur-[1px]">
				<span className="absolute right-1 top-1 bi bi-star-fill text-slate-600 hover:text-amber-400 drop-shadow text-lg"></span>
			</nav> */}
		</div>
	);
}
